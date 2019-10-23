declare module 'qrcode-reader' {
  export default class QrCode {
    public callback: (error: Error | string, value: { result: string }) => void

    public decode: (bitmap: import('jimp').Bitmap) => void
  }
}
