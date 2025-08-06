const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const qrcode = require('qrcode-terminal')

// ============================================================================
// KONFIGURASI KONEKSI
// ============================================================================

const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY = 3000; // 3 detik

// ============================================================================
// FUNGSI UTILITAS
// ============================================================================

/**
 * Tampilkan QR code untuk scan WhatsApp
 * @param {string} qr - QR code string
 */
function displayQRCode(qr) {
  console.log('📱 Scan QR Code ini di WhatsApp:')
  console.log('')
  qrcode.generate(qr, { small: true })
  console.log('')
  console.log('💡 Tips: Buka WhatsApp → Settings → Linked Devices → Link a Device')
  console.log('⏳ Menunggu scan QR code...')
}

/**
 * Handle koneksi WhatsApp berhasil
 */
function handleConnectionSuccess() {
  console.log('✅ WhatsApp connected successfully!')
  console.log('🔗 Ready to use with TELEtoWA')
  console.log('')
  console.log('🎯 Setup selesai! Sekarang bisa jalankan: npm start')
  process.exit(0)
}

/**
 * Handle error koneksi WhatsApp
 * @param {Object} error - Error object
 * @param {number} reconnectAttempts - Jumlah percobaan reconnect
 */
function handleConnectionError(error, reconnectAttempts) {
  if (error?.output?.statusCode === 401) {
    console.log('❌ Authentication failed. Please run setup again.')
    process.exit(1)
  } else {
    console.log(`🔄 Reconnecting... (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`)
  }
}

// ============================================================================
// SETUP KONEKSI WHATSAPP
// ============================================================================

/**
 * Buat koneksi WhatsApp dengan retry mechanism
 * @param {number} reconnectAttempts - Jumlah percobaan reconnect
 */
async function createWhatsAppConnection(reconnectAttempts = 0) {
  try {
    console.log('🚀 Setting up WhatsApp connection...')
    
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      auth: state,
      connectTimeoutMs: 60_000,
      keepAliveIntervalMs: 30_000,
      retryRequestDelayMs: 2000
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      // Handle QR code display
      if (qr) {
        displayQRCode(qr)
        reconnectAttempts = 0 // Reset attempts when QR shows
      }
      
      // Handle connection status
      if (connection === 'open') {
        handleConnectionSuccess()
      } else if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error
        
        if (shouldReconnect?.output?.statusCode !== 401) {
          reconnectAttempts++
          if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
            handleConnectionError(shouldReconnect, reconnectAttempts)
            setTimeout(() => {
              createWhatsAppConnection(reconnectAttempts)
            }, RECONNECT_DELAY)
          } else {
            console.log('❌ Max reconnection attempts reached. Please try again.')
            process.exit(1)
          }
        } else {
          handleConnectionError(shouldReconnect, reconnectAttempts)
        }
      }
    })

    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n👋 Closing WhatsApp connection...')
      process.exit(0)
    })

  } catch (error) {
    console.error('❌ Error setting up WhatsApp:', error.message)
    reconnectAttempts++
    
    if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
      console.log(`🔄 Retrying... (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`)
      setTimeout(() => {
        createWhatsAppConnection(reconnectAttempts)
      }, RECONNECT_DELAY)
    } else {
      console.log('❌ Max retry attempts reached. Please check your connection.')
      process.exit(1)
    }
  }
}

// ============================================================================
// MULAI SETUP
// ============================================================================

/**
 * Fungsi utama untuk setup WhatsApp
 */
async function setupWhatsApp() {
  await createWhatsAppConnection()
}

// Jalankan setup
setupWhatsApp() 