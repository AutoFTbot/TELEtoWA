# 🚀 TELEtoWA - Jembatan Telegram ke WhatsApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Telegram](https://img.shields.io/badge/Telegram-API-blue.svg)](https://core.telegram.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Baileys-green.svg)](https://github.com/whiskeysockets/baileys)

**Meneruskan pesan dari Telegram ke WhatsApp secara otomatis dan bisa balas kembali!**  
**Sempurna untuk toko online, reseller, dan bisnis yang mengelola multiple platform.** 🎉

## ✨ Fitur

- 🔄 **Auto Forward** - Pesan dari Telegram otomatis dikirim ke WhatsApp
- 💬 **Smart Reply** - Balas dari WhatsApp kembali ke user Telegram
- 📸 **Support Media** - Foto, video, dokumen, file audio
- 🤖 **Filter Bot** - Otomatis abaikan spam bot
- 👤 **Filter Diri Sendiri** - Abaikan pesan dari diri sendiri
- 🔄 **Mode Offline** - Hanya kirim notifikasi ketika Anda offline
- ⚡ **Real-time** - Penerusan pesan instan
- 🛡️ **Aman** - Menggunakan API resmi Telegram dan WhatsApp
- 🔧 **Bisa Dikonfigurasi** - Mudah disesuaikan pengaturannya
- 🛠️ **Auto Recovery** - Restart otomatis saat error koneksi
- 📊 **Monitoring** - Logs dan status monitoring lengkap

## 🎯 Sempurna Untuk

- 🛍️ **Toko Online** (Fashion, Makanan, Elektronik)
- 💼 **Reseller & Dropshipper**
- 🏢 **Bisnis Kecil & UMKM**
- 📱 **Social Media Manager**
- 🎯 **Agen Properti, Travel Agent, dll.**

## 🚀 Cara Cepat Mulai

### Persyaratan

