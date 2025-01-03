"use client"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Hero () {
  return (
    <div className='hero-main flex justify-center'>
      <div className='flex mt-[70px] hero'>
        <div className='flex flex-col justify-around max-h-[574px]'>
          <div className='hero-heading w-[520px]'>
            <button disabled className='text-[#B5B0B7]'>
              Lightning-fast, free-cost, easy.
            </button>
            <h1>
              Your AI <br /> Register Now
            </h1>
          </div>
          <div className='flex flex-col gap-[40px]'>
            <p className='text-[#B5B0B7]'>
              Register your AI for free and follow a few steps.
            </p>
            <div className='flex items-center gap-[17px]'>
              <div className='flex'>
                <button className='hero-register-btn flex items-center gap-[10px] text-white' onClick={()=>{redirect('/sign-up')}}>
                  Register Now
                  <Image
                    src='/images/right-arrow.svg'
                    height={7}
                    width={7}
                    alt='right-arrow'
                    className='register-arrow'
                  />
                </button>
              </div>
              <div className='flex'>
                <button className='guid-btn font-semibold flex items-center gap-[10px]'>
                  Guid
                  <Image
                    src='/images/right-arrow.svg'
                    height={7}
                    width={7}
                    alt='right-arrow'
                    className='guid-arrow'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='max-h-[574px] flex items-center'>
          <Image
            className='hero-image'
            src='/images/hero.svg'
            height={574}
            width={838}
            alt='robot'
          />
        </div>
      </div>
    </div>
  )
}
