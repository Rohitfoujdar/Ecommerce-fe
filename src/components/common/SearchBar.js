// SearchBar.js
"use client";
import { useShopContext } from "@/context/ShopContext"; // Adjust path if needed
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "../../../public/assets/assets"; // Adjust path if needed
import { usePathname } from "next/navigation";
import { debounce } from "lodash";
import { toast } from "react-toastify";

export default function SearchBar() {
  const context = useShopContext();
  const { search, setSearch, showSearch, setShowSearch, searchProducts } = context;

  // Debug: Log context to ensure values are correct
  useEffect(() => {
    console.log("SearchBar context:", context);
    if (!searchProducts) {
      console.error("searchProducts is undefined in SearchBar context");
      toast.error("Context error: Search functionality unavailable");
    }
  }, [context]);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  // Set visibility based on path
  useEffect(() => {
    if (pathName.includes("/collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathName]);

  const debouncedSearch = debounce(async (query) => {
    setLoading(true);
    try {
      await searchProducts(query); 
    } catch (error) {
      console.error("Error in debounced search:", error);
      toast.error("Failed to search products");
    } finally {
      setLoading(false);
    }
  }, 5000); 

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel(); // Cleanup debounce
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value); // Update search state
  };

  return showSearch && visible ? (
    <div className="section-width border-t border-gray-400 bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={handleInputChange}
          type="text"
          placeholder="Search (e.g., black shirt under $100)"
          className="flex-1 outline-none bg-inherit text-sm"
          disabled={loading}
        />
        <Image className="w-4" src={assets.search_icon} alt="search" />
      </div>
      <Image
        onClick={() => setShowSearch(false)}
        className="inline cursor-pointer w-3"
        src={assets.cross_icon}
        alt="cross"
      />
      {loading && <p className="text-sm text-gray-500">Searching...</p>}
    </div>
  ) : null;
}