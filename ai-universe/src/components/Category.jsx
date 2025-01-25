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
                            <h1>Discover Our Full Suite of AI Universe</h1>
                            <p className='mt-4'>The next-level AI device management platform you need</p>
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
                                    <h1>Device Registry</h1>
                                    <p>Explore a comprehensive collection of features designed to simplify and secure your AI device management.</p>
                                </div>
                            </div>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category2.svg" className='category-image' height={40} width={40} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Device Details</h1>
                                    <p>View in-depth information and specifications for each AI device, ensuring complete transparency.</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[50px]'>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category3.svg" className='category-image' height={50} width={50} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>Device Overview</h1>
                                    <p>Get a comprehensive summary of all registered AI devices, including their specifications, history, and performance.</p>
                                </div>
                            </div>
                            <div className='dja gap-[50px]'>
                                <div className='category-image-container'>
                                    <Image src="/images/category4.svg" className='category-image' height={50} width={50} alt='prompt' />
                                </div>
                                <div className='category-heading'>
                                    <h1>User Access & Permissions</h1>
                                    <p>Manages different levels of access and user roles for AI device owners and administrators.</p>
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
