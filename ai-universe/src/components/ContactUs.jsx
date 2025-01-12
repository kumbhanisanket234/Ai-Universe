'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { EMAIL_REGEX, ROOT_URL } from '@/utils/constant'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ContactUs() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  })
  const [validations, setValidations] = useState({
    fullname: false,
    email: false,
    message: false
  })
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setValidations(prev => ({ ...prev, [name]: false }))
  }

  const checkValidations = () => {
    const { fullname, email, message } = formData
    if (!fullname) {
      setValidations(prev => ({ ...prev, fullname: true }))
      return
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      setValidations(prev => ({ ...prev, email: true }))
      return
    }

    if (!message) {
      setValidations(prev => ({ ...prev, message: true }))
      return
    }

    submit()
  }

  const submit = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${ROOT_URL}/contactus`, { ...formData })
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setFormData({
          fullname: '',
          email: '',
          message: ''
        })
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='contact-main flex items-center justify-center'>
      <div className='flex justify-center items-center gap-[40px]'>
        <div>
          <div className='heading-btn'>
            <button disabled>Contact Us</button>
          </div>
          <div className='contactus-heading mt-6'>
            <h1>Get in Touch With Us</h1>
            <p className='mt-4'>We’re here to support you! Feel free to reach out for assistance, feedback, or any questions.</p>
          </div>
          <div className='talk-about mt-[48px]'>
            <h1>Let's Talk About:</h1>
            <div className='talk-about-details dja mt-[24px]'>
              <div className='right-arrow dja'><Image src="/images/phone2.svg" height={16} width={16} alt='right-arrow'/></div>
              <p>+91XXXXXXXXXX</p>
            </div>
            <div className='talk-about-details dja mt-[16px]'>
              <div className='right-arrow dja'><Image src="/images/mail.svg" height={16} width={16} alt='right-arrow'/></div>
              <p>support@aiuniverse.com</p>
            </div>
            <div className='talk-about-details dja mt-[16px]'>
              <div className='right-arrow dja'><Image src="/images/location-2.svg" height={16} width={16} alt='right-arrow'/></div>
              <p>234 Preston Rd. Surat, Gujarat-395010</p>
            </div>
          </div>
        </div>
        <div className='contact-form-container'>
          <div className='contact-form-heading'>
            <h1>Get in touch</h1>
            <p>We are here for you! How can we help?</p>
          </div>
          <div className='flex flex-col'>
            <div className='contact-form mt-3'>
              <div>
                <input
                  type='text'
                  placeholder='Full Name'
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {validations.fullname && (
                  <span className='error-message'>Full Name Required</span>
                )}
              </div>
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  value={formData.email}
                />
                {validations.email && (
                  <span className='error-message'>
                    {!formData.email ? 'Email Required' : 'Invalid Email'}
                  </span>
                )}
              </div>
              <div>
                <input
                  type='subject'
                  placeholder='Subject'
                  name='subject'
                  // onChange={handleChange}
                  // value={formData.subject}
                />
                {/* {validations.subject && (
                  <span className='error-message'>
                    {!formData.subject ? 'subject Required' : 'Invalid subject'}
                  </span>
                )} */}
              </div>
              <div>
                <textarea
                  id='message'
                  placeholder='Message'
                  rows='3'
                  cols='50'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {validations.message && (
                <span className='error-message'>Message Required</span>
              )}
            </div>
            <div className='contact-submit-div'>
              <button className='contact-submit-btn' onClick={checkValidations}>
                {loading ? "Loading..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
