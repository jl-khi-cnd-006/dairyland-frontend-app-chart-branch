"use client";

import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { usePathname } from "next/navigation";

export default function ClientRootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const pathname = usePathname()

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

  // Route Change Handling
  useEffect(() => {
    setIsRouteChanging(true);
    const timer = setTimeout(() => setIsRouteChanging(false), 500); // Simulate a short delay
    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading || isRouteChanging) {
    return (
      <div className="w-full min-h-[100vh] bg-gray-600 text-white flex justify-center items-center">
        <HashLoader  
          color={"#03A1D8"}
          size={isRouteChanging ? 60 : 80}
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
