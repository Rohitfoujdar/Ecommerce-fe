"use client";
import React from "react";
import { assets } from "../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { navItems, profileIcon } from "@/content/Navbar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className="bg-amber-100">
      <div className="section-width flex justify-between items-center py-5 font-medium">
        <Image src={assets.logo} alt="Store Logo" className="w-36" />
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {navItems.map((item, index) => {
            const isActive = pathName === item.href;
            return (
              <Link
                key={index}
                className="flex flex-col items-center gap-1"
                href={item.href}
              >
                <p>{item.title}</p>
                {isActive && (
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
                )}
              </Link>
            );
          })}
        </ul>
        <div className="flex items-center gap-6">
          <Image
            src={assets.search_icon}
            alt="Search Icon"
            className="w-5 cursor-pointer"
          />
          <div className="group relative">
            <Image
              src={assets.profile_icon}
              alt="Profile Icon"
              className="w-5 cursor-pointer"
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {profileIcon.map((item, index) => (
                  <p key={index} className="hover:text-black cursor-pointer">
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <Link href="/cart" className="relative">
           <Image src= {assets.cart_icon} alt="Cart Icon" className="w-5" />
           <p className="absolute -right-1 -bottom-1 leading-4 aspect-square w-4 text-center rounded-full bg-black text-[8px] text-white ">10</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
