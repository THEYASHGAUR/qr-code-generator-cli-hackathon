#!/usr/bin/env node

const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const writeFile = promisify(fs.writeFile);

const args = process.argv.slice(2);

if (args.length < 1 || args.length > 2) {
  console.error('Please provide a message to encode and optionally a filename for the QR code image.');
  process.exit(1);
}

const message = args[0];
const filename = args[1] || 'qrcode.png';

qrcode.toFile(
  path.join(__dirname, filename),
  message,
  { margin: 1 },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`QR code generated for "${message}"`);
    console.log(`File saved to ${path.join(__dirname, filename)}`);

    // Open the generated image file using the default application
    const openCommand = process.platform === 'win32' ? 'start' : 'open';
    exec(`${openCommand} ${path.join(__dirname, filename)}`);
  }
);
