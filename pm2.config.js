// ============================================================================
// KONFIGURASI PM2 UNTUK TELEtoWA
// ============================================================================

module.exports = {
  apps: [{
    // ============================================================================
    // INFORMASI DASAR APLIKASI
    // ============================================================================
    name: 'TELEtoWA',
    script: 'whatsapp-simple.js',
    instances: 1,
    
    // ============================================================================
    // KONFIGURASI RESTART DAN WATCH
    // ============================================================================
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    // ============================================================================
    // KONFIGURASI ENVIRONMENT
    // ============================================================================
    env: {
      NODE_ENV: 'production'
    },
    
    // ============================================================================
    // KONFIGURASI LOG FILES
    // ============================================================================
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // ============================================================================
    // KONFIGURASI RESTART DAN UPTIME
    // ============================================================================
    // Restart jika crash
    max_restarts: 15,
    min_uptime: '30s',
    
    // Restart strategy untuk menangani error WhatsApp
    restart_delay: 5000,
    
    // Auto restart setiap 12 jam untuk mencegah memory leak dan session issues
    cron_restart: '0 */12 * * *',
    
    // ============================================================================
    // KONFIGURASI MONITORING
    // ============================================================================
    // Kill timeout jika aplikasi tidak merespons
    kill_timeout: 10000,
    
    // Wait ready untuk memastikan aplikasi sudah siap
    wait_ready: true,
    listen_timeout: 30000,
    
    // ============================================================================
    // KONFIGURASI ERROR HANDLING
    // ============================================================================
    // Restart jika ada error yang spesifik
    exp_backoff_restart_delay: 100,
    
    // ============================================================================
    // KONFIGURASI PERFORMANCE
    // ============================================================================
    node_args: '--max-old-space-size=1024',
    
    // ============================================================================
    // KONFIGURASI NOTIFICATION (OPSIONAL)
    // ============================================================================
    // Uncomment jika ingin notifikasi saat restart
    // notify: true
  }]
}