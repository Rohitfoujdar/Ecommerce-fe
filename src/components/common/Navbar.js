"use client";
import React, { useContext, useState } from "react";
import { assets } from "../../../public/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { navItems, profileIcon } from "@/content/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { ShopContext } from "@/context/ShopContext";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const {setShowSearch , getCartCount} = useContext(ShopContext)

  const handleSearch = () =>{
   router.push("/collection")
   setShowSearch(true)
  }

  const handleLogout = () =>{
    localStorage.removeItem("userToken")
    router.push("/login")
  }

  return (
    <div className="">
      <div className="section-width flex justify-between items-center py-5 font-medium">
        <Link href="/">
          <Image src={assets.logo} alt="Store Logo" className="w-36" />
        </Link>
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
            onClick={handleSearch}
          />
          <div className="group relative">
            {/* <Link href="/login"> */}
              <Image
              src={assets.profile_icon}
              alt="Profile Icon"
              className="w-5 cursor-pointer"
            />
            {/* </Link> */}
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {profileIcon.map((item, index) => (
                  <p key={index} onClick={handleLogout} className="hover:text-black cursor-pointer">
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <Link href="/cart" className="relative">
            <Image src={assets.cart_icon} alt="Cart Icon" className="w-5" />
            <p className="absolute -right-1 -bottom-1 leading-4 aspect-square w-4 text-center rounded-full bg-black text-[8px] text-white ">
              {getCartCount()}
            </p>
          </Link>
          <Image
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="Menu bar"
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>

        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              className="flex item-center gap-4 p-3"
              onClick={() => setVisible(false)}
            >
              <Image
                className="h-4 w-4 rotate-180 cursor-pointer"
                src={assets.dropdown_icon}
                alt="dropdown"
              />
              <p>Back</p>
            </div>
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`py-2 pl-10 w-full ${
                  index === 0 ? "border-b border-t" : "border-b"
                } ${
                  pathName === item.href
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setVisible(false)}
              >
                <Link href={item.href}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
