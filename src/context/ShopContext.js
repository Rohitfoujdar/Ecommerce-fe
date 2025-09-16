// ShopContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

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

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = ()=>{
    let totalAmount = 0
    for(const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items) 
      for(const item in cartItems[items]){
       try{
         if(cartItems[items][item] > 0){
            totalAmount += itemInfo.price * cartItems[items][item]
         }
       }catch(err){
        console.log(err)
       }
      }
    }
    return totalAmount;
  }


  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/list`
      );
      if (response.data.success) {
        setProducts(response.data.products || []);
      } else {
        toast.error(response.data.message);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
      setProducts([]);
    }
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      await getProducts();
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search`,
        {
          params: { q: query },
        }
      );
      if (response.data.success) {
        setProducts(response.data.products || []);
      } else {
        toast.error(response.data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      toast.error("Failed to search products");
      setProducts([]);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {
          console.error("Error in getCartCount:", err);
        }
      }
    }
    return totalCount;
  };


  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    searchProducts,
    setProducts, 
    getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);

export default ShopContextProvider;