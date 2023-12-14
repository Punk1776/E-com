import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { _id, name, price, imageUrls } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  const quantity = cartItems[_id] || 0;

  const handleInputChange = (e) => {
    const newAmount = Number(e.target.value);

    if (newAmount >= 0) {
      updateCartItemCount(newAmount, _id);
    } else {
      // Optionally handle negative values or other validations
    }
  };

  const handleRemoveClick = () => {
    if (quantity > 0) {
      updateCartItemCount(quantity - 1, _id);
    }
  };

  if (quantity === 0) {
    return null; // Do not render anything if the quantity is 0
  }

  return (
    <div className="cartItem">
      <img src={imageUrls[0]} alt={name} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
      </div>
      <div className="countHandler">
        <button onClick={handleRemoveClick}> - </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
        />
        <button onClick={() => addToCart(_id)}> + </button>
      </div>
    </div>
  );
};

export default CartItem;
