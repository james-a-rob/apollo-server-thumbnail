const Jimp = require('jimp');

class ImageResizer {
    async resize(buffer, size = 400) {
        const image = await Jimp.read(buffer);
        const resizedImage = image.resize(size, Jimp.AUTO);
        const base64Image = await resizedImage.getBase64Async(Jimp.AUTO);

        var proc = require('child_process').spawn('pbcopy');
        proc.stdin.write(base64Image); proc.stdin.end();
        return base64Image;
    }
}

module.exports = ImageResizer;