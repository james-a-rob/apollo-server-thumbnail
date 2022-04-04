const resolvers = {
    Query: {
        profileImage: (_, { userId }) => {
            return { imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg' };
        },
        post: (_, { }) => {
            return {
                image: {
                    imageUrl2: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/71832b98840293.5ee5440c97543.jpg'
                }
            }
        },
    },
};

module.exports = resolvers;