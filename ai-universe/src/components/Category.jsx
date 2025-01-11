import Image from 'next/image'
import React from 'react'

export default function Category() {
    return (
        <div className='category-main dja'>
            <div className='category'>
                <div className='dja'>
                    <div>
                        <div className='heading-btn dja'>
                            <button disabled>Category</button>
                        </div>
                        <div className='contactus-heading category-top-heading mt-6 text-center w-100'>
                            <h1>Discover Our Full Suite of Aidy</h1>
                            <p className='mt-4'>The next-level chatbot assistant you need</p>
                        </div>
                    </div>
                </div>
                <div className='dja mt-[56px]'>
                    <div className='dja gap-[30px]'>
                        <div className='flex flex-col gap-[50px]'>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category1.svg" className='category-image' height={50} width={50} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Prompt Collection</h1>
                                    <p>Spark creativity with a vast collection of prompts designed to ignite your imagination.</p>
                                </div>
                            </div>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category2.svg" className='category-image' height={40} width={40} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Instant response</h1>
                                    <p>Get real-time suggestions to keep the conversation going smoothly.</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[50px]'>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category3.svg" className='category-image' height={50} width={50} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Flexible Outputs</h1>
                                    <p>Customize outputs by adjusting parameters, providing feedback, and refining the content.</p>
                                </div>
                            </div>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category4.svg" className='category-image' height={50} width={50} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Browser Extension</h1>
                                    <p>Manage conversations, summarize web pages, and engage with pdfs effortlessly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dja mt-[50px]'>

                    <button className='signin-btn dja gap-2'>Get Started<Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
                </div>

            </div>
        </div>
    )
}
