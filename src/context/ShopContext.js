"use client";
import { createContext, useEffect, useState } from "react";
import { products } from "../../public/assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deleviry_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      return toast.error("Please select at least one size");
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () =>{
    let totalCount = 0
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try{
          if(cartItems[items][item] > 0){
            totalCount += cartItems[items][item]
          }
        }catch(err){

        }
      }
    }
    return totalCount;
  }

  const value = {
    products,
    currency,
    deleviry_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
