const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        helloWorld: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
    }
`;

module.exports = typeDefs;