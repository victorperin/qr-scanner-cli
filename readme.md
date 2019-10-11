# QR Scanner CLI

[![Build Status](https://travis-ci.org/victorperin/qr-scanner-cli.svg?branch=master)](https://travis-ci.org/victorperin/qr-scanner-cli)
[![Coverage Status](https://coveralls.io/repos/github/victorperin/qr-scanner-cli/badge.svg?branch=master)](https://coveralls.io/github/victorperin/qr-scanner-cli?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/victorperin/qr-scanner-cli.svg)](https://greenkeeper.io/)

QR Scanner CLI is a project that can resolve any QR code from an image on your desktop.

## Installation

Installation is done using the npm install command:

```
npm i -g qr-scanner-cli
```

## Usage

```
$ qrscanner <input file>
```

![New Demo Gif](./demo.gif)

## Options

```
- --clean  -c  Clear output, just print the QR Code scan result
- --version Show installed version
- --clipboard, -p  copy the qr code value to your clipboard
- --help Show this help
```

## Examples

```
$ qrscanner ./qrCode.jpg
╔══════════════════════════════════════════╗
║                                          ║
║   This message is written in a QR Code   ║
║                                          ║
╚══════════════════════════════════════════╝

$ qrscanner ./qrCode.jpg --clear
This message is written in a QR Code
```
