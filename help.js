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
 * Tampilkan panduan troubleshooting
 */
function displayTroubleshootingGuide() {
  console.log('🛠️ Troubleshooting (NEW!):')
  console.log('• npm run wa-restart   # Restart lengkap (recommended)')
  console.log('• npm run wa-clean     # Bersihkan session files')
  console.log('• npm run wa-logs      # Lihat error logs')
  console.log('• npm run test-connection # Test semua koneksi')
  console.log('• Lihat TROUBLESHOOTING.md untuk detail lengkap\n')
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
  console.log('✅ Auto recovery saat error koneksi (NEW!)')
  console.log('✅ Monitoring dan logs lengkap (NEW!)')
  console.log('✅ Session cleanup otomatis (NEW!)')
}

/**
 * Tampilkan daftar script yang tersedia
 */
function displayAvailableScripts() {
  console.log('\n📜 Script yang Tersedia:')
  console.log('🚀 Basic:')
  console.log('  npm start              # Jalankan aplikasi')
  console.log('  npm run setup-wa       # Setup WhatsApp')
  console.log('  npm run get-session    # Setup Telegram')
  console.log('')
  console.log('🔧 PM2 Management:')
  console.log('  npm run install-pm2    # Install service')
  console.log('  npm run pm2-start      # Start service')
  console.log('  npm run pm2-restart    # Restart service')
  console.log('  npm run pm2-status     # Cek status')
  console.log('  npm run pm2-logs       # Lihat logs')
  console.log('')
  console.log('🛠️ WhatsApp Management (NEW!):')
  console.log('  npm run wa-restart     # Restart lengkap')
  console.log('  npm run wa-clean       # Clean session')
  console.log('  npm run wa-logs        # Error logs')
  console.log('  npm run test-connection # Test koneksi')
}

/**
 * Tampilkan tips troubleshooting
 */
function displayTroubleshootingTips() {
  console.log('\n💡 Tips Troubleshooting:')
  console.log('• Jika error "Bad MAC" atau "Connection Closed":')
  console.log('  → Gunakan: npm run wa-restart')
  console.log('')
  console.log('• Jika tidak terima notifikasi:')
  console.log('  → Cek: npm run test-connection')
  console.log('  → Cek: npm run wa-logs')
  console.log('')
  console.log('• Jika aplikasi crash:')
  console.log('  → PM2 akan auto restart')
  console.log('  → Atau manual: npm run pm2-restart')
  console.log('')
  console.log('• Dokumentasi lengkap: TROUBLESHOOTING.md')
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
  displayTroubleshootingGuide()
  displayConfigurationGuide()
  displayFeatures()
  displayAvailableScripts()
  displayTroubleshootingTips()
}

// Jalankan panduan
showHelp() 