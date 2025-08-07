const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const { recipientNumber, ignoredUsernames, adminWaNumber, offlineMode } = require('./config')
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { apiId, apiHash } = require("./config");

// ============================================================================
// VARIABEL GLOBAL
// ============================================================================

// Simpan user terakhir untuk auto-reply
let lastUserId = null;
let lastUsername = null;

// Variabel untuk retry mechanism
let sock = null;
let isReconnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY = 5000; // 5 detik

// ============================================================================
// FUNGSI UTILITAS
// ============================================================================

/**
 * Cek apakah user sedang online berdasarkan status
 * @param {string} statusClass - Kelas status user
 * @returns {boolean} - True jika user online/recently online
 */
function isUserOnline(statusClass) {
  // Jika status adalah UserStatusOnline, user pasti online
  if (statusClass === 'UserStatusOnline') {
    return true;
  }
  
  // Jika status adalah UserStatusRecently, user baru saja online
  if (statusClass === 'UserStatusRecently') {
    return true;
  }
  
  // Jika status adalah UserStatusOffline, user offline
  if (statusClass === 'UserStatusOffline') {
    return false;
  }
  
  // Default: asumsikan offline
  return false;
}

/**
 * Ekstrak teks pesan dari pesan WhatsApp
 * @param {Object} msg - Objek pesan WhatsApp
 * @returns {string} - Teks pesan yang diekstrak
 */
function extractMessageText(msg) {
  return msg.message?.conversation || 
         msg.message?.extendedTextMessage?.text || 
         msg.message?.imageMessage?.caption ||
         msg.message?.videoMessage?.caption ||
         msg.message?.documentMessage?.caption ||
         msg.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
         msg.message?.ephemeralMessage?.message?.conversation ||
         '';
}

/**
 * Dapatkan informasi media dari pesan Telegram
 * @param {Object} msg - Objek pesan Telegram
 * @param {Object} telegramClient - Instance client Telegram
 * @returns {Object} - Objek informasi media
 */
async function getMediaInfo(msg, telegramClient) {
  let mediaIcon = "📝";
  let mediaInfo = "";
  let mediaBuffer = null;
  let mediaType = null;
  
  if (msg.photo) {
    mediaIcon = "📷";
    mediaInfo = "Foto";
    try {
      mediaBuffer = await telegramClient.downloadMedia(msg.photo);
      mediaType = 'image';
    } catch (error) {
      console.log('⚠️ Error download foto');
    }
  } else if (msg.video) {
    mediaIcon = "🎥";
    mediaInfo = "Video";
    try {
      mediaBuffer = await telegramClient.downloadMedia(msg.video);
      mediaType = 'video';
    } catch (error) {
      console.log('⚠️ Error download video');
    }
  } else if (msg.audio) {
    mediaIcon = "🎵";
    mediaInfo = "Audio";
  } else if (msg.document) {
    mediaIcon = "📄";
    mediaInfo = "Dokumen";
    try {
      mediaBuffer = await telegramClient.downloadMedia(msg.document);
      mediaType = 'document';
    } catch (error) {
      console.log('⚠️ Error download dokumen');
    }
  } else if (msg.sticker) {
    mediaIcon = "😀";
    mediaInfo = "Sticker";
  } else if (msg.voice) {
    mediaIcon = "🎤";
    mediaInfo = "Voice Message";
  } else if (msg.videoNote) {
    mediaIcon = "📹";
    mediaInfo = "Video Note";
  }

  return { mediaIcon, mediaInfo, mediaBuffer, mediaType };
}

/**
 * Delay function untuk retry
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after delay
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Inisialisasi WhatsApp socket dengan retry mechanism
 * @returns {Promise<Object>} - WhatsApp socket instance
 */
async function initializeWhatsAppSocket() {
  try {
    console.log('🔄 Initializing WhatsApp connection...');
    
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const { version } = await fetchLatestBaileysVersion();

         const newSock = makeWASocket({
       version,
       logger: pino({ level: 'silent' }),
       connectTimeoutMs: 60_000,
       keepAliveIntervalMs: 30_000,
       retryRequestDelayMs: 2000,
       maxRetries: 5,
       // Tambahan konfigurasi untuk stabilitas
       browser: ['TELEtoWA', 'Chrome', '1.0.0'],
       printQRInTerminal: false,
       shouldIgnoreJid: jid => jid.includes('@broadcast'),
       // Tambahan untuk handling session
       markOnlineOnConnect: false,
       syncFullHistory: false,
       fireInitQueries: true,
       auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
       },
     });

    newSock.ev.on('creds.update', saveCreds);
    
    return newSock;
  } catch (error) {
    console.error('❌ Error initializing WhatsApp socket:', error.message);
    throw error;
  }
}

/**
 * Reconnect WhatsApp dengan retry mechanism
 */
