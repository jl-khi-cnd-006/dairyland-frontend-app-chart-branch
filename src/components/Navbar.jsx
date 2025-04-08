'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Logo from '@/../../public/assets/images/xloop-logo.svg'
// import PrimaryButton from './PrimaryButton'
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const productRef = useRef(null);

  const handleClickOutside = (event) => {
    if (productRef.current && !productRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productRef]);

  useEffect(() => {
    const sections = [
      { id: 'home-section', index: 1 },
      { id: 'architecture-section', index: 2 },
      { id: 'chatgene-section', index: 3 },
      { id: 'chatcsv-section', index: 3 },
      { id: 'enterprise-section', index: 4 },
      { id: 'faq-section', index: 5 }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((sec) => sec.id === entry.target.id);
            if (section) setActiveItem(section.index);
          }
        });
      },
      { threshold: 0.5 } 
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToTop = (elementId) => {
    setIsMenuOpen(false)
    setDropdownOpen(false)
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden'); // Clean up on unmount
    };
  }, [isMenuOpen]);

  return (
    <header className='nav-scroll fixed bg-transparent py-4 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between w-full items-center z-50'>
      <div className='flex items-center w-full justify-between'>
        <Image src={Logo} width={120} height={120} alt="Logo" />
        <button
          className='md:hidden text-white text-2xl'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <nav className={`fixed top-0 right-0 w-full md:bg-transparent md:flex md:relative md:top-auto md:right-auto md:w-auto transition-transform transform ${isMenuOpen ? 'translate-x-0 h-screen' : 'translate-x-full'} md:translate-x-0`}>
          <div className='md:hidden flex justify-end p-4'>
            <button
              className='text-white text-2xl'
              onClick={() => setIsMenuOpen(false)}
            >
            <IoCloseSharp />
            </button>
          </div>
          <ul className='flex flex-col md:flex-row text-white gap-7 md:gap-12 text-lg cursor-pointer p-4 md:p-0'>
            <li onClick={() => {scrollToTop("home-section"); setActiveItem(1)}} className={`${activeItem === 1 ? "relative font-[700] text-indigo-200 before:content-['•'] before:absolute before:-left-3 before:text-indigo-200" : ""}`}>Home</li>
            <li onClick={() => {scrollToTop("architecture-section"); setActiveItem(2)}} className={`${activeItem === 2 ? "relative font-[700] text-indigo-200 md:before:content-['•'] before:absolute before:-left-3 before:text-indigo-200" : ""}`}>How It Works</li>
            <li onClick={() => {setActiveItem(3); setDropdownOpen(pre => !pre) }} className={`${activeItem === 3 ? "relative font-[700] text-indigo-200 md:before:content-['•'] before:absolute before:-left-3 before:text-indigo-200" : ""}`}>Products</li>
            {dropdownOpen && (
              <div ref={productRef} className="md:absolute z-50 top-[100%] left-[50%] bg-[#0a101a86] text-white rounded-lg shadow-lg shadow-slate-700 w-36 ">
                <ul className="py-2 text-sm">
                  <li onClick={() => {scrollToTop("chatgene-section"); setDropdownOpen(false)}} className="flex items-center px-4 py-2 hover:scale-110 hover:text-indigo-200 hover:font-[700] cursor-pointer">
                    <span >Chat Gene</span>
                  </li>
                  {/* <li className="flex items-center px-4 py-2 hover:scale-110 hover:text-indigo-200 hover:font-[700] cursor-pointer">
                    <span onClick={() => {scrollToTop("chatcsv-section"); setDropdownOpen(false)}}>Chat CSV</span>
                  </li> */}
                </ul>
              </div>
            )}
            <li onClick={() => {scrollToTop("enterprise-section"); setActiveItem(4)}} className={`${activeItem === 4 ? "relative font-[700] text-indigo-200 md:before:content-['•'] before:absolute before:-left-3 before:text-indigo-200" : ""}`}>Requirements</li>
            <li onClick={() => {scrollToTop("faq-section"); setActiveItem(5)}} className={`${activeItem === 5 ? "relative font-[700] text-indigo-200 md:before:content-['•'] before:absolute before:-left-3 before:text-indigo-200" : ""}`}>FAQ</li>
          </ul>
        </nav>
        <button onClick={() => {scrollToTop("footer-section");}} className="hidden md:block w-40 h-12 text-white bg-indigo-200 border border-indigo-500 rounded-[8px]" >Contact Us</button>
      </div>
    </header>
  );
}

export default Navbar