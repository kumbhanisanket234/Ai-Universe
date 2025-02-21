"use client"
import { clearCookie, getCookie, setCookie } from '@/utils/cookies'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Navbar() {
  let getToken = getCookie("token");
  const router=useRouter()
  const [token,setToken]=useState()
  
  useEffect(()=>{
    setToken(getToken)
  },[token])

  const handleLogout=()=>{
    clearCookie()
    setToken("")
    toast.success("Successfully Logout")
  }
  
  return (
    <div className='navbar-main dja'>
      <div className='navbar p-4'>
        <div className='dja'>
          <Image src='/images/logo.svg' height={46} width={135} alt='logo' />
        </div>
        <div className='dja'>
          <div className='dja nav-link-container gap-7'>
            <Link href='/'>Home</Link>
            <Link href='/premium'>Premium</Link>
            <Link href='#'>About</Link>
            <Link href='/profile'>Profile</Link>
            <Link href='/contact-us'>Contact Us</Link>
          </div>
        </div>
        <div className='flex gap-2'>
          {
            !token ?
              <>
                <button className='signup-btn dja gap-2' onClick={()=>{router.push("/sign-up")}}>Register</button>
                <button className='signin-btn dja gap-2' onClick={()=>{router.push("/sign-in")}}>Login<Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
              </>
              : <button className='signup-btn dja gap-2' onClick={handleLogout}>Logout</button>

          }
        </div>
      </div>
    </div>
  )
}
