# 🏗️ TELEtoWA Architecture Diagrams

## 📋 Table of Contents
- [System Overview](#system-overview)
- [Data Flow Diagram](#data-flow-diagram)
- [Component Architecture](#component-architecture)
- [Error Recovery Flow](#error-recovery-flow)
- [Deployment Architecture](#deployment-architecture)

---

## 🌐 System Overview

### 🇮🇩 Bahasa Indonesia
```
┌─────────────────────────────────────────────────────────────────┐
│                    TELEtoWA - Bridge System                     │
│              Jembatan Telegram ke WhatsApp                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   📱 Telegram   │    │   🔧 TELEtoWA   │    │   📱 WhatsApp   │
│                 │    │                 │    │                 │
│ • User Messages │◄──►│ • Auto Forward  │◄──►│ • Notifications │
│ • Media Files   │    │ • Smart Reply   │    │ • Admin Commands│
│ • Bot Filter    │    │ • Error Recovery│    │ • Media Support │
│ • Offline Mode  │    │ • Session Mgmt  │    │ • Real-time     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🇺🇸 English
```
┌─────────────────────────────────────────────────────────────────┐
│                    TELEtoWA - Bridge System                     │
│              Telegram to WhatsApp Bridge                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   📱 Telegram   │    │   🔧 TELEtoWA   │    │   📱 WhatsApp   │
│                 │    │                 │    │                 │
│ • User Messages │◄──►│ • Auto Forward  │◄──►│ • Notifications │
│ • Media Files   │    │ • Smart Reply   │    │ • Admin Commands│
│ • Bot Filter    │    │ • Error Recovery│    │ • Media Support │
│ • Offline Mode  │    │ • Session Mgmt  │    │ • Real-time     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🔄 Data Flow Diagram

### 🇮🇩 Bahasa Indonesia
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  Telegram   │     │ TELEtoWA    │
│  Telegram   │────►│   Client    │────►│   Bridge    │
└─────────────┘     └─────────────┘     └─────────────┘
                                                    │
                                                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Admin     │     │  WhatsApp   │     │   PM2       │
│  WhatsApp   │◄────│   Client    │◄────│  Service    │
└─────────────┘     └─────────────┘     └─────────────┘

Flow:
1. User kirim pesan ke Telegram
2. Telegram Client terima pesan
3. TELEtoWA Bridge proses pesan
4. WhatsApp Client kirim notifikasi
5. Admin terima notifikasi di WhatsApp
6. Admin bisa reply dengan command
7. Reply dikirim kembali ke user Telegram
```

### 🇺🇸 English
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  Telegram   │     │ TELEtoWA    │
│  Telegram   │────►│   Client    │────►│   Bridge    │
└─────────────┘     └─────────────┘     └─────────────┘
                                                    │
                                                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Admin     │     │  WhatsApp   │     │   PM2       │
│  WhatsApp   │◄────│   Client    │◄────│  Service    │
└─────────────┘     └─────────────┘     └─────────────┘

Flow:
1. User sends message to Telegram
2. Telegram Client receives message
3. TELEtoWA Bridge processes message
4. WhatsApp Client sends notification
5. Admin receives notification in WhatsApp
6. Admin can reply with command
7. Reply sent back to Telegram user
```

---

## 🧩 Component Architecture

### 🇮🇩 Bahasa Indonesia
```
┌─────────────────────────────────────────────────────────────────┐
│                        TELEtoWA v1.1.0                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   📡 Telegram   │  │   🔧 Core       │  │   📱 WhatsApp   │
│   Components    │  │   Engine        │  │   Components    │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • StringSession │  │ • Message       │  │ • Baileys       │
│ • Telegram API  │  │   Processor     │  │ • Multi-file    │
│ • Event Handler │  │ • Media Handler │  │   Auth State    │
│ • User Filter   │  │ • Reply System  │  │ • Socket Mgmt   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🛠️ Recovery   │  │   📊 Monitoring │  │   ⚙️ PM2        │
│   System        │  │   & Logs        │  │   Service       │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • Auto Retry    │  │ • Error Logs    │  │ • Auto Restart  │
│ • Session Clean │  │ • Status Check  │  │ • Process Mgmt  │
│ • Reconnect     │  │ • Performance   │  │ • Log Rotation  │
│ • Error Handler │  │ • Health Check  │  │ • Memory Limit  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 🇺🇸 English
```
┌─────────────────────────────────────────────────────────────────┐
│                        TELEtoWA v1.1.0                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   📡 Telegram   │  │   🔧 Core       │  │   📱 WhatsApp   │
│   Components    │  │   Engine        │  │   Components    │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • StringSession │  │ • Message       │  │ • Baileys       │
│ • Telegram API  │  │   Processor     │  │ • Multi-file    │
│ • Event Handler │  │ • Media Handler │  │   Auth State    │
│ • User Filter   │  │ • Reply System  │  │ • Socket Mgmt   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🛠️ Recovery   │  │   📊 Monitoring │  │   ⚙️ PM2        │
│   System        │  │   & Logs        │  │   Service       │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • Auto Retry    │  │ • Error Logs    │  │ • Auto Restart  │
│ • Session Clean │  │ • Status Check  │  │ • Process Mgmt  │
│ • Reconnect     │  │ • Performance   │  │ • Log Rotation  │
│ • Error Handler │  │ • Health Check  │  │ • Memory Limit  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🔄 Error Recovery Flow

### 🇮🇩 Bahasa Indonesia
```
┌─────────────────┐
│   Error Detected│
│   (Bad MAC,     │
│   Connection     │
│   Closed)        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Auto Retry    │
│   (3 attempts)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐     ┌─────────────────┐
│   Retry Failed  │────►│   Session       │
│   (All attempts)│     │   Cleanup       │
└─────────────────┘     └─────────┬───────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│   Reconnect     │◄────│   PM2 Restart   │
│   WhatsApp      │     │   (Auto)        │
└─────────┬───────┘     └─────────────────┘
          │
          ▼
┌─────────────────┐
│   Success!      │
│   System Ready  │
└─────────────────┘
```

### 🇺🇸 English
```
┌─────────────────┐
│   Error Detected│
│   (Bad MAC,     │
│   Connection     │
│   Closed)        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Auto Retry    │
│   (3 attempts)  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐     ┌─────────────────┐
│   Retry Failed  │────►│   Session       │
│   (All attempts)│     │   Cleanup       │
└─────────────────┘     └─────────┬───────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│   Reconnect     │◄────│   PM2 Restart   │
│   WhatsApp      │     │   (Auto)        │
└─────────┬───────┘     └─────────────────┘
          │
          ▼
┌─────────────────┐
│   Success!      │
│   System Ready  │
└─────────────────┘
```

---

## 🚀 Deployment Architecture

### 🇮🇩 Bahasa Indonesia
```
┌─────────────────────────────────────────────────────────────────┐
│                    Production Environment                       │
│                    Lingkungan Produksi                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🌐 Internet   │  │   🖥️ Server     │  │   📱 Mobile     │
│   Connection    │  │   (VPS/Cloud)   │  │   Devices       │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • Stable        │  │ • Node.js 16+   │  │ • Telegram App  │
│ • High Speed    │  │ • PM2 Process   │  │ • WhatsApp App  │
│ • Firewall      │  │ • Auto Restart  │  │ • QR Scanner    │
│ • SSL/TLS       │  │ • Log Rotation  │  │ • Admin Access  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   📁 File       │  │   🔐 Security   │  │   📊 Monitoring │
│   System        │  │   & Auth        │  │   & Backup      │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • auth_info/    │  │ • API Keys      │  │ • PM2 Status    │
│ • logs/         │  │ • Session Mgmt  │  │ • Error Logs    │
│ • config.js     │  │ • Access Control│  │ • Performance   │
│ • Backup Files  │  │ • Encryption    │  │ • Health Check  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 🇺🇸 English
```
┌─────────────────────────────────────────────────────────────────┐
│                    Production Environment                       │
│                    Production Environment                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🌐 Internet   │  │   🖥️ Server     │  │   📱 Mobile     │
│   Connection    │  │   (VPS/Cloud)   │  │   Devices       │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • Stable        │  │ • Node.js 16+   │  │ • Telegram App  │
│ • High Speed    │  │ • PM2 Process   │  │ • WhatsApp App  │
│ • Firewall      │  │ • Auto Restart  │  │ • QR Scanner    │
│ • SSL/TLS       │  │ • Log Rotation  │  │ • Admin Access  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   📁 File       │  │   🔐 Security   │  │   📊 Monitoring │
│   System        │  │   & Auth        │  │   & Backup      │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • auth_info/    │  │ • API Keys      │  │ • PM2 Status    │
│ • logs/         │  │ • Session Mgmt  │  │ • Error Logs    │
│ • config.js     │  │ • Access Control│  │ • Performance   │
│ • Backup Files  │  │ • Encryption    │  │ • Health Check  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 📊 Message Flow Sequence

### 🇮🇩 Bahasa Indonesia
```
User Telegram ──► TELEtoWA ──► Admin WhatsApp
     │               │               │
     ▼               ▼               ▼
  1. Kirim Pesan   2. Terima &      3. Terima
     (Text/Media)    Proses          Notifikasi
     │               │               │
     ▼               ▼               ▼
  4. Terima Reply  5. Kirim Reply   6. Kirim Command
     ◄───────────────◄───────────────◄
     /reply @user pesan
```

### 🇺🇸 English
```
User Telegram ──► TELEtoWA ──► Admin WhatsApp
     │               │               │
     ▼               ▼               ▼
  1. Send Message  2. Receive &     3. Receive
     (Text/Media)    Process         Notification
     │               │               │
     ▼               ▼               ▼
  4. Receive Reply 5. Send Reply    6. Send Command
     ◄───────────────◄───────────────◄
     /reply @user message
```

---

## 🎯 Key Features Overview

### 🇮🇩 Bahasa Indonesia
```
┌─────────────────────────────────────────────────────────────────┐
│                    Fitur Utama TELEtoWA                         │
└─────────────────────────────────────────────────────────────────┘

🔄 Auto Forward     📱 Media Support     🤖 Smart Filter
• Real-time         • Foto & Video       • Bot Filter
• Multi-platform    • Dokumen            • Self Filter
• Offline Mode      • Audio Files        • Username Filter

💬 Smart Reply      🛠️ Auto Recovery     📊 Monitoring
• Command System    • Error Handling     • Real-time Logs
• Auto Reply        • Session Cleanup    • Performance
• User Targeting    • Auto Restart       • Health Check

⚡ High Performance  🔐 Security          🚀 Scalability
• PM2 Service       • API Encryption     • Multi-instance
• Memory Optimized  • Session Security   • Load Balancing
• Fast Response     • Access Control     • Auto Scaling
```

### 🇺🇸 English
```
┌─────────────────────────────────────────────────────────────────┐
│                    TELEtoWA Key Features                        │
└─────────────────────────────────────────────────────────────────┘

🔄 Auto Forward     📱 Media Support     🤖 Smart Filter
• Real-time         • Photos & Videos    • Bot Filter
• Multi-platform    • Documents          • Self Filter
• Offline Mode      • Audio Files        • Username Filter

💬 Smart Reply      🛠️ Auto Recovery     📊 Monitoring
• Command System    • Error Handling     • Real-time Logs
• Auto Reply        • Session Cleanup    • Performance
• User Targeting    • Auto Restart       • Health Check

⚡ High Performance  🔐 Security          🚀 Scalability
• PM2 Service       • API Encryption     • Multi-instance
• Memory Optimized  • Session Security   • Load Balancing
• Fast Response     • Access Control     • Auto Scaling
```

---

**📝 Note:** Diagrams ini dapat digunakan untuk dokumentasi, presentasi, atau README project Anda! 