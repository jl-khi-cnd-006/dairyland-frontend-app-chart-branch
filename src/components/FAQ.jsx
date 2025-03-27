"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import Tick from '@/../public/assets/images/tick.svg'


const mockFAQ = [
    {
        id: 1,
        question: "How do I start a chat with the chatbot?",
        answer: "To start a chat with the chatbot, you first need to upload a document. Depending on the mode you choose, you can upload a CSV file for ChatCsv mode or a PDF file for ChatGene mode. Once the document is uploaded, you can begin interacting with the chatbot, and it will respond based on the content of the uploaded document."
    }
    ,{
        id: 2,
        question: "What file formats are supported for uploading?",
        answer: "The chatbot supports two file formats: CSV files: For ChatCsv mode, where the bot will generate responses in formats like text, tables, and graphs. PDF files: For ChatGene mode, where the bot will generate text-based responses."
    },
    {
        id: 3,
        question: "Can I upload multiple documents at once?",
        answer: "Currently, the chatbot only supports one document upload at a time. For ChatCsv mode, you can upload one CSV file, and for ChatGene mode, one PDF file. Once the chatbot has processed the document, you can upload another document if needed."
    },
    {
        id: 4,
        question: "What kind of questions can I ask in ChatGene mode?",
        answer: "In ChatGene mode, after uploading a PDF document, you can ask the chatbot questions related to the content of the document. The bot can summarize sections, explain concepts, or provide detailed responses based on the information contained in the PDF."
    },
]
const FAQ = () => {
    const [isOpen, setIsOpen] = useState(1);

    const toggleDropdown = (id) => {
        if(id === isOpen) {
            setIsOpen(0);
        }
        else{
            setIsOpen(id);
        }
    };
  return (
    <section id='faq-section' className="bg-gray-600 flex flex-col w-full">
        <div className="min-h-[80vh] w-[90%] md:w-[80%] mx-auto py-[10%] flex flex-col justify-between gap-[30px] bg-no-repeat bg-cover">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-[28px] md:text-[35px] text-center font-futura font-[700] text-white">
                    Have inquiries? In our FAQ, <span className="mx-[10px] text-indigo-200">you&apos;ll find all the solutions you need.</span>
                </h1> 
                <div className="w-full mx-auto text-white flex flex-col">
                    {mockFAQ?.map(item => (
                        <div 
                            className={`cursor-pointer ${isOpen === item.id ? "text-indigo-200" : "text-white"}`} 
                            key={item.id} 
                            onClick={() => toggleDropdown(item.id)}
                        >
                            <div className="bg-black-200 p-4 rounded-bl-xl rounded-tr-xl mt-[20px] flex items-center justify-between">
                                <p className={`w-[98%] border-r-2 ${isOpen === item.id ? "border-indigo-200" : "border-gray-800"} text-[14px] md:text-[18px]`}>
                                    {item.question}
                                </p>
                                {isOpen === item.id ? <FaAngleUp className='ms-3'/> : <FaAngleDown className='ms-3'/>}
                            </div>
                            {isOpen === item.id && (
                                <div className="p-5 bg-[#0B1625] rounded-tl-xl rounded-br-xl border border-[#151E2C]">
                                    <p className='text-[14px] md:text-[18px] text-gray-200'>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="min-h-[80vh] w-[83%] mx-auto py-[10%] flex flex-col items-center gap-[30px] bg-no-repeat bg-cover relative">
            <div className="w-full flex flex-col items-center">
                <Image src="/assets/images/banner-hand-2.png" alt='banner' width={500} height={500} className='absolute z-10 right-[-10%] md:right-[2.5%] top-[4.05%] md:top-[17.5%] w-[20%] md:w-[15%]' />
                <div className="relative border min-h-[43vh] h-auto max-w-[95%] md:max-w-[76%] rounded-xl bg-black-200 opacity-[100%]">
                    <Image src="/assets/images/banner.png" alt='banner' width={500} height={500} className='absolute z-40 w-full h-full' />
                    <div className="w-full text-white py-7 flex flex-col items-center">
                        <div className="relative w-[90%] flex flex-col items-center">
                            <h1 className='text-center font-[700] text-[25px] md:text-[45px]'>Ready to move <span className="mx-[10px] text-indigo-200">Ahead?</span></h1>
                            <Image src="/assets/images/banner-arrow.png" alt='banner-arrow' width={500} height={500} className='w-[10%] h-[10%] m-4' />
                            <p className="text-[14px] md:text-[18px] text-center">
                                With the help of our ground-breaking AI tool, unlock the potential of cutting-edge AI technology and increase your productivity to new heights. Embrace the future today and let our AI tool redefine what&apos;s possible for you.
                            </p>
                            <ul className='flex flex-col md:flex-row md:items-center mt-[5%] mb-2 gap-2 text-[14px] md:text-[18px]'>
                                <li className='flex gap-2'><Image src={Tick} alt='tick' width={500} height={500} className='w-[8%] md:w-[10%] h-auto'/>Free images for lifetime</li>
                                <li className='flex gap-2'><Image src={Tick} alt='tick' width={500} height={500} className='w-[8%] md:w-[10%] h-auto'/>Get details on any topic</li>
                                <li className='flex gap-2'><Image src={Tick} alt='tick' width={500} height={500} className='w-[8%] md:w-[10%] h-auto'/>Quick advisor to help you</li>
                                <li className='flex gap-2'><Image src={Tick} alt='tick' width={500} height={500} className='w-[8%] md:w-[10%] h-auto'/>15+ categories to explore</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Image src="/assets/images/banner-hand-1.png" alt='banner-band' width={500} height={500} className='absolute left-[-10.3%] md:left-[2.4%] bottom-[29.2%] md:bottom-[17.5%] w-[20%] md:w-[15%] z-20' />
            </div>
        </div>
    </section>

  )
}

export default FAQ