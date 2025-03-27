import Image from 'next/image'
import React from 'react'
import EnterpriseVideo from '@/../../public/assets/images/feature.gif'
import FeatureBg from '@/../../public/assets/images/feature-bg.png'

const Enterprises = () => {
    return (
        <section id='enterprise-section' className="relative bg-[url('/assets/images/home-bg.png')] bg-no-repeat bg-left bg-cover md:h-[100vh] w-full">
            {/* Video Background */}
            <div className='relative w-full'>
                <Image src={EnterpriseVideo} alt='EnterPrise' height={500} width={500} className='w-full md:h-[100vh] opacity-[8%] absolute inset-0 object-cover' />
            </div>
        
            {/* Content Section */}
            <div className='flex flex-col items-center gap-[20px] text-white z-40 relative w-full max-w-[100%] md:max-w-[100%]'>
                <h1 className='text-[24px] md:text-[40px] font-futura font-[700] text-white my-[6%]'>
                    Problem Faced <span className='mx-[10px] text-indigo-200'>By Enterprises</span>
                </h1>
                <div className="flex flex-col items-center justify-center md:flex-row gap-8 w-full max-w-[90%] md:max-w-[80%] md:gap-12 my-5 min-h-[45vh]">
                    {/* Card 1 */}
                    <div className="bg-gray-600 w-full md:w-[30%] h-[500px] rounded-lg p-6 md:p-10 flex flex-col">
                        <div className="flex flex-col justify-center items-center bg-black-400 h-[60px] w-[60px] p-3 rounded-lg">
                            <Image src={"/assets/images/data-icon.png"} alt='Data' height={500} width={500} className='m-w-[60%] m-h-[60%]' />
                        </div>
                        <div className="w-full mt-4 md:mt-7 flex-grow">
                            <div className="flex flex-row w-full items-center mb-4 md:mb-7">
                                <Image src="/assets/images/group-icon.png" alt='g' height={500} width={500} className='w-[5%]' />
                                <h3 className='ms-4 font-[600] text-[15px] md:text-[18px]'>Managing Diverse Data</h3>
                            </div>
                            <p className='text-[15px] md:text-[18px] text-gray-200'>
                                Tackles a variety of data formats effortlessly. Whether it&apos;s diverse data sources or contracts.
                            </p>
                            <p className='text-[15px] md:text-[18px] text-gray-200 mt-4'>
                                We simplify the complexities, becoming your go-to solution.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-indigo-200 w-full md:w-[30%] h-[500px] rounded-lg p-6 md:p-10 flex flex-col">
                        <div className="flex flex-col justify-center items-center bg-white h-[60px] w-[60px] p-3 rounded-lg">
                            <Image src={"/assets/images/framework-icon.png"} alt='framework' height={500} width={500} className='m-w-[60%] m-h-[60%]' />
                        </div>
                        <div className="w-full mt-4 md:mt-7 flex-grow">
                            <div className="flex flex-row w-full items-center mb-4 md:mb-7">
                                <Image src="/assets/images/group-white.png" alt='g' height={500} width={500} className='w-[5%]' />
                                <h3 className='ms-4 font-[600] text-[15px] md:text-[18px]'>Complex Information Maze</h3>
                            </div>
                            <p className='text-[15px] md:text-[18px] text-white'>
                                Information is scattered across documents, making it hard to find.
                            </p>
                            <p className='text-[15px] md:text-[18px] text-white mt-4'>
                                It&apos;s like trying to navigate a maze of data.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-600 w-full md:w-[30%] h-[500px] rounded-lg p-6 md:p-10 flex flex-col">
                        <div className="flex flex-col justify-center items-center bg-black-400 h-[60px] w-[60px] p-3 rounded-lg">
                            <Image src={"/assets/images/quick-icon.png"} alt='quick' height={500} width={500} className='m-w-[60%] m-h-[60%]' />
                        </div>
                        <div className="w-full mt-4 md:mt-7 flex-grow">
                            <div className="flex flex-row w-full items-center mb-4 md:mb-7">
                                <Image src="/assets/images/group-icon.png" alt='g' height={500} width={500} className='w-[5%]' />
                                <h3 className='ms-4 font-[600] text-[15px] md:text-[18px]'>Slow Response Time</h3>
                            </div>
                            <p className='text-[15px] md:text-[18px] text-gray-200'>
                                Providing answers to queries takes a significant amount of time.
                            </p>
                            <p className='text-[15px] md:text-[18px] text-gray-200 mt-4'>
                                This slow response time can lead to delays in serving clients and partners.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Image src={FeatureBg} alt='Feature' height={500} width={500} className='w-full absolute bottom-[5px] opacity-[15%]' />
        </section>
    );
}

export default Enterprises