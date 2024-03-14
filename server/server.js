const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const typeDefs = require("../server/schemas/typedefs");
const resolvers = require("../server/schemas/resolvers");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  // Create an instance of ApolloServer with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context: ({ req }) => {
      // Pass only necessary information from the request to the context
      const token = req.headers.authorization || "";
      return { token };
    },
  });

  // Apply ApolloServer instance as middleware to Express
  await server.start();
  server.applyMiddleware({ app });

  // Middleware to parse incoming requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  // Auth middleware should be applied after Apollo middleware
  app.use(authMiddleware);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // Log server start
  await db.once("open", () => {
    console.log("Connected to the database");
  });

  app.listen(PORT, () => {
    console.log(
      `🌍 Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

// Start Apollo Server and Express
startApolloServer();
