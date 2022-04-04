const ImageFetch = require('../src/imageFetcher');
const ImageResizer = require('../src/ImageResizer');

const imageFetch = new ImageFetch();
const imageResizer = new ImageResizer();
const inMemoryCache = {};

const resizeImage = async (url, size) => {
    if (inMemoryCache[url]) {
        return inMemoryCache[url];
    } else {
        const image = await imageFetch.fetchFromUrl(url);
        const resizedImage = await imageResizer.resize(image, size);
        inMemoryCache[url] = resizedImage;
        return resizedImage;
    }

}

const recurseThroughResponse = async (data, options) => {
    if (typeof data !== 'object') {
        return;
    }
    for (const field of Object.keys(data)) {
        if (field === 'thumbnail') {
            const image = await resizeImage(data[options.imageKey], options.width);
            data['thumbnail'] = image;
        }
        if (data[field]) {
            await recurseThroughResponse(data[field], options);
        }
    }

}

const apolloServerThumbnail = (options) => {
    return {
        async requestDidStart() {
            return {
                async willSendResponse(requestContext) {
                    try {
                        await recurseThroughResponse(requestContext.response.data, options);
                        return requestContext;
                    } catch (error) {
                        console.log("error when adding thumbnail images");
                        console.log(error);
                    }

                }
            }
        }
    }
}

module.exports = apolloServerThumbnail;