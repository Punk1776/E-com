import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = ({ data }) => {
  const { _id, name, price, imageUrls } = data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[_id] || 0;

  return (
    <div className="product">
      <img src={imageUrls[0]} alt={name} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(_id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};