async function reconnectWhatsApp() {
  if (isReconnecting) {
    console.log('🔄 Reconnection already in progress...');
    return;
  }

  isReconnecting = true;
  reconnectAttempts++;

  try {
    console.log(`🔄 Attempting to reconnect WhatsApp (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
    
    // Tutup socket lama jika ada
    if (sock) {
      try {
        await sock.logout();
      } catch (error) {
        console.log('⚠️ Error during logout:', error.message);
      }
    }

    // Tunggu sebentar sebelum reconnect
    await delay(RECONNECT_DELAY);

    // Buat socket baru
    sock = await initializeWhatsAppSocket();
    
    // Setup handler untuk socket baru
    setupWhatsAppConnectionHandler(sock);
    setupWhatsAppMessageHandler(sock);
    
    console.log('✅ WhatsApp reconnected successfully!');
    reconnectAttempts = 0; // Reset counter jika berhasil
    
  } catch (error) {
    console.error(`❌ Reconnection attempt ${reconnectAttempts} failed:`, error.message);
    
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`🔄 Will retry in ${RECONNECT_DELAY/1000} seconds...`);
      setTimeout(reconnectWhatsApp, RECONNECT_DELAY);
    } else {
      console.error('❌ Max reconnection attempts reached. Please restart the application.');
      process.exit(1);
    }
  } finally {
    isReconnecting = false;
  }
}

// ============================================================================
// SETUP CLIENT TELEGRAM
// ============================================================================

const session = new StringSession(`#`); // ISI STRING KALIAN
const telegramClient = new TelegramClient(session, apiId, apiHash, {
  connectionRetries: 5,
});

// ============================================================================
// HANDLER PESAN WHATSAPP
// ============================================================================

/**
 * Handle update koneksi WhatsApp
 * @param {Object} sock - Instance socket WhatsApp
 */
function setupWhatsAppConnectionHandler(sock) {
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log('🔗 WhatsApp listener ready')
      console.log('🎯 System ready!')
      console.log('')
      console.log('📋 Cara Pakai:')
      console.log('1. Kirim pesan ke Telegram → Akan diterima di WhatsApp')
      console.log('2. Reply di WhatsApp: /reply @username pesan')
      console.log('3. Atau kirim pesan biasa → Auto reply ke user terakhir')
      console.log('')
      if (offlineMode?.enabled) {
        console.log('🔄 Offline Mode: AKTIF')
        console.log('💡 Notifikasi hanya dikirim ketika status Anda "Offline"')
        console.log('')
      }
    } else if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error
      console.log('🔌 WhatsApp connection closed');
      
      if (shouldReconnect?.output?.statusCode !== 401) {
        console.log('🔄 WhatsApp disconnected, attempting to reconnect...')
        // Trigger reconnect
        setTimeout(reconnectWhatsApp, 1000);
      } else {
        console.log('❌ WhatsApp authentication failed. Please run: npm run setup-wa')
        process.exit(1)
      }
    }
  })
}

/**
 * Handle pesan masuk WhatsApp
 * @param {Object} sock - Instance socket WhatsApp
 */
function setupWhatsAppMessageHandler(sock) {
  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0]
    
    // Handle pesan masuk dari nomor admin atau recipient
    if ((msg.key.remoteJid === `${adminWaNumber}@s.whatsapp.net` || 
         msg.key.remoteJid === `${recipientNumber}@s.whatsapp.net`) && !msg.key.fromMe) {
      
      const messageText = extractMessageText(msg)
      
      // Cek command
      const commandMatch = messageText.match(/^\/reply\s+@?(\w+)\s+(.+)$/)
      
      if (commandMatch) {
        const username = commandMatch[1]
        const replyMessage = commandMatch[2]
        
        try {
          await telegramClient.sendMessage(`@${username}`, { message: replyMessage })
          console.log(`✅ Reply terkirim ke @${username}`)
        } catch (error) {
          console.error(`❌ Error reply ke @${username}:`, error.message)
        }
      } else if (messageText.trim()) {
        // Auto reply ke user terakhir jika tidak ada command
        if (lastUserId) {
          try {
            await telegramClient.sendMessage(lastUserId, { message: messageText })
            const userInfo = lastUsername ? `@${lastUsername}` : `User ID: ${lastUserId}`;
            console.log(`✅ Auto reply terkirim ke ${userInfo}`)
          } catch (error) {
            console.error(`❌ Error auto reply:`, error.message)
          }
        }
      }
    }
  })
}

// ============================================================================
// HANDLER PESAN TELEGRAM
// ============================================================================

/**
 * Cek apakah user harus diabaikan
 * @param {Object} sender - Objek sender Telegram
 * @param {Object} me - Objek user saat ini
 * @returns {boolean} - True jika user harus diabaikan
 */
async function shouldIgnoreUser(sender, me) {
  // Cek apakah sender adalah bot
  if (sender?.bot) {
    return true;
  }
  
  // Cek apakah sender adalah diri sendiri (abaikan pesan sendiri)
  if (sender.id === me.id || (sender?.username && sender.username === me.username)) {
    return true;
  }
  
  // Cek username yang diabaikan (hanya jika username ada)
  const username = sender?.username;
  if (username && ignoredUsernames && ignoredUsernames.includes(username)) {
    return true;
  }
  
  return false;
}

/**
 * Cek status offline mode
 * @returns {Promise<boolean>} - True jika harus skip notifikasi
 */
