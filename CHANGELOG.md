# Changelog

## [1.0.0] - 2025-08-06

### ✨ Added
- **Telegram to WhatsApp Bridge** - Forward messages from Telegram to WhatsApp
- **Media Support** - Download and forward photos, videos, documents
- **Reply System** - Reply from WhatsApp to Telegram using `/reply @username message`
- **Self Message Filter** - Automatically ignore messages from yourself
- **Bot Filter** - Ignore messages from bots
- **Username Filter** - Configurable ignored usernames
- **PM2 Service Mode** - Run as background service with auto-restart
- **Offline Mode** - Only send notifications when you're offline
- **Auto Reconnect** - Automatic reconnection on connection loss

### 🔄 Changed
- **Consolidated Code** - Merged all functionality into single `whatsapp-simple.js`
- **Simplified Structure** - Removed unnecessary files and scripts
- **Clean Package.json** - Streamlined npm scripts

### 🗑️ Removed
- **Redundant Files** - Deleted test files, debug scripts, and unused utilities
- **Old Scripts** - Removed outdated npm commands

### 🛠️ Technical Details
- **Telegram API**: gramJS with StringSession authentication
- **WhatsApp API**: Baileys with multi-file auth state
- **Service Management**: PM2 with auto-restart and log rotation
- **Error Handling**: Comprehensive try-catch with graceful degradation 