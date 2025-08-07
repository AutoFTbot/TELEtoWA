# 🔧 Troubleshooting Guide - TELEtoWA

## 📋 Daftar Isi
- [Error "Bad MAC" dan "Connection Closed"](#error-bad-mac-dan-connection-closed)
- [Cara Mengatasi Session Issues](#cara-mengatasi-session-issues)
- [Script Restart Otomatis](#script-restart-otomatis)
- [Monitoring dan Logs](#monitoring-dan-logs)
- [PM2 Configuration](#pm2-configuration)

---

## ❌ Error "Bad MAC" dan "Connection Closed"

### Penyebab Error
Error ini terjadi karena:
1. **Session WhatsApp yang bermasalah** - File session yang corrupt atau tidak valid
2. **Koneksi internet yang tidak stabil** - Terputus-putus atau lambat
3. **WhatsApp Web API yang bermasalah** - Server WhatsApp yang sedang maintenance
4. **Memory leak atau resource exhaustion** - Aplikasi berjalan terlalu lama

### Gejala Error
```
Failed to decrypt message with any known session...
Session error:Error: Bad MAC Error: Bad MAC
❌ Error kirim notifikasi: Connection Closed
```

---

## 🔄 Cara Mengatasi Session Issues

### 1. Restart Otomatis (Recommended)
```bash
# Restart lengkap dengan cleanup session
npm run wa-restart

# Atau menggunakan script langsung
node restart-whatsapp.js --all
```

### 2. Clean Session Manual
```bash
# Hanya bersihkan session files
npm run wa-clean

# Atau
node restart-whatsapp.js --clean
```

### 3. Restart PM2 Saja
```bash
# Restart PM2 tanpa cleanup
npm run wa-restart-only

# Atau
node restart-whatsapp.js --restart
```

---

## 🛠️ Script Restart Otomatis

### Fitur Script `restart-whatsapp.js`

#### Command yang Tersedia:
```bash
# Restart lengkap (Clean + Restart PM2)
node restart-whatsapp.js --all

# Hanya bersihkan session files
node restart-whatsapp.js --clean

# Hanya restart PM2
node restart-whatsapp.js --restart

# Lihat error logs
node restart-whatsapp.js --logs

# Tanpa argumen - tampilkan help
node restart-whatsapp.js
```

#### NPM Scripts (Lebih Mudah):
```bash
# Restart lengkap
npm run wa-restart

# Clean session
npm run wa-clean

# Lihat logs
npm run wa-logs

# Restart PM2 saja
npm run wa-restart-only
```

### File yang Dibersihkan:
- `auth_info/app-state-sync-key`
- `auth_info/app-state-sync-version`
- `auth_info/auth_info_baileys.json`

---

## 📊 Monitoring dan Logs

### 1. Cek Status PM2
```bash
npm run pm2-status
# atau
pm2 status
```

### 2. Lihat Logs Real-time
```bash
npm run pm2-logs
# atau
pm2 logs TELEtoWA
```

### 3. Lihat Error Logs
```bash
npm run wa-logs
# atau
node restart-whatsapp.js --logs
```

### 4. Cek File Logs Manual
```bash
# Error logs
tail -f logs/err.log

# Output logs
tail -f logs/out.log

# Combined logs
tail -f logs/combined.log
```

---

## ⚙️ PM2 Configuration

### Fitur Auto-Restart yang Ditambahkan:

#### 1. **Restart Strategy**
```javascript
max_restarts: 15,           // Maksimal 15x restart
min_uptime: '30s',          // Minimal uptime 30 detik
restart_delay: 5000,        // Delay 5 detik sebelum restart
```

#### 2. **Auto Restart Schedule**
```javascript
cron_restart: '0 */12 * * *'  // Restart setiap 12 jam
```

#### 3. **Monitoring**
```javascript
kill_timeout: 10000,        // Timeout 10 detik
wait_ready: true,           // Tunggu aplikasi ready
listen_timeout: 30000,      // Timeout 30 detik
```

#### 4. **Performance**
```javascript
node_args: '--max-old-space-size=1024'  // Memory limit 1GB
```

---

## 🚀 Best Practices

### 1. **Monitoring Rutin**
```bash
# Cek status setiap hari
pm2 status

# Monitor logs untuk error
pm2 logs TELEtoWA --lines 50
```

### 2. **Restart Preventif**
```bash
# Restart setiap 12 jam (sudah otomatis via PM2)
# Atau manual jika diperlukan
npm run wa-restart
```

### 3. **Backup Session**
```bash
# Backup folder auth_info sebelum restart
cp -r auth_info auth_info_backup_$(date +%Y%m%d)
```

### 4. **Cek Resource Usage**
```bash
# Monitor memory dan CPU
pm2 monit
```

---

## 🔍 Debugging

### 1. **Cek Koneksi WhatsApp**
```bash
# Lihat logs untuk koneksi
pm2 logs TELEtoWA | grep "WhatsApp"
```

### 2. **Cek Session Files**
```bash
# Lihat isi folder auth_info
ls -la auth_info/
```

### 3. **Test Koneksi Manual**
```bash
# Jalankan tanpa PM2 untuk debug
node whatsapp-simple.js
```

---

## 📞 Support

### Jika Masalah Berlanjut:

1. **Restart Server/VM** - Kadang perlu restart sistem
2. **Update Dependencies** - `npm update`
3. **Reinstall WhatsApp Session** - `npm run setup-wa`
4. **Cek Internet Connection** - Pastikan stabil
5. **Cek WhatsApp Web** - Pastikan bisa akses web.whatsapp.com

### Log Error untuk Support:
```bash
# Ambil log error terbaru
tail -n 100 logs/err.log > error_report.txt
```

---

## ✅ Checklist Troubleshooting

- [ ] Coba `npm run wa-restart`
- [ ] Cek logs dengan `npm run wa-logs`
- [ ] Monitor status dengan `npm run pm2-status`
- [ ] Cek koneksi internet
- [ ] Test akses web.whatsapp.com
- [ ] Restart server jika perlu
- [ ] Reinstall session jika semua gagal

---

**💡 Tips:** Gunakan `npm run wa-restart` sebagai solusi pertama untuk masalah koneksi WhatsApp! 