// TypeScript definition for the package
declare module 'qrcode-reader' {

    type Value = { result: string }

    class QrCode {
        constructor()
        callback(error: Error, value: Value): void
        decode(imageBitmap: any): void
    }

    export = QrCode
}
