const Jimp = require("jimp");
const fs = require('fs');
const QrCode = require('qrcode-reader');

const buffer = fs.readFileSync(process.argv[2]);
Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        console.log(value.result);
    };
    qr.decode(image.bitmap);
});
