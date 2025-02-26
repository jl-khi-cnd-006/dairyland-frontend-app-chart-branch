"use client";

import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ClientRootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setIsLoading(false); 
    };

    window.addEventListener("load", handlePageLoad);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => {
      window.removeEventListener("load", handlePageLoad);
      clearTimeout(timer); 
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-[100vh] bg-gray-600 text-white flex justify-center items-center">
        <HashLoader  
          color={"#03A1D8"}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={
        <div className="w-full min-h-[100vh] bg-gray-600 text-white flex justify-center items-center">
           <HashLoader  
            color={"#03A1D8"}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"/>
          </div>}>
        {children}
      </Suspense>
      <ToastContainer />
    </>
  );
}
