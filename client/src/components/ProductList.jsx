import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ProductList = () => {
  const GET_PRODUCTS = gql`
    query {
      products {
        _id
        name
        description
        price
        category
        imageUrls
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.products;

  return (
    <div>
      <h1>Product Information</h1>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Product ${index}`} />
            ))}
            {/* Render other product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
