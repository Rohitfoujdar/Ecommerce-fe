import React from "react";
import { assets } from "../../../public/assets/assets";
import Image from "next/image";
import { footerItems } from "@/content/Footer";
import {
  TEXT_CALL,
  TEXT_COMPANY,
  TEXT_COPYRIGHT,
  TEXT_EMAIL,
  TEXT_FOOTER_DESCRIPTION,
  TEXT_GET_IN_TOUCH,
  TEXT_INSTA,
} from "../../../text";

export default function Footer() {
  return (
    <div className="section-width">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <Image src={assets.logo} alt="logo" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
            {TEXT_FOOTER_DESCRIPTION}
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">{TEXT_COMPANY}</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {footerItems.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">{TEXT_GET_IN_TOUCH}</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>{TEXT_CALL}</li>
            <li>{TEXT_EMAIL}</li>
            <li>{TEXT_INSTA}</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-300" />
        <p className="py-5 text-sm text-center">{TEXT_COPYRIGHT}</p>
      </div>
    </div>
  );
}
