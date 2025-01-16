"use client"
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'

export default function Hero() {
  const router = useRouter();
  return (
    <>
      <div className='hero-main dja'>
        <div className='shadow shadow-left'>

        </div>
        <div className='hero'>
          <div className='hero-heading'>
            <h1>The Future of <br />The Next-Gen Chatbot</h1>
            <p>Meet Aidy, the next-gen AI chatbot designed to enhance conversations with intuitive responses, seamless integration, and powerful automation.</p>
          </div>
          <div className='gap-2 w-100 dja mt-[56px]'>
            <button className='signin-btn dja gap-2' onClick={() => { router.push('/register-ai') }}>Register Ai<Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
            <button className='signup-btn dja gap-2' onClick={() => { router.push('/registered-device-details') }}>See All Devices</button>
          </div>
        </div>
        <div className='shadow shadow-right'>

        </div>
      </div>
    </>
  )
}
