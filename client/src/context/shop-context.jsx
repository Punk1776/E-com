import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      _id
      category
      color
      description
      imageUrls
      name
      price
    }
  }
`;

export const ShopContext = createContext({
  loading: true,
  error: null,
  cartItems: {},
  addToCart: () => {},
  updateCartItemCount: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  checkout: () => {},
  products: [],
});

export const ShopContextProvider = (props) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [cartItems, setCartItems] = useState({});

  const getDefaultCart = () => {
    if (!data || !data.products) return {};
    return data.products.reduce((cart, product) => {
      cart[product._id] = 0;
      return cart;
    }, {});
  };

  useEffect(() => {
    if (!loading && data && data.products && Object.keys(cartItems).length === 0) {
      setCartItems(getDefaultCart());
    }
  }, [loading, data, cartItems]);

  const isValidItemId = (itemId) => {
    return data.products.some((product) => product._id === itemId);
  };

  const getTotalCartAmount = () => {
    if (!data || !data.products) return 0;

    return Object.entries(cartItems).reduce((totalAmount, [itemId, count]) => {
      const itemInfo = data.products.find((product) => product._id === itemId);

      if (itemInfo && count > 0) {
        totalAmount += count * itemInfo.price;
      }

      return totalAmount;
    }, 0);
  };

  const addToCart = (_id) => {
    if (isValidItemId(_id)) {
      setCartItems((prev) => ({ ...prev, [_id]: prev[_id] + 1 }));
    } else {
      console.error("Invalid item ID:", _id);
    }
  };

  const removeFromCart = (_id) => {
    if (isValidItemId(_id)) {
      setCartItems((prev) => ({ ...prev, [_id]: Math.max(0, prev[_id]) }));
    } else {
      console.error("Invalid item ID:", _id);
    }
  };

  const updateCartItemCount = (newAmount, _id) => {
    if (isValidItemId(_id)) {
      setCartItems((prev) => ({ ...prev, [_id]: newAmount }));
    } else {
      console.error("Invalid item ID:", _id);
    }
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    loading,
    error,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    products: data ? data.products : [],
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};