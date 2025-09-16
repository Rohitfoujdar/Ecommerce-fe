'use client'
import BestSeller from "@/components/home/BestSeller";
import Hero from "@/components/home/Hero";
import LatestCollection from "@/components/home/LatestCollection";
import NewsLetterBox from "@/components/home/NewsLetterBox";
import OurPolicy from "@/components/home/OurPolicy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token , setToken] = useState()
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
      </div>
    </>
  );
}
