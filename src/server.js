const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const apolloServerThumbnail = require('./index');

const server = new ApolloServer({ typeDefs, resolvers, plugins: [apolloServerThumbnail({ imageKey: 'imageUrl2' })] });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});