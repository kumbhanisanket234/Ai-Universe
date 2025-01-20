import Category from '@/components/Category'
import ContactUs from '@/components/ContactUs'
import Faq from '@/components/Faq'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Future from '@/components/Future'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Review from '@/components/Review'
import React from 'react'

export default function page () {
  return (
    <>
        <Navbar />
        <Hero />
        <Features/>
        <Category/>
        <Review />
        <Faq/>
        <Future/>
        <Footer />
    </>
  )
}
