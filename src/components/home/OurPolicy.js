import Image from "next/image";
import React from "react";
import { ourPolicy } from "@/content/Home";

export default function OurPolicy() {
  return (
    <div className="section-width">
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        {ourPolicy.map((item, index) => (
          <div key={index}>
            <Image
              src={item.image}
              className="w-12 m-auto mb-5"
              alt="exhange-icon"
            />
            <p className="font-semibold">{item.title}</p>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