async function shouldSkipDueToOfflineMode() {
  if (!offlineMode?.enabled) {
    return false;
  }
  
  try {
    const me = await telegramClient.getMe();
    const myEntity = await telegramClient.getEntity(me.id);
    
    if (isUserOnline(myEntity?.status?.className)) {
      return true; // Skip notifikasi jika online
    }
  } catch (error) {
    console.log(`⚠️ Error cek status: ${error.message}`);
  }
  
  return false;
}

/**
 * Kirim notifikasi ke WhatsApp dengan retry mechanism
 * @param {Object} sock - Instance socket WhatsApp
 * @param {string} notifText - Teks notifikasi
 * @param {Buffer} mediaBuffer - Buffer media
 * @param {string} mediaType - Tipe media
 * @param {string} mediaInfo - Info media
 */
async function sendWhatsAppNotification(sock, notifText, mediaBuffer, mediaType, mediaInfo) {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      if (!sock) {
        throw new Error('WhatsApp socket not available');
      }

      if (mediaBuffer && mediaType) {
        const mediaMessage = {
          [mediaType]: mediaBuffer,
          caption: notifText
        }
        await sock.sendMessage(`${recipientNumber}@s.whatsapp.net`, mediaMessage)
        console.log(`✅ Media ${mediaInfo} terkirim`)
      } else {
        await sock.sendMessage(`${recipientNumber}@s.whatsapp.net`, { text: notifText })
        console.log(`✅ Notifikasi terkirim`)
      }
      
      // Jika berhasil, keluar dari loop
      break;
      
    } catch (error) {
      retryCount++;
      console.error(`❌ Error kirim notifikasi (attempt ${retryCount}/${maxRetries}):`, error.message)
      
      if (error.message.includes('Connection Closed') || error.message.includes('Bad MAC')) {
        console.log('🔄 Connection error detected, attempting to reconnect...');
        await reconnectWhatsApp();
        // Tunggu sebentar sebelum retry
        await delay(2000);
      } else if (retryCount < maxRetries) {
        // Tunggu sebentar sebelum retry untuk error lain
        await delay(1000);
      } else {
        console.error('❌ Max retry attempts reached for notification');
      }
    }
  }
}

/**
 * Setup handler pesan Telegram
 * @param {Object} sock - Instance socket WhatsApp
 */
function setupTelegramMessageHandler(sock) {
  telegramClient.addEventHandler(async (event) => {
    const msg = event.message;

    // Hanya deteksi pesan dari user private, bukan grup/channel/bot
    if (msg && msg.peerId && msg.peerId.userId && !msg.isChannel && !msg.groupedId && !msg.fromBot) {
      
      // Cek offline mode
      if (await shouldSkipDueToOfflineMode()) {
        return;
      }
      
      try {
        const sender = await msg.getSender();
        
        // Cek apakah sender ada
        if (!sender) {
          console.log('⚠️ Sender tidak ditemukan, pesan diabaikan');
          return;
        }
        
        const me = await telegramClient.getMe();
        
        // Cek apakah user harus diabaikan
        if (await shouldIgnoreUser(sender, me)) {
          return;
        }
        
        const username = sender?.username;
        
        // Simpan user terakhir untuk auto-reply
        lastUserId = sender.id;
        lastUsername = username;
        const fullName = `${sender?.firstName || ""} ${sender?.lastName || ""}`.trim();

        // Dapatkan informasi media
        const { mediaIcon, mediaInfo, mediaBuffer, mediaType } = await getMediaInfo(msg, telegramClient);

        const messageText = msg.message || "";
        const mediaText = mediaInfo ? `\n📎 *Media:* ${mediaIcon} ${mediaInfo}` : "";
        
        const usernameText = username ? `https://t.me/${username}` : "Tidak ada username";
        const notifText = `📩 *Pesan baru dari Telegram!*\n\n👤 *Nama:* ${fullName}\n🔗 *Username:* ${usernameText}${mediaText}\n📝 *Pesan:* ${messageText || "(Media saja)"}`;
        
        // Kirim notifikasi dengan retry mechanism
        await sendWhatsAppNotification(sock, notifText, mediaBuffer, mediaType, mediaInfo);
        
      } catch (error) {
        console.error("❌ Error saat memproses pesan:", error.message);
      }
    }
  }, new (require("telegram/events").NewMessage)({}));
}

// ============================================================================
// FUNGSI UTAMA
// ============================================================================

/**
 * Fungsi utama untuk memulai sistem TELEtoWA
 */
async function startSimpleReply() {
  try {
    console.log('🚀 Starting TELEtoWA system...')
    
    // Mulai client Telegram
    await telegramClient.start()
    console.log('✅ Telegram client ready!')
    
    // Mulai listener WhatsApp
    sock = await initializeWhatsAppSocket();

    // Setup handler
    setupWhatsAppConnectionHandler(sock)
    setupWhatsAppMessageHandler(sock)
    setupTelegramMessageHandler(sock)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    // Jika error saat startup, coba reconnect
    setTimeout(reconnectWhatsApp, 5000);
  }
}

// ============================================================================
// MULAI APLIKASI
// ============================================================================

startSimpleReply() 