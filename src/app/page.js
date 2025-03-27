// "use client"
// import MainChat from "@/components/chat/MainChat";
// import SideBar from "@/components/chat/Sidebar";
// import { useState } from "react";

// export default function Home() {
//   const [freqPrompt, setFreqPrompt] = useState("")
//   return (
//     <div className="flex h-screen">
//       <SideBar handleFrqClick={(value) => setFreqPrompt(value)}/>
//       <MainChat freqPrompt={freqPrompt}/>
//     </div>
//   );
// }

import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Architecture from "@/components/Architecture";
import Product from "@/components/Product";
import Enterprises from "@/components/Enterprises";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Main() {
  return (
    <>
      <Navbar />
      <Home />
      <Architecture />
      <Product />
      <Enterprises />
      <FAQ />
      <Footer />
    </>
  );
}