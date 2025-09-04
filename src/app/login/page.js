"use client";
import React, { useState } from "react";
import { inputData } from "@/content/auth";
import { TEXT_CREATE, TEXT_FORGET_PASSWORD, TEXT_LOG } from "../../../text";

export default function page() {
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (event) => {
    event.preventDefaul();
  };

  return (
    <div className="section-width">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5] w-8 bg-gray-800" />
        </div>
        {inputData.map((item, index) => {
          if (currentState === "Login" && item.type === "text") {
            return null;
          }
          return (
            <input
              key={index}
              type={item.type}
              className="w-full px-3 py-2 border border-gray-800"
              placeholder={item.placeholder}
              required
            />
          );
        })}
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">{TEXT_FORGET_PASSWORD}</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              {TEXT_CREATE}
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              {TEXT_LOG}
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
          {currentState === "Login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
