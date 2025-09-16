"use client";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import { categoryFilter, subCategoryFilter } from "@/content/Collection";
import Image from "next/image";
import { assets } from "../../../public/assets/assets";
import Title from "@/components/common/Title";
import ProductItem from "@/components/common/ProductItem";
import {
  TEXT_CATEGORIES,
  TEXT_FILTER,
  TEXT_SORT_HIGH,
  TEXT_SORT_LOW,
  TEXT_SORT_RELAVENT,
  TEXT_TYPE,
} from "../../../text";

export default function Page() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setAllProducts(productCopy);
  };

  const shortFilter = () => {
    let filterProductCopy = allProducts.slice();

    switch (sortType) {
      case "low-high":
        setAllProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setAllProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    shortFilter();
  }, [sortType]);

  return (
    <div className="section-width">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
        {/* Filter Option */}
        <div className="min-w-50">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            {TEXT_FILTER}
            <Image
              src={assets.dropdown_icon}
              className={`h-3 w-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              alt="Dropdown"
            />
          </p>
          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">{TEXT_CATEGORIES}</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {categoryFilter.map((item, index) => (
                <p key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={item.value}
                    onChange={toggleCategory}
                  />
                  {item.title}
                </p>
              ))}
            </div>
          </div>
          {/* SubCategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5  ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">{TEXT_TYPE}</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {subCategoryFilter.map((item, index) => (
                <p key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={item.value}
                    onChange={toggleSubCategory}
                  />
                  {item.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"COLLECTION"} />

            {/* Product sort */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2 cursor-pointer"
            >
              <option value="relavent" className="cursor-pointer">
                {TEXT_SORT_RELAVENT}
              </option>
              <option value="low-high" className="cursor-pointer">
                {TEXT_SORT_LOW}
              </option>
              <option value="high-low" className="cursor-pointer">
                {TEXT_SORT_HIGH}
              </option>
            </select>
          </div>

          {/* Map products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
            {allProducts.map((item, index) => (
              <div key={index}>
                <ProductItem
                  id={item._id}
                  images={item.images}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




// "use client";
// import { ShopContext } from "@/context/ShopContext";
// import React, { useContext, useEffect, useState } from "react";
// import { categoryFilter, subCategoryFilter } from "@/content/Collection";
// import Image from "next/image";
// import { assets } from "../../../public/assets/assets";
// import Title from "@/components/common/Title";
// import ProductItem from "@/components/common/ProductItem";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   TEXT_CATEGORIES,
//   TEXT_FILTER,
//   TEXT_SORT_HIGH,
//   TEXT_SORT_LOW,
//   TEXT_SORT_RELAVENT,
//   TEXT_TYPE,
// } from "../../../text";

// export default function Page() {
//   const { search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relavent");

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const params = new URLSearchParams();
//       if (category.length > 0) {
//         params.set("category", category.join(","));
//       }
//       if (subCategory.length > 0) {
//         params.set("subCategory", subCategory.join(","));
//       }
//       if (showSearch && search) {
//         params.set("search", search);
//       }
//       if (sortType !== "relavent") {
//         params.set("sort", sortType);
//       }

//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/product/list?${params.toString()}`
//       );

//       if (response.data.success) {
//         setAllProducts(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [category, subCategory, search, showSearch, sortType]);

//   return (
//     <div className="section-width">
//       <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
//         {/* Filter Option */}
//         <div className="min-w-50">
//           <p
//             onClick={() => setShowFilter(!showFilter)}
//             className="my-2 text-xl flex items-center cursor-pointer gap-2"
//           >
//             {TEXT_FILTER}
//             <Image
//               src={assets.dropdown_icon}
//               className={`h-3 w-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//               alt="Dropdown"
//             />
//           </p>
//           {/* Category Filter */}
//           <div
//             className={`border border-gray-300 pl-5 py-3 mt-6 ${
//               showFilter ? "" : "hidden"
//             } sm:block`}
//           >
//             <p className="mb-3 text-sm font-medium">{TEXT_CATEGORIES}</p>
//             <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//               {categoryFilter.map((item, index) => (
//                 <p key={index} className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     className="w-3 cursor-pointer"
//                     value={item.value}
//                     onChange={toggleCategory}
//                   />
//                   {item.title}
//                 </p>
//               ))}
//             </div>
//           </div>
//           {/* SubCategory Filter */}
//           <div
//             className={`border border-gray-300 pl-5 py-3 my-5  ${
//               showFilter ? "" : "hidden"
//             } sm:block`}
//           >
//             <p className="mb-3 text-sm font-medium">{TEXT_TYPE}</p>
//             <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//               {subCategoryFilter.map((item, index) => (
//                 <p key={index} className="flex gap-2">
//                   <input
//                     type="checkbox"
//                     className="w-3 cursor-pointer"
//                     value={item.value}
//                     onChange={toggleSubCategory}
//                   />
//                   {item.title}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="flex-1">
//           <div className="flex justify-between text-base sm:text-2xl mb-4">
//             <Title text1={"ALL"} text2={"COLLECTION"} />

//             {/* Product sort */}
//             <select
//               onChange={(e) => setSortType(e.target.value)}
//               className="border-2 border-gray-300 text-sm px-2 cursor-pointer"
//             >
//               <option value="relavent" className="cursor-pointer">
//                 {TEXT_SORT_RELAVENT}
//               </option>
//               <option value="low-high" className="cursor-pointer">
//                 {TEXT_SORT_LOW}
//               </option>
//               <option value="high-low" className="cursor-pointer">
//                 {TEXT_SORT_HIGH}
//               </option>
//             </select>
//           </div>

//           {/* Map products */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
//             {allProducts.map((item, index) => (
//               <div key={index}>
//                 <ProductItem
//                   id={item._id}
//                   images={item.images}
//                   name={item.name}
//                   price={item.price}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }