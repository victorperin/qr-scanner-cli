# QR Scanner CLI

[![Build Status](https://github.com/victorperin/qr-scanner-cli/workflows/pr-check/badge.svg?branch=main)](https://github.com/victorperin/qr-scanner-cli/actions?query=workflow%3Apr-check+branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/github/victorperin/qr-scanner-cli/badge.svg?branch=main)](https://coveralls.io/github/victorperin/qr-scanner-cli?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/victorperin/qr-scanner-cli/badge.svg)](https://snyk.io/test/github/victorperin/qr-scanner-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/db529f4bc96d3bc44341/maintainability)](https://codeclimate.com/github/victorperin/qr-scanner-cli/maintainability)

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

![New Demo Gif](https://media.giphy.com/media/u5FnaAB5tqlSJr9GuT/source.gif)

## Options

Access all available and updated options passing the `--help` argument:

```
qrscanner --help
```

A view of the options at release [v1.0.0](https://github.com/victorperin/qr-scanner-cli/releases/tag/v1.0.0):

```
--clear, -c  Clear output, just print the QR Code scan result
--clipboard, -p  copy the qr code value to your clipboard
--version Show installed version
--help Show this help
```

> Consider that this list may be outdated, always refer to the `help` option described above.

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

## Programatic Usage

You can also install this as a lib and use the programatic mode. Don't forget to read our [documentation](./docs/modules.md).

```
npm install qr-scanner-cli
```

```javascript
// some-file.js
import { scanFromFile } from 'qr-scanner-cli'

const value = await scanFromFile('./image.jpg')
```
