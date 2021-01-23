declare module 'qrcode-reader' {
  import { Bitmap } from '@jimp/core'

  export default class QrCode {
    callback: (error: Error | null, value: { result: string }) => void
    decode: (bitmap: Bitmap) => void
  }
}
