[qr-scanner-cli](README.md) / Exports

# qr-scanner-cli

## Table of contents

### Type aliases

- [Flags](modules.md#flags)

### Functions

- [scanFromFile](modules.md#scanfromfile)

## Type aliases

### Flags

Ƭ **Flags**: { `clear?`: *boolean* ; `clipboard?`: *boolean* ; `open?`: *boolean*  }

#### Type declaration:

Name | Type |
------ | ------ |
`clear?` | *boolean* |
`clipboard?` | *boolean* |
`open?` | *boolean* |

Defined in: [cli/flags.ts:13](https://github.com/victorperin/qr-scanner-cli/blob/c782de4/src/cli/flags.ts#L13)

## Functions

### scanFromFile

▸ `Const`**scanFromFile**(`filePath`: *string*, `flags?`: [*Flags*](modules.md#flags)): *Promise*<*string*\>

This function reads a file, get it's bitmap, searches and read a qrcode from it.
```
const value = await scanFromFile('./image.jpg')
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filePath` | *string* | A file path for an image file containing a QR Code   |
`flags?` | [*Flags*](modules.md#flags) |  |

**Returns:** *Promise*<*string*\>

Value read from the QR Code inside the image

Defined in: [pipelines/scanFromFile.ts:17](https://github.com/victorperin/qr-scanner-cli/blob/c782de4/src/pipelines/scanFromFile.ts#L17)
