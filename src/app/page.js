import BestSeller from "@/components/home/BestSeller";
import Hero from "@/components/home/Hero";
import LatestCollection from "@/components/home/LatestCollection";
import NewsLetterBox from "@/components/home/NewsLetterBox";
import OurPolicy from "@/components/home/OurPolicy";

export default function Home() {
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
