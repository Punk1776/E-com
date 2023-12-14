import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Product } from "./product";
import "./shop.css";

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

export const Shop = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>QUANTUM THREADS CO.</h1>
      </div>

      <div className="products">
        {data.products.map((product) => (
          <Product key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};