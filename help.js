// ============================================================================
// TELEtoWA - PANDUAN PENGGUNAAN
// ============================================================================

/**
 * Tampilkan header aplikasi
 */
function displayHeader() {
  console.log('📋 TELEtoWA - Panduan Penggunaan\n')
}

/**
 * Tampilkan cara setup aplikasi
 */
function displaySetupGuide() {
  console.log('🚀 Cara Setup:')
  console.log('1. npm install')
  console.log('2. npm run setup-wa    # Setup WhatsApp (scan QR)')
  console.log('3. npm run get-session # Setup Telegram (jika perlu)')
  console.log('4. npm start           # Jalankan aplikasi\n')
}

/**
 * Tampilkan cara penggunaan aplikasi
 */
function displayUsageGuide() {
  console.log('📱 Cara Pakai:')
  console.log('• Pesan dari Telegram → Otomatis diterima di WhatsApp')
  console.log('• Reply di WhatsApp: /reply @username pesan')
  console.log('• Contoh: /reply @AutoFtbot halo, ini balasan\n')
}

/**
 * Tampilkan panduan service mode
 */
function displayServiceModeGuide() {
  console.log('🔧 Service Mode (untuk berjalan offline):')
  console.log('• npm run install-pm2  # Install sebagai service')
  console.log('• npm run pm2-status   # Cek status')
  console.log('• npm run pm2-logs     # Lihat logs\n')
}

/**
 * Tampilkan panduan konfigurasi
 */
function displayConfigurationGuide() {
  console.log('⚙️ Konfigurasi:')
  console.log('• Edit config.js untuk mengubah nomor dan username')
  console.log('• ignoredUsernames: username yang diabaikan')
  console.log('• adminWaNumber: nomor WhatsApp Anda')
  console.log('• recipientNumber: nomor yang menerima notifikasi\n')
}

/**
 * Tampilkan daftar fitur aplikasi
 */
function displayFeatures() {
  console.log('🎯 Fitur:')
  console.log('✅ Filter pesan dari diri sendiri')
  console.log('✅ Support media (foto, video, dokumen)')
  console.log('✅ Command reply dari WhatsApp')
  console.log('✅ Auto restart jika crash')
  console.log('✅ Berjalan offline dengan PM2')
}

// ============================================================================
// MULAI APLIKASI
// ============================================================================

/**
 * Fungsi utama untuk menampilkan panduan
 */
function showHelp() {
  displayHeader()
  displaySetupGuide()
  displayUsageGuide()
  displayServiceModeGuide()
  displayConfigurationGuide()
  displayFeatures()
}

// Jalankan panduan
showHelp() 