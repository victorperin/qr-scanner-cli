[**qr-scanner-cli**](../README.md)

***

[qr-scanner-cli](../globals.md) / scanFromFile

# Function: scanFromFile()

> **scanFromFile**(`filePath`, `flags?`): `Promise`\<`string`\>

Defined in: [src/pipelines/scanFromFile.ts:17](https://github.com/victorperin/qr-scanner-cli/blob/4d57ebebe2efc75f0342d4ca557f02d9a34bae85/src/pipelines/scanFromFile.ts#L17)

This function reads a file, get it's bitmap, searches and read a qrcode from it.
```javascript
const value = await scanFromFile('./image.jpg')
```

## Parameters

### filePath

`string`

A file path for an image file containing a QR Code

### flags?

[`Flags`](../type-aliases/Flags.md)

## Returns

`Promise`\<`string`\>

Value read from the QR Code inside the image
