"use client";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import Title from "../common/Title";
import {
  TEXT_COLLECTION,
  TEXT_COLLECTION_DESCRIPTION,
  TEXT_LATEST,
} from "../../../text";
import ProductItem from "../common/ProductItem";
import { motion } from "framer-motion";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  console.log(products)
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="section-width">
      <div className="my-10">
        <motion.div
         initial={{opacity: 0 , y: -50}}
         animate={{opacity: 1 , y: 0}}
         transition={{duration: 4}}
         className="text-center py-8 text-3xl">
          <Title text1={TEXT_LATEST} text2={TEXT_COLLECTION} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            {TEXT_COLLECTION_DESCRIPTION}
          </p>
        </motion.div>
        <motion.div
         initial={{opacity: 0 , y: 50}}
         animate={{opacity: 1 , y: 0}}
         transition={{duration: 4}}
         className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
