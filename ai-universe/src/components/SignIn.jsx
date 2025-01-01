'use client'
import { EMAIL_REGEX, ROOT_URL } from '@/utils/constant'
import { setCookie } from '@/utils/cookies'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignIn () {

  const [loading,setLoading]=useState(false)
  const router = useRouter()
  const inputsRef = {
    email: useRef(),
    password: useRef()
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [validations, setValidations] = useState({
    email: false,
    password: false
  })

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(pre => ({ ...pre, [name]: value }))
    setValidations(pre => ({ ...pre, [name]: false }))
  }

  const checkValidations = () => {
    const handleError = key => {
      setValidations(prev => ({ ...prev, [key]: true }))
      inputsRef[key].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
      inputsRef[key].current?.focus()
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      setValidations(pre => ({ ...pre, email: true }))
      handleError('email')
      return
    }

    if (!formData.password) {
      setValidations(pre => ({ ...pre, password: true }))
      handleError('password')
      return
    }

    onSubmit()
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${ROOT_URL}/login`,
        {},
        {
          params: {
            ...formData
          }
        }
      )
      if (res?.data?.success) {
        setCookie('token',res.data?.token)
        router.push('/ai-universe')
        toast.success(res?.data?.message)
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')

    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || 'Something went wrong')
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='signup-main'>
      <div className='signup flex justify-center'>
        <div className='signup-image-container'>
          <button
            className='back-btn'
            onClick={() => {
              router.back()
            }}
          >
            Back
          </button>
          <Image
            src='/images/signup-robot.png'
            height={600}
            width={883}
            alt='Register'
            className='signup-image'
          />
        </div>
        <div className='signin-form-container'>
          <div className='signup-heading'>
            <h1 className='text-[25px] font-bold'>Welcome to Ai-Universe</h1>
            <p className='text-[16px] mt-[46px]'>Login your account</p>
          </div>
          <div className='signup-form mt-[23px]'>
            <div className='mt-5'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                ref={inputsRef.email}
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {validations.email && (
                <span className='error-message'>
                  {!formData.email ? 'Email Required' : 'Invalid Email'}
                </span>
              )}
            </div>
            <div className='mt-5'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                ref={inputsRef.password}
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              {validations.password && (
                <span className='error-message'>Password Required</span>
              )}
            </div>
            <button className='submit-btn' onClick={checkValidations}>
              {loading ? "Loading..." : "Login"}
            </button>
            <div className='flex justify-center items-center mt-5 gap-2'>
              <p>Don’t have an account?</p>
              <Link href='/sign-up' className='signin-link font-semibold'>
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
