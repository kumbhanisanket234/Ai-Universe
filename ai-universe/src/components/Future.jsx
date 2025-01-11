import Image from 'next/image'
import React from 'react'

export default function Future() {
    return (
        <div className='future-main dja'>
            <div className='future-polygon'>
                <Image src='/images/future-polygon.svg' height={153} width={174} alt='polygon' />
            </div>
            <div className='future-shadow shadow-left'>
            </div>
            <div className='future'>
                <h1>Experience the Future of AI With Us</h1>
                <p className='mt-[24px]'>Join millions and upgrade to Ai-Universe today to feel the difference!</p>
                <div>
                    <div className='gap-2 w-100 dja mt-[56px]'>
                        <button className='signin-btn dja gap-2'>Register Ai<Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
                        <button className='signup-btn dja gap-2'>See All Devices</button>
                    </div>
                </div>
            </div>
            <div className='future-shadow shadow-right'>
            </div>
            <div className='future-round'>
                <Image src='/images/future-round.svg' height={239} width={231} alt='round' />
            </div>
            <div className='future-round-2'>
                <Image src='/images/future-round-2.svg' height={239} width={231} alt='round' />
            </div>
        </div>
    )
}
