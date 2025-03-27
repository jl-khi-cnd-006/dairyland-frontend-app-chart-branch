import Image from 'next/image'
import React from 'react'
import Archi from '@/../../public/assets/images/ArchitectureDiagram-02.jpg'
import ArchiLine from '@/../public/assets/images/archi-line.png'
import Tick from '@/../public/assets/images/tick.svg'

function Architecture() {
    return (
        <section id='architecture-section' className="w-full bg-[url('/assets/images/archi-bg.png')] px-[8%] py-[10%] flex flex-col xl:flex-row items-center gap-[30px] bg-no-repeat bg-cover">
            <div className='w-full lg:w-[80%] hidden xl:block'>
                <Image src={Archi} alt='architecture' width={1000} height={1000} className='w-full h-auto' />
            </div>
            <div className='text-white w-full lg:w-auto'>
                <div>
                    <h1 className='text-[25px] sm:text-[20px] md:text-[45px] lg:text-[50px] font-futura font-bold'>High Level <span className='text-indigo-200'>Architecture</span></h1>
                    <Image src={ArchiLine} alt='ArchLine' />
                </div>
                <div className='w-full lg:w-[90%] block xl:hidden my-7 '>
                <Image src={Archi} alt='Architecture' width={1000} height={1000} className='w-full h-auto' />
            </div>
                <div className='mt-[30px]'>
                    <h5 className='text-[15px] md:text-[18px] font-bold text-gray-200'>Overview</h5>
                    <p className='mt-[15px] text-[15px] md:text-[18px] text-gray-200'>This architecture diagram illustrates a system designed for efficient and accurate handling of queries using private data.</p>
                    <ul className='mt-[25px] flex flex-col gap-[20px] text-[15px] md:text-[18px]'>
                        <li className='flex gap-5'> <Image src={Tick} alt='Tick' /> Private data is loaded and indexed into nodes for efficient querying.</li>
                        <li className='flex gap-5'> <Image src={Tick} alt='Tick' /> User questions are processed by a node processor. </li>
                        <li className='flex gap-5'> <Image src={Tick} alt='Tick' /> Queries are sent to a Cloud and it converts and stores data in a vector database. </li>
                        <li className='flex gap-5'> <Image src={Tick} alt='Tick' /> LLM retrieves information and generates a response and returns it to the user.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Architecture