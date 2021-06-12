[qr-scanner-cli](README.md) / Exports

# qr-scanner-cli

## Table of contents

### Interfaces

- [Bitmap](interfaces/bitmap.md)

### Type aliases

- [Flags](modules.md#flags)

### Functions

- [scanFromBitmap](modules.md#scanfrombitmap)
- [scanFromFile](modules.md#scanfromfile)

## Type aliases

### Flags

Ƭ **Flags**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear?` | `boolean` |
| `clipboard?` | `boolean` |
| `open?` | `boolean` |

#### Defined in

[src/cli/flags.ts:1](https://github.com/victorperin/qr-scanner-cli/blob/2f818b9/src/cli/flags.ts#L1)

## Functions

### scanFromBitmap

▸ `Const` **scanFromBitmap**(`bitmap`, `flags?`): `Promise`<string\>

You can pass a jimp Bitmap, this functions reads it's content and tries to find a QR Code, returning it's result
```javascript
import Jimp from 'jimp'

const bitmap = Jimp.read('./image.jpg')
const value = await scanFromBitmap(bitmap)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bitmap` | [Bitmap](interfaces/bitmap.md) | A Bitmap object |
| `flags?` | [Flags](modules.md#flags) |  |

#### Returns

`Promise`<string\>

Value read from the QR Code inside the image

#### Defined in

[src/pipelines/scanFromBitmap.ts:20](https://github.com/victorperin/qr-scanner-cli/blob/2f818b9/src/pipelines/scanFromBitmap.ts#L20)

___

### scanFromFile

▸ `Const` **scanFromFile**(`filePath`, `flags?`): `Promise`<string\>

This function reads a file, get it's bitmap, searches and read a qrcode from it.
```javascript
const value = await scanFromFile('./image.jpg')
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | A file path for an image file containing a QR Code |
| `flags?` | [Flags](modules.md#flags) |  |

#### Returns

`Promise`<string\>

Value read from the QR Code inside the image

#### Defined in

[src/pipelines/scanFromFile.ts:17](https://github.com/victorperin/qr-scanner-cli/blob/2f818b9/src/pipelines/scanFromFile.ts#L17)
