const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./userTypeDefs');
const userResolvers = require('./userResolvers');
const existingTypeDefs = require('./typeDefs');
const existingResolvers = require('./resolvers');

const combinedTypeDefs = mergeTypeDefs([userTypeDefs, existingTypeDefs]);
const combinedResolvers = mergeResolvers([userResolvers, existingResolvers]);

module.exports = { typeDefs: combinedTypeDefs, resolvers: combinedResolvers };
