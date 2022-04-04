const { ApolloServer } = require('apollo-server');
const apolloServerThumbnail = require('../src');
const ImageFetch = require('../src/imageFetcher');
const ImageResizer = require('../src/imageResizer');
const typeDefs = require('../src/typeDefs');
const resolvers = require('../src/resolvers');




it('add thumbnail image to image field', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [apolloServerThumbnail({ imageKey: 'imageUrl' })]
    });

    const url = 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg';
    const imageFetch = new ImageFetch();
    const imageResizer = new ImageResizer();

    const image = await imageFetch.fetchFromUrl(url)
    const resizedImage = await imageResizer.resize(image);

    const result = await testServer.executeOperation({
        query: 'query getProfileImage($userId: String) { profileImage(userId: $userId){ imageUrl thumbnail }  }',
        variables: { userId: '1234' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.profileImage.imageUrl).toBe('https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg');
    expect(result.data?.profileImage.thumbnail.length).toBe(resizedImage.length);
});

it('add thumbnail image to deeply nested image field', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [apolloServerThumbnail({ imageKey: 'imageUrl2', width: 500 })]
    });

    const url = 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg';
    const imageFetch = new ImageFetch();
    const imageResizer = new ImageResizer();

    const image = await imageFetch.fetchFromUrl(url)
    const resizedImage = await imageResizer.resize(image);

    const result = await testServer.executeOperation({
        query: 'query getPost{ post{ image{ imageUrl2 thumbnail } }  }',
        variables: { userId: '1234' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.post.image.imageUrl2).toBe('https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg');
    expect(result.data?.post.image.thumbnail).toBe(resizedImage);

});