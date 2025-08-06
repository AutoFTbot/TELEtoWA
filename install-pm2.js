const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============================================================================
// KONFIGURASI
// ============================================================================

const LOGS_DIR = './logs';
const PM2_CONFIG_FILE = 'pm2.config.js';

// ============================================================================
// FUNGSI UTILITAS
// ============================================================================

/**
 * Buat direktori logs jika belum ada
 */
function createLogsDirectory() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR);
    console.log('✅ Created logs directory');
  }
}

/**
 * Jalankan command dengan promise
 * @param {string} command - Command yang akan dijalankan
 * @returns {Promise} - Promise dari command execution
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Tampilkan panduan PM2 commands
 */
function displayPM2Commands() {
  console.log('\n📋 PM2 Commands:');
  console.log('pm2 status          # Check status');
  console.log('pm2 logs TELEtoWA   # View logs');
  console.log('pm2 restart TELEtoWA # Restart service');
  console.log('pm2 stop TELEtoWA   # Stop service');
  console.log('pm2 delete TELEtoWA # Remove service');
  console.log('\n🎯 Application will run continuously and restart automatically!');
}

// ============================================================================
// INSTALASI PM2
// ============================================================================

/**
 * Install PM2 secara global
 */
async function installPM2() {
  console.log('📦 Installing PM2 globally...');
  
  try {
    await executeCommand('npm install -g pm2');
    console.log('✅ PM2 installed successfully');
    return true;
  } catch (error) {
    console.error('❌ Error installing PM2:', error.message);
    return false;
  }
}

/**
 * Start aplikasi dengan PM2
 */
async function startWithPM2() {
  console.log('\n🚀 Starting TELEtoWA with PM2...');
  
  try {
    await executeCommand('pm2 start pm2.config.js');
    console.log('✅ TELEtoWA started with PM2!');
    displayPM2Commands();
    return true;
  } catch (error) {
    console.error('❌ Error starting PM2:', error.message);
    return false;
  }
}

// ============================================================================
// PROSES INSTALASI UTAMA
// ============================================================================

/**
 * Proses instalasi PM2 dan setup service
 */
async function installPM2Service() {
  console.log('🚀 Installing PM2 and setting up TELEtoWA service...\n');

  // Buat direktori logs
  createLogsDirectory();

  // Install PM2
  const pm2Installed = await installPM2();
  if (!pm2Installed) {
    return;
  }

  // Start aplikasi dengan PM2
  await startWithPM2();
}

// ============================================================================
// MULAI INSTALASI
// ============================================================================

// Jalankan proses instalasi
installPM2Service(); 