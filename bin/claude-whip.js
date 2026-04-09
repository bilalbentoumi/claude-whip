#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  console.error('Could not load Electron. Try: npm install -g claude-whip');
  process.exit(1);
}

const appPath = path.resolve(__dirname, '..');

const child = spawn(electronBinary, [appPath], {
  detached: true,
  stdio: process.platform === 'linux' ? 'inherit' : 'ignore',
  windowsHide: true,
});

child.on('error', (err) => {
  console.error('Failed to start claude-whip:', err.message);
  process.exit(1);
});

if (process.platform !== 'linux') {
  child.unref();
}
