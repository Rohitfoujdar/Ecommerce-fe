"use client";
import React, { useState } from "react";
import { inputData } from "@/content/auth";
import { TEXT_CREATE, TEXT_FORGET_PASSWORD, TEXT_LOG } from "../../../text";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Page() {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url =
        currentState === "Login"
          ? `${process.env.NEXT_PUBLIC_API_URL}/user/login`
          : `${process.env.NEXT_PUBLIC_API_URL}/user/register`;

      const payload =
        currentState === "Login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const res = await axios.post(url, payload);

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("userToken", res.data.user.token);
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
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
          if (currentState === "Login" && item.name === "name") return null;
          return (
            <input
              key={index}
              type={item.type}
              name={item.name}
              value={formData[item.name]}
              onChange={handleChange}
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
