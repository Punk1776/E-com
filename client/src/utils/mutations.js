import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Add more mutations if needed...

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $category: String!
    $size: String!
    $color: String!
    $imageUrls: [String!]!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      category: $category
      size: $size
      color: $color
      imageUrls: $imageUrls
    ) {
      _id
      username
      email
      productCount
      savedProducts {
        _id
        name
        description
        price
        category
        size
        color
        imageUrls
      }
    }
  }
`;

// Add more mutations if needed...


export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
      username
      email
      productCount
      savedProducts {
        _id
        name
        description
        price
        category
        size
        color
        imageUrls
      }
    }
  }
`;
