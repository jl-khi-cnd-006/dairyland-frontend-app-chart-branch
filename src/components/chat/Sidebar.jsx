"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

// const freqData = [
//   // {
//   //   id: 1,
//   //   prompt: "List the top 10 customers by total revenue for the current year.",
//   // },
//   // {
//   //   id: 2,
//   //   prompt:
//   //     "Show the top 5 product categories by profit margin for the past year.",
//   // },
//   // {
//   //   id: 3,
//   //   prompt: "Bar chart of the top 5 products by total units sold this year.",
//   // },
//   // {
//   //   id: 4,
//   //   prompt:
//   //     "Make a Pie chart showing the revenue share of the top 5 brands this year",
//   // },
//   // {
//   //   id: 5,
//   //   prompt: "Show bottom 5 product categories by total revenue this quarter.",
//   // },
//   // {
//   //   id: 6,
//   //   prompt:
//   //     "Show the top 5 warehouses ranked by sales volume for the july and aug month",
//   // },
//   // {
//   //   id: 7,
//   //   prompt:
//   //     "show top 10 products with the highest tax contributions this year.",
//   // },
// ];

const freqData = [
  {
    id: 1,
    prompt:
      "Show those customers where we are selling on higher prices (Top N), it will be SKU wise.",
  },
  {
    id: 2,
    prompt: "Make a Pie chart showing the revenue share of the top 5 brands.",
  },
  {
    id: 3,
    prompt: "What is the price of plane white milk 10000 after discount.",
  },
  {
    id: 4,
    prompt:
      "show top 10 products with the highest tax contributions.",
  },
  {
    id: 5,
    prompt: "Show the distribution of gsr and gsr with tax gulshan in pie chart.",
  },
  // {
  //   id: 6,
  //   prompt:
  //     "Bar chart displaying the months with the highest total sales volume of july and aug.",
  // },
  {
    id: 7,
    prompt:
      "Bar chart of total of the top 5 products by total units sold.",
  },
];

function SideBar({ handleFrqClick }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        // window.innerWidth <= 991 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    const handleResize = () => {
      setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);



    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, setSidebarOpen]);

  return (
    <div className="w-[8%] lg:min-w-[20%] lg:max-w-[20%] bg-gray-600 h-full">
      <div className="lg:hidden flex flex-col items-center p-4 bg-gray-600 h-full">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`fixed lg:relative top-0 left-0 h-full bg-gray-600 px-[5px] py-[5px] flex flex-col justify-start transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  z-50`}
      >

        <div className="px-[30px] md:px-[50px] flex items-center justify-center my-6">
          <Image
            src="/assets/images/logo.png"
            width={150}
            height={150}
            alt="logo"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          {/* <span className="font-extrabold text-[30px] text-indigo-200 italic tracking-wide">
            Dairy Land
          </span> */}
        </div>
        { sidebarOpen &&
          <div className="text-white p-2 absolute right-0 cursor-pointer" onClick={() => setSidebarOpen(false)}>
            <IoClose />
          </div>

        }
    
        <hr />
        <div className="text-white px-4 py-2 mt-5">
          <h3 className="text-xl font-bold mb-4 text-indigo-200 text-center">
            Frequently Asked Prompts
          </h3>
          <div className="space-y-2 overflow-y-auto max-h-[70vh] py-1">
            {freqData?.length === 0 ? (
              <div
                className={`bg-gray-700 p-2 rounded-md `}
              >
                No Record found
              </div>
            ) : (
              freqData?.map((item) => {
                return (
                  <div
                    className={`bg-gray-700 p-2 rounded-md cursor-pointer hover:text-blue-400 `}
                    key={item.id}
                    onClick={() => {
                      setSidebarOpen(false);
                      handleFrqClick(item.prompt);
                    }}
                  >
                    {item.prompt}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
