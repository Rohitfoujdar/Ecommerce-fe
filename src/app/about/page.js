import Title from "@/components/common/Title";
import React from "react";
import { assets } from "../../../public/assets/assets";
import Image from "next/image";
import { aboutData, chooseUsData } from "@/content/about";
import NewsLetterBox from "@/components/home/NewsLetterBox";
import { TEXT_ABOUT, TEXT_CHOOSE, TEXT_OUR_MISSION, TEXT_US, TEXT_WHY } from "../../../text";

export default function page() {
  return (
    <div className="section-width">
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1={TEXT_ABOUT} text2={TEXT_US} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <Image
          src={assets.about_img}
          alt="about"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          {aboutData.map((para, index) =>
            index === 2 ? (
              <div key={index}>
                <b className="text-gray-800">{TEXT_OUR_MISSION}</b>
                <p className="text-gray-600 mt-2">{para}</p>
              </div>
            ) : (
              <p key={index}>{para}</p>
            )
          )}
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={TEXT_WHY} text2={TEXT_CHOOSE} />
      </div>
      <div className="flex flex-col md:flex-row text-sm">
        {chooseUsData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          >
            <b>{item.title}</b>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <NewsLetterBox />
    </div>
  );
}
