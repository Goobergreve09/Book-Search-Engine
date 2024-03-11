const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const typeDefs = require('../schemas/typedefs');
const resolvers = require('../schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  // Create an instance of ApolloServer with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Pass the request object to the context to access it in resolvers
      return { req };
    }
  });

  // Apply ApolloServer instance as middleware to Express
  await server.start();
  server.applyMiddleware({ app });


  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

 
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }


  app.use(authMiddleware);


  await db.once('open', () => {
    console.log('Connected to the database');
  });


  app.listen(PORT, () => {
    console.log(`🌍 Server listening on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start Apollo Server and Express
startApolloServer();

