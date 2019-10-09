# QR Scanner CLI

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

![Demo Gif](http://www.giphy.com/gifs/Kg9FXes7mUISW3kV3Y)

## Options

- `qrscanner --clean` or `qrscanner -c` Clears output and just prints the QR Code scan result
- `qrscanner --version` Shows installed version
- `qrscanner --help` Shows helpful information on npm module

```

## Examples

```

\$ qrscanner ./qrCode.jpg
╔══════════════════════════════════════════╗
║ ║
║ This message is written in a QR Code ║
║ ║
╚══════════════════════════════════════════╝

\$ qrscanner ./qrCode.jpg --clear
This message is written in a QR Code

```

```
