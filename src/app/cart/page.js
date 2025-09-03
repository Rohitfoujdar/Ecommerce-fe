"use client";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";

export default function page() {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    console.log(tempData);
  }, [cartItems]);

  return <div></div>;
}
