"use client";
import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../../public/assets/assets";
import Image from "next/image";
import { TEXT_LATEST_ARRIVALS, TEXT_OUR_BESTSELLER, TEXT_SHOP_NOW } from "../../../text";

export default function Hero() {
  return (
    <div className="section-width">
      <div className="flex flex-col sm:flex-row border border-gray-300">
        
        {/* Hero left side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
          className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
        >
          <div className="text-primary">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-primary"></p>
              <p className="font-medium text-sm md:text-base">
                {TEXT_OUR_BESTSELLER}
              </p>
            </div>
            <h1 className="prata-regular text-3xl pt-3 lg:text-5xl leading-relaxed">
              {TEXT_LATEST_ARRIVALS}
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">{TEXT_SHOP_NOW}</p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
          </div>
        </motion.div>

        {/* Hero right side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
          className="w-full sm:w-1/2"
        >
          <Image src={assets.hero_img} alt="Hero section image" className="w-full" />
        </motion.div>
      </div>
    </div>
  );
}
