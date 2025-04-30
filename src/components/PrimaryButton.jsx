"use client";

import React from 'react'

function PrimaryButton({text,classes, handleBtnClick, chatType}) {
  return (
    <button className={`text-white bg-indigo-200 border border-indigo-500 rounded-[8px] ${classes}`} onClick={() => handleBtnClick(chatType)}>
        {text}
    </button>
  )
}

export default PrimaryButton