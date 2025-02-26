'use client';

import React, { useCallback } from 'react'
// import Archi from '@/../../public/images/architecture.png'
import Chatgene from '@/../../public/assets/images/Chatgene.png'
import Chatcsv from '@/../../public/assets/images/Chatcsv.png'
import ArchiLine from '@/../../public/assets/images/archi-line.png'
import Tick from '@/../../public/assets/images/tick.svg'
import Image from 'next/image'
import PrimaryButton from './PrimaryButton'
import { useRouter } from 'next/navigation'

function Product() {
    const router = useRouter();

    const handleBtnClick = useCallback((chatType) => { 
        sessionStorage.setItem("chat_type", chatType)       
        router.push(`/chat`);
    }, [router]);

    return (
        <section className='bg-[#0A151F] flex flex-col gap-[150px]'>
        {/* ChatGene Section */}
        <div id='chatgene-section' className='bg-[#1C2634] h-auto lg:h-[100vh] w-full px-[20px] md:px-[60px] lg:px-[120px] py-[40px] md:py-[60px] lg:py-[80px] flex flex-col lg:flex-row items-center gap-[30px] bg-no-repeat bg-cover'>
            <div className='text-white w-full lg:w-[90%]'>
                <div>
                    <h1 className='text-[25px] md:text-[35px] lg:text-[45px] font-futura font-bold'><span className='text-indigo-200'>ChatGene</span></h1>
                    <Image src={ArchiLine} alt='ArchLine' />
                </div>
                <div className='w-full lg:w-[100%] block lg:hidden my-7'>
                    <Image src={Chatgene} alt='chatgene' width={1000} height={1000} className='w-full h-auto' />
                </div>
                <div className='mt-[20px] md:mt-[30px]'>
                    <p className='text-[15px] md:text-[18px] text-gray-200'>Introducing our revolutionary Generative AI, Retrieval Augmented Generation, powered by GPT-4 and a Vector Database. Offers clarity in scattered information, saving time and frustration.</p>
                    <p className='mt-[10px] md:mt-[15px] text-[15px] md:text-[18px] text-gray-200'>Gain a competitive edge in information management with this innovative technology, embracing the future of streamlined efficiency.</p>
                    <ul className='mt-[20px] md:mt-[25px] flex flex-col gap-[15px] md:gap-[20px] text-[15px] md:text-[18px]'>
                        <li className='flex gap-5'><Image src={Tick} alt='tick'/>Revolutionary Generative AI with GPT-4 and Vector Database.</li>
                        <li className='flex gap-5'><Image src={Tick} alt='tick' /> Efficiently retrieves and synthesizes data. </li>
                        <li className='flex gap-5'><Image src={Tick} alt='tick' />Provides a significant advantage in information management.</li>
                    </ul>
                    <PrimaryButton text="Try Now" classes="w-[160px] md:w-[180px] h-[40px] md:h-[50px] mt-[30px] md:mt-[50px]" handleBtnClick={handleBtnClick} chatType={"chatgene"} />
                </div>
            </div>
            <div className='w-full lg:w-[100%] hidden lg:block'>
                <Image src={Chatgene} alt='chatgene' width={1000} height={1000} className='w-full h-auto' />
            </div>
        </div>
    
        {/* ChatCsv Section */}
        <div id='chatcsv-section' className='bg-[#1C2634] h-auto lg:h-[100vh] w-full px-[20px] md:px-[60px] lg:px-[120px] py-[40px] md:py-[60px] lg:py-[80px] flex flex-col lg:flex-row items-center gap-[30px] bg-no-repeat bg-cover'>
            <div className='w-full lg:w-[90%] hidden lg:block'>
                <Image src={Chatcsv} alt='chatcsv' width={1000} height={1000} className='w-full h-auto' />
            </div>
            <div className='text-white w-full lg:w-[90%]'>
                <div>
                    <h1 className='text-[25px] md:text-[35px] lg:text-[45px] font-futura font-bold'><span className='text-indigo-200'>ChatCsv</span></h1>
                    <Image src={ArchiLine} alt='ArchLine'/>
                </div>
                <div className='w-full lg:w-[90%] block lg:hidden my-7'>
                    <Image src={Chatcsv} alt='chatcsv' width={1000} height={1000} className='w-full h-auto' />
                </div>
                <div className='mt-[20px] md:mt-[30px]'>
                    <p className='text-[15px] md:text-[18px] text-gray-200'>Our product simplifies complex data analysis by generating graphs, tables, and text insights from CSV data with ease.</p>
                    <p className='mt-[10px] md:mt-[15px] text-[15px] md:text-[18px] text-gray-200'>  It offers a user-friendly approach that eliminates data complexities, making data analysis accessible to everyone.</p>
                    <ul className='mt-[20px] md:mt-[25px] flex flex-col gap-[15px] md:gap-[20px] text-[15px] md:text-[18px]'>
                        <li className='flex gap-5'> <Image src={Tick} alt='tick'/> Generates graphs, tables, and text insights from CSV data.</li>
                        <li className='flex gap-5'> <Image src={Tick} alt='tick'/> Provides a streamlined, accessible approach to data analysis. </li>
                        <li className='flex gap-5'> <Image src={Tick} alt='tick'/> Makes data insights easily understandable and actionable. </li>
                    </ul>
                    <PrimaryButton text="Try Now" classes="w-[160px] md:w-[180px] h-[40px] md:h-[50px] mt-[30px] md:mt-[50px]" handleBtnClick={handleBtnClick} chatType={"chatcsv"} />
                </div>
            </div>
        </div>
    </section>
    
    )
}

export default Product