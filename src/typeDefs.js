const { gql } = require('apollo-server');

const typeDefs = gql`
    type Image {
        imageUrl: String
        imageUrl2: String
        thumbnail: String
    }

    type Post {
        image: Image

    }

    type Query {
        profileImage(userId: String): Image
        post: Post
    }
`;

module.exports = typeDefs;