"use client"
import MainChat from "@/components/chat/MainChat";
import SideBar from "@/components/chat/Sidebar";
import { useState } from "react";

export default function Home() {
  const [freqPrompt, setFreqPrompt] = useState("")
  return (
    <div className="flex h-screen">
      <SideBar handleFrqClick={(value) => setFreqPrompt(value)}/>
      <MainChat freqPrompt={freqPrompt}/>
    </div>
  );
}
