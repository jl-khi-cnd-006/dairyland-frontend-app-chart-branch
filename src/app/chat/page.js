"use client";
import MainChat from "@/components/chat/MainChat";
import SideBar from "@/components/chat/Sidebar";
import React, { useCallback, useState } from "react";

const Chat = () => {
  const [freqPrompt, setFreqPrompt] = useState("");
  const handleFreqPrompt = useCallback((value) => {
    setFreqPrompt(null);
    setTimeout(() => setFreqPrompt(value), 0);
  }, []);
  return (
    <div className="flex h-screen">
      <SideBar handleFrqClick={(value) => handleFreqPrompt(value)} />
      <MainChat freqPrompt={freqPrompt} />
    </div>
  );
};

export default Chat;
