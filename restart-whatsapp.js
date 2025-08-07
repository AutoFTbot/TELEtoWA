#!/usr/bin/env node

// ============================================================================
// SCRIPT RESTART WHATSAPP UNTUK TELEtoWA
// ============================================================================

const fs = require('fs');
const path = require('path');

console.log('🔄 TELEtoWA WhatsApp Restart Script');
console.log('=====================================');

// Fungsi untuk membersihkan session yang bermasalah
function cleanWhatsAppSession() {
  const authDir = './auth_info';
  
  if (fs.existsSync(authDir)) {
    console.log('🧹 Cleaning WhatsApp session files...');
    
    try {
      // Hapus file session yang mungkin bermasalah
      const filesToRemove = [
        'app-state-sync-key',
        'app-state-sync-version',
        'auth_info_baileys.json'
      ];
      
      filesToRemove.forEach(file => {
        const filePath = path.join(authDir, file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`✅ Removed: ${file}`);
        }
      });
      
      console.log('✅ Session cleanup completed');
      return true;
    } catch (error) {
      console.error('❌ Error during cleanup:', error.message);
      return false;
    }
  } else {
    console.log('ℹ️ No auth_info directory found');
    return true;
  }
}

// Fungsi untuk restart PM2
function restartPM2() {
  console.log('🔄 Restarting PM2 process...');
  
  const { exec } = require('child_process');
  
  exec('pm2 restart TELEtoWA', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error restarting PM2:', error.message);
      return;
    }
    
    if (stderr) {
      console.log('⚠️ PM2 stderr:', stderr);
    }
    
    console.log('✅ PM2 restart command executed');
    console.log('📋 Output:', stdout);
    
    // Cek status setelah restart
    setTimeout(() => {
      exec('pm2 status', (error, stdout, stderr) => {
        if (!error) {
          console.log('\n📊 Current PM2 Status:');
          console.log(stdout);
        }
      });
    }, 3000);
  });
}

// Fungsi untuk cek log error
function checkErrorLogs() {
  const logFile = './logs/err.log';
  
  if (fs.existsSync(logFile)) {
    console.log('\n📋 Recent Error Logs:');
    console.log('=====================');
    
    try {
      const content = fs.readFileSync(logFile, 'utf8');
      const lines = content.split('\n').slice(-20); // Ambil 20 baris terakhir
      lines.forEach(line => {
        if (line.trim()) {
          console.log(line);
        }
      });
    } catch (error) {
      console.error('❌ Error reading log file:', error.message);
    }
  } else {
    console.log('ℹ️ No error log file found');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--clean')) {
    console.log('🧹 Clean mode: Will remove session files');
    cleanWhatsAppSession();
  }
  
  if (args.includes('--logs')) {
    checkErrorLogs();
  }
  
  if (args.includes('--restart')) {
    console.log('🔄 Restart mode: Will restart PM2 process');
    restartPM2();
  }
  
  // Default action jika tidak ada argumen
  if (args.length === 0) {
    console.log('ℹ️ No arguments provided. Available options:');
    console.log('  --clean   : Clean WhatsApp session files');
    console.log('  --logs    : Show recent error logs');
    console.log('  --restart : Restart PM2 process');
    console.log('  --all     : Clean + Restart');
    console.log('');
    console.log('💡 Recommended: node restart-whatsapp.js --all');
  }
  
  if (args.includes('--all')) {
    console.log('🔄 Full restart mode: Clean + Restart');
    cleanWhatsAppSession();
    setTimeout(restartPM2, 2000);
  }
}

// Jalankan script
main().catch(console.error); 