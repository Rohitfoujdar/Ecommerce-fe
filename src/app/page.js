import Head from "next/head";
import Image from "next/image";
import favicon from "../../public/favicon.svg"

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center align-center h-[100vh] text-purple-400">
      <h1 className="text-5xl font-bold">Welcome to My Website</h1>
    </div>
    </>
  );
}
