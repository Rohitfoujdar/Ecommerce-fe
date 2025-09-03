"use client";
import { description, starImage } from "@/content/product";
import { ShopContext } from "@/context/ShopContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../../public/assets/assets";
import {
  TEXT_ADD_CARD,
  TEXT_DESCRIPTION,
  TEXT_E_COMMERCE,
  TEXT_E_COMMERCE_WEB,
  TEXT_REVIEW,
  TEXT_SELECT,
} from "../../../../text";
import RelatedProduct from "@/components/product/RelatedProduct";

export default function page() {
  const { id } = useParams();
  const { products, currency , addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchData = () => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, products]);

  return productData ? (
    <div className="section-width border-t-1 border-gray-300 pt-10 transition-opacity easy-in duration-500 opacity-100">
      {/* product */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[17.8%] w-full ">
            {productData.image.map((img, index) => (
              <Image
                onClick={() => setImage(img)}
                src={img}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <Image src={image} alt="first image" className="w-full h-auto" />
          </div>
        </div>

        {/* product detail */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex mt-2 items-center">
            {starImage.map((star, index) => (
              <Image key={index} src={star} className="w-3 5" alt="star" />
            ))}
            <Image src={assets.star_dull_icon} alt="star" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 text-sm">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-sm">{TEXT_SELECT}</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`cursor-pointer py-2 px-4 bg-gray-100 ${
                    item === size ? "border border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <button onClick={()=>addToCart(productData._id , size)} className="bg-black cursor-pointer text-white px-3 py-3 text-[12px] active:bg-gray-700 w-35">
              {TEXT_ADD_CARD}
            </button>
            <hr className="mt-5 text-gray-200" />
            <div className="text-[13px] text-gray-500 flex flex-col gap-1">
              {description.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* description and review section */}
      <div className="mt-10">
        <div className="flex">
          <b className="border border-gray-300 text-sm px-5 py-3">
            {TEXT_DESCRIPTION}
          </b>
          <p className="border border-gray-300 text-sm px-5 py-3">
            {TEXT_REVIEW}
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>{TEXT_E_COMMERCE}</p>
          <p>{TEXT_E_COMMERCE_WEB}</p>
        </div>
      </div>

      {/* Related products */}
      <div className="">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
