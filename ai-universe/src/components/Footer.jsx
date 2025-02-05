"use client"
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className="text-white py-10">
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
          <a href="/">
            <Image src="/images/logo.svg" height={50} width={150} alt="Logo" />
          </a>
          <p className="text-gray-400 mt-3 mb-4">
            The Ai-Universe is an AI Device Registration Platform designed exclusively to register and manage AI devices.
          </p>
          <div className="flex space-x-4">
            <a href="#" target="_blank">
              <img src="/images/contact-insta.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank">
              <img src="/images/facebook.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank">
              <img src="/images/contact-twiter.svg" alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="#" target="_blank">
              <img src="/images/youtube.svg" alt="YouTube" className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="w-1/2 md:w-1/4 lg:w-1/6 px-4 mb-6">
          <p className="font-semibold text-white mb-2">Introduction</p>
          <ul>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">About Us</a>
            </li>
          </ul>
        </div>

        <div className="w-1/2 md:w-1/4 lg:w-1/6 px-4 mb-6">
          <p className="font-semibold text-white mb-2">Quick Links</p>
          <ul>
            <li>
              <a href="#" target="_blank" className="text-gray-400 hover:text-white">...</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 px-4">
          <p className="font-semibold text-white mb-2">Contact Us</p>
          <ul>
            <li>
              <a href="#" target="_blank" className="text-gray-400 hover:text-white">...</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-wrap justify-between text-gray-400">
        <p>&copy; 2024 Ai-Universe. All rights reserved.</p>
        <p className="mt-2 lg:mt-0">Ready to join Ai-Universe now!</p>
      </div>
    </footer>
  </div>
  )
}

export default Footer
