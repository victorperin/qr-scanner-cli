#! /usr/bin/env node
const Jimp = require('jimp');
const chalk = require('chalk');
const boxen = require('boxen');
const fs = require('fs');
const meow = require('meow');
const QrCode = require('qrcode-reader');

const cli = meow(`
    Usage
      $ qrscanner <input file>

    Options
      --clean, -c  Clear output, just print the QR Code scan result
      --version Show installed version
      --help Show this help

    Examples
      $ qrscanner ./qrCode.jpg
      ${chalk.green('╔══════════════════════════════════════════╗')}
      ${chalk.green('║')}                                          ${chalk.green('║')}
      ${chalk.green('║')}   This message is written in a QR Code   ${chalk.green('║')}
      ${chalk.green('║')}                                          ${chalk.green('║')}
      ${chalk.green('╚══════════════════════════════════════════╝')}

      $ qrscanner ./qrCode.jpg --clear
      This message is written in a QR Code
`, {
  flags: {
    clear: {
      type: 'boolean',
      alias: 'c',
    },
  },
});

function qrScannerCli(inputFile, { clear }) {
  if (!inputFile) {
    cli.showHelp(1);
  }

  const buffer = fs.readFileSync(inputFile);
  Jimp.read(buffer, (err, image) => {
    if (err) {
      console.error(err);
    // TODO handle error
    }
    const qr = new QrCode();
    qr.callback = (callbackError, value) => {
      if (callbackError) {
        console.error(callbackError);
      // TODO handle error
      }
      const scanResult = value.result;

      if (clear) {
        console.log(scanResult);
        return;
      }

      console.log(boxen(scanResult, {
        padding: 1,
        borderStyle: 'double',
        borderColor: 'green',
      }));
    };
    qr.decode(image.bitmap);
  });
}


qrScannerCli(cli.input[0], cli.flags);
