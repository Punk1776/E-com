const typeDefs = `
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    category: String
    size: [String]
    color: String
    imageUrls: [String]
    # Add more fields as needed
  }

  type Query {
    products: [Product]          # Query to retrieve all products
    productById(productId: ID!): Product # Query to fetch a product by ID
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      price: Float!
      category: String!
      size: [String]!
      color: String!
      imageUrls: [String]!
      # Add more fields as needed
    ): Product # Mutation to add a new product

    updateProduct(
      productId: ID!
      name: String
      description: String
      price: Float
      category: String
      size: [String]
      color: String
      imageUrls: [String]
      # Add more fields as needed
    ): Product # Mutation to update a product

    deleteProduct(productId: ID!): String # Mutation to delete a product
  }
`;

module.exports = typeDefs;
