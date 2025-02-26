import Image from 'next/image'
import React from 'react'
import HomeVideo from '@/../../public/assets/images/home.gif'
import Laptop from '@/../../public/assets/images/laptop.svg'
import Home1 from '@/../../public/assets/images/home-img1.png'
import Home2 from '@/../../public/assets/images/home-img2.png'
import Border from '@/../../public/assets/images/heading-border.png'

function Home() {
    return (
        <section id='home-section' className="bg-[url('/assets/images/home-bg.png')] bg-no-repeat bg-left bg-cover h-auto w-full">
            <Image src={HomeVideo} alt='home' height={500} width={500} className='h-[95vh] md:h-[155vh] w-[60%] opacity-[5%] mx-auto' />
            <div className='flex flex-col items-center gap-[20px] z-40 absolute top-[200px] left-[50%] transform translate-x-[-50%] w-full'>
                <div className='relative mb-3'>
                    <Image src={Border} alt='border' width={250} height={250} className='absolute top-[-18%] w-[25%] right-[21%] md:right-[20%] -z-10'/>
                    <h1 className='text-[20px] sm:text-[18px] md:text-[40px] font-futura font-[700] text-white'> Introducing Generative <span className='mx-[10px] text-indigo-200'>AI Based</span> Solution</h1></div>
                <p className='text-gray-200 text-[14px] sm:text-[12px] md:text-[20px] lg:text-[25px]'>A ground breaking approach to information retrieval</p>
                <small className='text-indigo-200 text-[12px] sm:text-[12px] md:text-[15px] lg:text-[20px] font-[600]'>Components of our Solution GPT-4 & Vector Database</small>
                <Image src={Laptop} alt='laptop' height={1000} width={1000} className='w-[80%] md:w-[60%] lg:w-[70%] h-auto mt-[10%]' />
            </div>
            <Image src={Home1} alt='home1' height={150} width={150} className='absolute top-[42%]  md:top-[35%] w-[10%] left-[5%]' />
            <Image src={Home2} alt='home2' height={150} width={150} className='absolute top-[55%]  md:top-[100%] w-[10%] right-[5%]' />
        </section>
    )
}

export default Home