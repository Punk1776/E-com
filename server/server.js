const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const productRoutes = require('./routes/api/product-routes'); // Adjust the path accordingly
const userRoutes = require('./routes/api/user-routes');
const cors = require('cors');


const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

// Mount the product routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Mount user routes

// Start the Apollo Server
server.start().then(() => {
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
});
