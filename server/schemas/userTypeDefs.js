const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    # Add any other fields specific to your User type
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    userById(userId: ID!): User
    # Add any other queries specific to your project
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    # Add any other mutations specific to your project
  }
`;

module.exports = userTypeDefs;
