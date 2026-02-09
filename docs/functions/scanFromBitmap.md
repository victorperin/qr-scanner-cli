[**qr-scanner-cli**](../README.md)

***

[qr-scanner-cli](../globals.md) / scanFromBitmap

# Function: scanFromBitmap()

> **scanFromBitmap**(`bitmap`, `flags?`): `Promise`\<`string`\>

Defined in: [src/pipelines/scanFromBitmap.ts:21](https://github.com/victorperin/qr-scanner-cli/blob/4d57ebebe2efc75f0342d4ca557f02d9a34bae85/src/pipelines/scanFromBitmap.ts#L21)

You can pass a jimp Bitmap, this functions reads it's content and tries to find a QR Code, returning it's result

```javascript
import Jimp from 'jimp'

const bitmap = Jimp.read('./image.jpg')
const value = await scanFromBitmap(bitmap)
```

## Parameters

### bitmap

[`Bitmap`](../interfaces/Bitmap.md)

A Bitmap object

### flags?

[`Flags`](../type-aliases/Flags.md)

## Returns

`Promise`\<`string`\>

Value read from the QR Code inside the image
