"use client"
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function Hero() {
  const router = useRouter();
  return (
    <>
      <div className='hero-main dja min-h-screen'>
        <div className='shadow shadow-left hidden md:block'>

        </div>
        <div className='hero'>
          <div className='hero-heading'>
            <h1>The Future of <br />The Next-Gen AI</h1>
            <p>Meet AI Universe, the next-generation platform for registering and managing AI-powered devices. Secure Blockchain-Based Registration Ensuring data integrity and tamper-proof records. </p>
          </div>
          <div className='gap-2 w-100 dja mt-[56px]'>
            <button className='signin-btn dja gap-2' onClick={() => { router.push('/register-ai') }}>Register Ai<Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
            <button className='signup-btn dja gap-2' onClick={() => { router.push('/registered-device-details') }}>See All Devices</button>
          </div>
        </div>

        <div className='shadow shadow-right hidden md:block'>

        </div>
      </div>
    </>
  )
}
