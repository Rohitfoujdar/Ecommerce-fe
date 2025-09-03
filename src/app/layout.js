import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import favicon from "../../public/favicon.svg";
import Navbar from "@/components/common/Navbar";
import ShopContextProvider from "@/context/ShopContext";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/common/SearchBar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";   

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FOREVER",
  description: "The best place to buy and sell products online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShopContextProvider>
          <Navbar />
          <SearchBar />
          {children}
          <Footer />
          <ToastContainer 
            theme="dark"
          />
        </ShopContextProvider>
      </body>
    </html>
  );
}
