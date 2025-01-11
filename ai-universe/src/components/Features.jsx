import Image from 'next/image'
import React from 'react'

export default function Features() {
    return (
        <div className='features-main dja'>
            <div className='flex items-center justify-between feature w-100'>
                <div >
                    <div className='heading-btn'>
                        <button disabled>Feature</button>
                    </div>
                    <div className='contactus-heading mt-6'>
                        <h1>Clean and Efficient<br /> Code Generation</h1>
                        <p className='mt-4'>Boost your development speed with Aidy's clean and efficient code generation.</p>
                    </div>
                    <div className='mt-[48px]'>
                        <div className='flex  mt-[24px] gap-[12px]'>
                            <Image src="/images/true.svg" height={24} width={24} alt='right-arrow' />
                            <p>Multi-Language Support</p>
                        </div>
                        <div className='flex  mt-[16px] gap-[12px]'>
                            <Image src="/images/true.svg" height={24} width={24} alt='right-arrow' />
                            <p>Code Optimization and Refactoring</p>
                        </div>
                        <div className='flex  mt-[16px] gap-[12px]'>
                            <Image src="/images/true.svg" height={24} width={24} alt='right-arrow' />
                            <p>Code Testing and Validation</p>
                        </div>
                    </div>
                </div>
                <div className='feature-image-container'>
                    <Image src='/images/feature.png' height={400} width={500} alt='robot' />
                </div>


            </div>

           
        </div>
    )
}
