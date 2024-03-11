const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

// GraphQL type definitions using the gql tag
const typeDefs = gql`
  type Book {
    _id: ID
    title: String
    author: String
    description: String
    image: String
    link: String
  }

  type Query {
    books: [Book]
    book(_id: ID!): Book
    # Add more query definitions as needed
  }

  type Mutation {
    addBook(title: String!, author: String!, description: String!, image: String!, link: String!): Book
    # Add more mutation definitions as needed
  }
`;

// Export both type definitions and resolvers
module.exports = { typeDefs, resolvers };