- Node.js 16+ terinstall
- Akun Telegram
- Akun WhatsApp
- Kredensial API Telegram (dapatkan dari [my.telegram.org](https://my.telegram.org))

### Instalasi

```bash
# Clone repository
git clone https://github.com/AutoFTbot/TELEtoWA.git
cd TELEtoWA

# Install dependencies
npm install

# Copy dan konfigurasi settings
cp config.example.js config.js
# Edit config.js dengan API keys dan nomor telepon Anda

# Setup WhatsApp (scan QR code)
npm run setup-wa

# Jalankan aplikasi
npm start          # Mode normal
npm run install-pm2 # Install sebagai service (direkomendasikan)
```

## 🔑 Cara Mendapatkan StringSession Telegram

### Langkah 1: Dapatkan API Credentials
1. Kunjungi [my.telegram.org](https://my.telegram.org)
2. Login dengan nomor telepon Telegram Anda
3. Buat aplikasi baru:
   - **App title:** TELEtoWA
   - **Short name:** teletoWA
   - **Platform:** Desktop
   - **Description:** Bridge Telegram to WhatsApp
4. Catat **api_id** dan **api_hash**

### Langkah 2: Generate StringSession
```bash
# Jalankan script untuk generate session
npm run get-session
```

**Ikuti langkah-langkah berikut:**
1. Masukkan nomor telepon (dengan kode negara, contoh: +628123456789)
2. Masukkan kode OTP yang dikirim Telegram
3. Jika ada 2FA, masukkan password
4. Copy StringSession yang muncul

### Langkah 3: Masukkan StringSession ke Kode
Edit file `whatsapp-simple.js` pada baris 125:

```javascript
const session = new StringSession(`1BQANOTEzOTA1NjA3NDU3OTg4OA...`); // ISI STRING SESSION ANDA DI SINI
```

**⚠️ PENTING:** 
- Ganti `#` dengan StringSession yang Anda dapatkan
- Jangan share StringSession dengan siapapun
- StringSession berisi kredensial login Anda

## ⚙️ Konfigurasi

Edit `config.js` dengan pengaturan Anda:

```javascript
module.exports = {
  // Kredensial API Telegram (dapatkan dari https://my.telegram.org)
  apiId: 12345678,                    // ID API Telegram Anda
  apiHash: 'your_api_hash_here',      // Hash API Telegram Anda
  
  // Nomor WhatsApp
  adminWaNumber: '6281234567890',     // Nomor WhatsApp Anda (admin)
  recipientNumber: '6281234567890',   // Nomor yang menerima notifikasi
  
  // Username yang diabaikan (tidak akan diteruskan ke WhatsApp)
  ignoredUsernames: [
    'AutoFtBot69',                    // Contoh bot yang diabaikan
    'SpamBot'                         // Tambahkan bot/username lain di sini
  ],
  
  // Konfigurasi mode offline
  offlineMode: {
    enabled: true                     // Hanya kirim notifikasi ketika Anda offline
  }
}
```

## 📱 Cara Pakai

### 1. Terima Pesan (Otomatis)
- Ketika seseorang kirim pesan ke Telegram Anda
- **BOOM!** Otomatis muncul di WhatsApp
- Support semua media: 📷 foto, 🎥 video, 📄 dokumen, 🎵 audio

### 2. Balas Pesan (2 Cara)

**Cara 1: Command Reply (Target Spesifik)**
```
/reply @username pesan
```
Contoh:
- `/reply @buyer123 Halo, stok sudah ready!`
- `/reply @customer456 Terima kasih atas pesanan Anda`

**Cara 2: Auto Reply (User Terakhir)**
```
Kirim pesan biasa di WhatsApp
```
→ Otomatis dikirim ke user Telegram terakhir

### 3. Contoh Skenario Jualan
1. **Pembeli Telegram:** "Ada kaos merah ukuran L?"
2. **Anda di WhatsApp:** Terima notifikasi langsung
3. **Anda balas:** `/reply @buyer123 Ada, harga 150k`
4. **Pembeli Telegram:** Terima balasan langsung!

**Mudah kan? Tidak perlu buka Telegram lagi!** 🚀

## 📜 Script yang Tersedia

```bash
# 🚀 Basic Commands
npm start              # Jalankan aplikasi
npm run setup-wa       # Setup WhatsApp (scan QR code)
npm run get-session    # Generate session Telegram baru
npm run help           # Tampilkan panduan

# 🔧 PM2 Service Management
npm run install-pm2    # Install sebagai service PM2
npm run pm2-start      # Start service PM2
npm run pm2-stop       # Stop service PM2
npm run pm2-restart    # Restart service PM2
npm run pm2-logs       # Lihat log PM2
npm run pm2-status     # Cek status PM2

# 🛠️ WhatsApp Connection Management (NEW!)
npm run wa-restart     # Restart lengkap (Clean + Restart PM2)
npm run wa-clean       # Bersihkan session files
npm run wa-logs        # Lihat error logs
npm run wa-restart-only # Restart PM2 tanpa cleanup
```

## 🔧 Troubleshooting

### Masalah Umum:

**1. Error "Authentication failed"**
- Jalankan ulang: `npm run setup-wa`
- Pastikan scan QR code dengan benar

**2. Error "Session expired"**
- Jalankan: `npm run get-session`
- Update StringSession di `whatsapp-simple.js`

**3. Error "Bad MAC" atau "Connection Closed"** ⚡ **NEW!**
- **Solusi cepat:** `npm run wa-restart`
- Ini membersihkan session bermasalah dan restart otomatis
- Lihat [Troubleshooting Guide](TROUBLESHOOTING.md) untuk detail lengkap

**4. Tidak terima notifikasi**
- Cek konfigurasi `recipientNumber`
- Pastikan mode offline tidak aktif jika Anda online

**5. Error koneksi**
- Cek koneksi internet
- Restart aplikasi: `npm run wa-restart` (recommended) atau `npm run pm2-restart`

### 🆕 Fitur Auto-Recovery
- **Auto restart setiap 12 jam** untuk mencegah session issues
- **Retry mechanism** untuk error koneksi
- **Session cleanup otomatis** saat restart
- **Monitoring logs** untuk debugging

💡 **Tips:** Gunakan `npm run wa-restart` sebagai solusi pertama untuk masalah koneksi WhatsApp!

## 🤝 Kontribusi

Kami menerima kontribusi! Lihat [Panduan Kontribusi](CONTRIBUTING.md) untuk detail.

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/fitur-keren`)
3. Commit perubahan (`git commit -m 'Tambah fitur keren'`)
4. Push ke branch (`git push origin feature/fitur-keren`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🛡️ Keamanan

Jika Anda menemukan kerentanan keamanan, silakan laporkan secara privat ke security@teletoWA.com daripada membuat issue publik.

## 📞 Support

- 📧 Email: support@teletoWA.com
- 💬 WhatsApp: +62 812-3456-7890
- 📱 Telegram: @TELEtoWA_support

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AutoFTbot/TELEtoWA&type=Date)](https://star-history.com/#AutoFTbot/TELEtoWA&Date)

---

**Dibuat dengan ❤️ oleh [AutoFTbot](https://github.com/AutoFTbot)** 