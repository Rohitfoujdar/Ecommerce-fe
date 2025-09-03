'use client'
import React from "react";
import {
  TEXT_SPECIAL,
  TEXT_SUBSCRIBE,
  TEXT_SUBSCRIBE_NOW,
} from "../../../text";

export default function NewsLetterBox() {
  const onSubmithandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="section-width text-center py-20">
      <p className="text-2xl font-medium text-gary-800">{TEXT_SUBSCRIBE_NOW}</p>
      <p className="text-gray-400 mt-3">{TEXT_SPECIAL}</p>
      <form
        onSubmit={onSubmithandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border border-gray-300"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white px-10 py-4 text-xs cursor-pointer"
        >
          {TEXT_SUBSCRIBE}
        </button>
      </form>
    </div>
  );
}
