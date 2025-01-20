import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='navbar-main dja'>
      <div className='navbar'>
        <div className='dja'>
          <Image src='/images/logo.svg' height={46} width={135} alt='logo' />
        </div>
        <div className='dja'>
          <div className='dja nav-link-container gap-7'>
            <Link href='#'>Home</Link>
            <Link href='#' className='flex items-center gap-2'>
              Category{' '}
              <Image
                className='rotate-90'
                src='/images/right-arrow.svg'
                height={7}
                width={7}
                alt='right-arrow'
              />
            </Link>
            <Link href='#'>About</Link>
            <Link href='/profile'>Profile</Link>
            <Link href='/contact-us'>Contact Us</Link>
          </div>
        </div>
        <div className='flex gap-2'>
          <button className='signup-btn dja gap-2'><Link href='/sign-up'>Register</Link></button>
          <button className='signin-btn dja gap-2'><Link href='/sign-in'>Login</Link><Image src="images/right-simple-arrow.svg" height={16} width={16} alt='arrow' /></button>
        </div>
      </div>
    </div>
  )
}
