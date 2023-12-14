import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { ShopContext } from '../../context/shop-context';
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

// Define your GraphQL query
const GET_PRODUCT = gql`
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


export const Cart = () => {
  const { getTotalCartAmount, checkout, cartItems } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Fetch cart items using Apollo Client's useQuery hook
  const { loading, error, data } = useQuery(GET_PRODUCT, navigate);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data and data.products are defined before mapping over it
  const products = data && data.products ? data.products : [];

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      {totalAmount > 0 ? (
        <div className="cart">
          {products.map((product) => (
            <CartItem key={product._id} data={product} />
          ))}
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}

      {totalAmount > 0 && (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => { checkout(); navigate("/checkout"); }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};