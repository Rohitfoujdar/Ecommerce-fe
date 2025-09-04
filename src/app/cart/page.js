"use client";
import Title from "@/components/common/Title";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../public/assets/assets";

export default function page() {
  const { products, currency, cartItems , updateQuantity } = useContext(ShopContext);
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
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="section-width border-t border-gray-300 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-y border-gray-300 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
            >
              <div className="flex flex-start gap-6">
                 <Image alt="Product image" src={productData.image[0]} className="w-16 sm:w-20" />
                 <div>
                   <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                   <div className="flex item-center gap-5 mt-2 ">
                     <p>{currency}{productData.price}</p>
                     <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50">{item.size}</p>
                   </div>
                  </div>
              </div>
              <input className="border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
              <Image onClick={()=>updateQuantity(item._id , item.size , 0)} src={assets.bin_icon} alt="Delete" className="w-4 sm:w-5 mr-4 cursor-pointer" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
