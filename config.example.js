// ============================================================================
// KONFIGURASI TELEtoWA
// ============================================================================

module.exports = {
  // ============================================================================
  // KREDENSIAL API TELEGRAM
  // ============================================================================
  // Dapatkan dari https://my.telegram.org
  apiId: 12345678,                    // ID API Telegram Anda
  apiHash: 'your_api_hash_here',      // Hash API Telegram Anda
  
  // ============================================================================
  // NOMOR WHATSAPP
  // ============================================================================
  adminWaNumber: '6281234567890',     // Nomor WhatsApp Anda (admin)
  recipientNumber: '6281234567890',   // Nomor yang menerima notifikasi
  
  // ============================================================================
  // USERNAME YANG DIABAIKAN
  // ============================================================================
  // Username yang tidak akan diteruskan ke WhatsApp
  ignoredUsernames: [
    'AutoFtBot69',                    // Contoh bot yang diabaikan
    'SpamBot'                         // Tambahkan bot/username lain di sini
  ],
  
  // ============================================================================
  // KONFIGURASI OFFLINE MODE
  // ============================================================================
  // Hanya kirim notifikasi ketika Anda offline
  offlineMode: {
    enabled: true                     // Aktifkan mode offline
  }
} 