const axios = require('axios');

class ImageFetcher {
    async fetchFromUrl(url) {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data, 'binary');
    }
}

module.exports = ImageFetcher;