'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { EMAIL_REGEX, ROOT_URL } from '@/utils/constant'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ContactUs () {
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
    <div className='contact-main flex flex-col items-center justify-center'>
      <div className='flex justify-center items-center gap-[126px]'>
        <div className='contact-form-container'>
          <div className='contact-heading'>
            <h1>Get in touch</h1>
            <p>We are here for you! How can we help?</p>
          </div>
          <div className='flex flex-col'>
            <div className='contact-form mt-3'>
              <div>
                <p>Full Name*</p>
                <input
                  type='text'
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {validations.fullname && (
                  <span className='error-message'>Full Name Required</span>
                )}
              </div>
              <div>
                <p>Email*</p>
                <input
                  type='email'
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
                <p>Message*</p>
                <textarea
                  id='message'
                  rows='2'
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
                {loading ? "Loading..." :"Submit"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <Image
            src='/images/contactus.svg'
            height={450}
            width={470}
            alt='contact-us'
          />
          <div className='contact-details-container'>
            <div className='flex gap-2'>
              <Image
                src='/images/location.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>Surat, Gujarat - 395010</p>
            </div>
            <div className='flex gap-2'>
              <Image
                src='/images/phone.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>+91 XXXXXXXXXX</p>
            </div>
            <div className='flex gap-2'>
              <Image
                src='/images/message.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mt-5'>
        <div className='contact-social-container flex justify-center '>
          <Link href='#' target='_blank'>
            <Image
              src='/images/contact-facebook.svg'
              height={45}
              width={45}
              alt='contact-us'
            />
          </Link>
          <Link href='#' target='_blank'>
            <Image
              src='/images/contact-insta.svg'
              height={45}
              width={45}
              alt='contact-us'
            />
          </Link>
          <Link href='#' target='_blank'>
            <Image
              src='/images/contact-linkedin.svg'
              height={45}
              width={45}
              alt='contact-us'
            />
          </Link>
          <Link href='#' target='_blank'>
            <Image
              src='/images/contact-twiter.svg'
              height={45}
              width={45}
              alt='contact-us'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
