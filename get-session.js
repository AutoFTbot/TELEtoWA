const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { apiId, apiHash } = require("./config");

// ============================================================================
// KONFIGURASI CLIENT TELEGRAM
// ============================================================================

const CLIENT_CONFIG = {
  connectionRetries: 5,
  useWSS: false,
  deviceModel: "Desktop",
  systemVersion: "Windows 10",
  appVersion: "1.0.0",
  langCode: "en"
};

const SESSION_DELAY = 3000; // 3 detik

// ============================================================================
// FUNGSI UTILITAS
// ============================================================================

/**
 * Tampilkan session string yang berhasil dibuat
 * @param {string} sessionString - Session string dari Telegram
 */
function displaySessionString(sessionString) {
  console.log("\n🎉 Session String berhasil dibuat!");
  console.log("📋 Copy string di bawah ini ke file telegram.js:");
  console.log("=".repeat(50));
  console.log(sessionString);
  console.log("=".repeat(50));
}

/**
 * Ambil input dari user dengan prompt yang diberikan
 * @param {string} prompt - Pesan prompt untuk user
 * @returns {Promise<string>} - Input dari user
 */
async function getUserInput(prompt) {
  const input = require('input');
  return await input.text(prompt);
}

// ============================================================================
// SETUP CLIENT TELEGRAM
// ============================================================================

/**
 * Buat client Telegram baru untuk mendapatkan session
 */
function createTelegramClient() {
  return new TelegramClient(
    new StringSession(""), 
    apiId, 
    apiHash, 
    CLIENT_CONFIG
  );
}

/**
 * Setup parameter login untuk client Telegram
 * @returns {Object} - Parameter login
 */
function getLoginParameters() {
  return {
    phoneNumber: async () => {
      return await getUserInput("Masukkan nomor telepon (dengan kode negara, contoh: +628123456789): ");
    },
    password: async () => {
      return await getUserInput("Masukkan password 2FA (jika ada): ");
    },
    phoneCode: async () => {
      return await getUserInput("Masukkan kode OTP dari Telegram: ");
    },
    onError: (err) => {
      console.log("❌ Error:", err);
    }
  };
}

// ============================================================================
// PROSES LOGIN DAN GENERATE SESSION
// ============================================================================

/**
 * Proses login Telegram dan generate session string
 * @param {TelegramClient} client - Client Telegram
 */
async function processTelegramLogin(client) {
  console.log("🚀 Memulai proses login Telegram...");
  
  try {
    // Mulai client dengan parameter yang benar
    await client.start(getLoginParameters());
    
    console.log("✅ Login berhasil!");
    
    // Tunggu sebentar untuk memastikan client sudah terhubung
    await new Promise(resolve => setTimeout(resolve, SESSION_DELAY));
    
    // Ambil session string
    const sessionString = client.session.save();
    displaySessionString(sessionString);
    
    // Disconnect client
    await client.disconnect();
    console.log("\n✅ Proses selesai! Session string sudah siap digunakan.");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
  }
}

// ============================================================================
// FUNGSI UTAMA
// ============================================================================

/**
 * Fungsi utama untuk mendapatkan session Telegram
 */
async function getTelegramSession() {
  const client = createTelegramClient();
  await processTelegramLogin(client);
}

// ============================================================================
// MULAI APLIKASI
// ============================================================================

// Jalankan fungsi utama
getTelegramSession(); 