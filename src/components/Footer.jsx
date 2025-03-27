"use client"
import React from 'react'
import Logo from '@/../../public/assets/images/xloop-logo.svg'
import Image from 'next/image';
// import PrimaryButton from './PrimaryButton';
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';


const Footer = () => {

    const scrollToTop = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      };

      return (
        <section id='footer-section' className='bg-gray-600 w-full h-auto flex flex-col items-center justify-between px-4 md:px-0 pt-5 md:pt-0 border-t border-gray-800 md:border-none'>
        <div className="flex flex-row justify-between flex-wrap gap-4 text-white w-full max-w-[80%]">
            <div className="flex flex-col justify-start gap-5 w-full md:w-[30%]">
                <div className="flex justify-center md:justify-start">
                    <Image src={Logo} alt='logo' width={150} height={150} className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110' onClick={() => scrollToTop("home-section")} />
                </div>
                <div className="hidden md:flex flex-col gap-5">
                    <p>Let&apos;s get in touch, shall we?</p>
                    <textarea name="" id="" rows={2} className="w-full p-3 border border-gray-800 bg-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder='Your Message'></textarea>
                    <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
                        <input type="email" className="w-full p-2 border border-gray-800 bg-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder='Email' />
                        <button type="submit" className="text-white bg-indigo-200 border border-indigo-500 rounded-[8px] w-full md:w-[120px] h-[40px]">Submit</button>
                    </div>
                </div>
            </div>
    
            {/* Explore Section */}
            <div className="flex flex-col justify-start gap-5 w-[50%] md:w-[15%] border-r border-gray-800 md:border-none">
                <h1 className='text-[20px] md:text-[25px] font-futura font-[700] text-white'>Explore</h1>
                <ul className='flex flex-col gap-5 mx-2'>
                    <li className="text-[14px] md:text-[18px] relative text-indigo-200 before:content-['•'] before:absolute before:-left-5 before:text-indigo-200 cursor-pointer">Home</li>
                    <li className='text-[14px] md:text-[18px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-indigo-200' onClick={() => scrollToTop("architecture-section")}>How It Works</li>
                    <li className='text-[14px] md:text-[18px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-indigo-200' onClick={() => scrollToTop("enterprise-section")}>Requirements</li>
                    <li className='text-[14px] md:text-[18px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-indigo-200' onClick={() => scrollToTop("faq-section")}>FAQ</li>
                </ul>
            </div>
    
            {/* Products Section */}
            <div className="flex flex-col justify-start gap-5 w-[30%] md:w-[15%]">
                <h1 className='text-[20px] md:text-[25px] font-futura font-[700] text-white'>Products</h1>
                <ul className='flex flex-col gap-5 mx-2'>
                    <li className='text-[14px] md:text-[18px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-indigo-200' onClick={() => scrollToTop("chatgene-section")}>ChatGene</li>
                    <li className='text-[14px] md:text-[18px] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-indigo-200' onClick={() => scrollToTop("chatcsv-section")}>ChatCsv</li>
                </ul>
            </div>
    
            {/* Contact Info Section */}
            <div className="flex flex-col justify-start items-center md:items-start gap-5 w-full md:w-[30%]">
                <h1 className='text-[20px] md:text-[25px] font-futura font-[700] text-white'>Contact Info</h1>
                <ul className='flex flex-col gap-5'>
                    <li className='flex flex-row'>
                        <div className="flex items-center justify-center bg-black-300 min-w-[50px] min-h-[50px] max-h-[50px] rounded-full mx-2">
                            <FaLocationDot />
                        </div>
                        <div className="flex flex-col text-[14px] md:text-[18px]">
                            <p className='font-[700] '>Address:</p>
                            <p>1825 South Grant Street San Mateo, CA, 94402, USA</p>
                        </div>
                    </li>
                    <li className='flex flex-row'>
                        <div className="flex items-center justify-center bg-black-300 min-w-[50px] min-h-[50px] max-h-[50px] rounded-full mx-2">
                            <MdEmail />
                        </div>
                        <div className="flex flex-col text-[14px] md:text-[18px]">
                            <p className='font-[700]'>Email:</p>
                            <p className='text-indigo-200'>sales@xloopdigital.com</p>
                        </div>
                    </li>
                    <li className='flex flex-row'>
                        <div className="flex items-center justify-center bg-black-300 min-w-[50px] min-h-[50px] max-h-[50px] rounded-full mx-2">
                            <FaPhoneAlt />
                        </div>
                        <div className="flex flex-col text-[14px] md:text-[18px]">
                            <p className='font-[700]'>Phone:</p>
                            <p>1-800-397-9124</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    
        <div className="flex border-t-2 border-gray-800 h-auto w-full max-w-[80%] mb-[1%] mt-[4%] text-white justify-center pt-3 md:pt-7">
            <p className='text-[12px] md:text-[18px] font-[500]'>&copy; {new Date().getFullYear()} Chatgene | All Rights Reserved.</p>
        </div>
    </section>
    
    );
}
export default Footer;


