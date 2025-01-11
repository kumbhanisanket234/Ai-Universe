'use client'
import { EMAIL_REGEX, ROOT_URL } from '@/utils/constant'
import { setCookie } from '@/utils/cookies'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const router = useRouter()
  let numberOfDigits = 4
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''))
  const otpBoxReference = useRef([])
  const [otpSent, setOtpSent] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [timer, setTimer] = useState(60)

  const inputsRef = {
    email: useRef(),
    password: useRef(),
    newPassword: useRef()
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [validations, setValidations] = useState({
    email: false,
    password: false,
    otp: false,
    newPassword: false
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

    if (otpSent) {
      if (!newPassword || newPassword.length < 8) {
        setValidations(pre => ({ ...pre, newPassword: true }))
        handleError('newPassword')
        return
      }
    }

    if (!otpSent) {
      if (!formData.password) {
        setValidations(pre => ({ ...pre, password: true }))
        handleError('password')
        return
      }
    }

    onSubmit()
  }

  const onSubmit = async () => {
    if (loading) return
    try {
      setLoading(true)
      if (otpSent) {
        const otpValue = otp.join('')
        if (!otpValue) {
          setValidations(pre => ({ ...pre, otp: true }))
          return
        }
        const res = await axios.post(`${ROOT_URL}/forgotpassword/resetpassword`, {
          email: formData.email,
          new_password: newPassword,
          otp: otpValue
        })

        if (res?.data?.success) {
          setOtpSent(false)
          setOtp([])
          setNewPassword('')
          setFormData({
            email: '',
            password: '',
          })
          toast.success(res?.data?.message)
          return
        }
        toast.error(res?.data?.error || 'Something went wrong')
        return
      }
      console.log('hello')
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
        setCookie('token', res.data?.token)
        router.push('/ai-universe')
        toast.success(res?.data?.message)
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

  const handleForgotPassword = async () => {
    if (forgotPasswordLoading) return
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      setValidations(pre => ({ ...pre, email: true }))
      return
    }
    try {
      setForgotPasswordLoading(true)
      const res = await axios.post(
        `${ROOT_URL}/forgotpassword`,
        {},
        { params: { email: formData.email } }
      )
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setOtpSent(true)
        Timer()
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || 'Something went wrong')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  function handleOTPChange(value, index) {
    let newArr = [...otp]
    newArr[index] = value
    setOtp(newArr)
    setValidations(prev => ({ ...prev, otp: false }))
    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
    if (e.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  const Timer = () => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setOtpSent(false)
          setTimer(60)
          return 0
        }
        return prev - 1
      })

      return () => clearInterval(interval)
    }, 1000)
  }

  return (
    <div className='contact-main flex items-center justify-center'>
      <div className='flex justify-center items-center gap-[100px]'>
        <div>
          <div className='heading-btn'>
            <button disabled>Login</button>
          </div>
          <div className='contactus-heading mt-6'>
            <h1>Welcome to <br />Ai-Universe</h1>
            <p className='mt-4'>create your account Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eos saepe eum nobis fugiat debitis laboriosam harum consequatur sapiente sed.</p>
          </div>
          <div className='talk-about mt-[48px]'>
            <div className='flex items-center mt-5 gap-2'>
              <p>Don’t have an account?</p>
              <Link href='/sign-up' className='signin-link font-semibold'>
                Register Now
              </Link>
            </div>
          </div>
        </div>
        <div className='contact-form-container signup-form-container'>
          <div className='contact-form-heading'>
            <h1>Welcome to Ai-Universe</h1>
            <p>Login your account</p>
          </div>
          <div className='flex flex-col'>
            <div className='contact-form mt-3'>
              <div className='mt-2'>
                <div className='mt-0'>
                  <input
                    type='email'
                    placeholder='Email'
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
                {!otpSent && (
                  <div className='mt-2'>
                    <input
                      type='password'
                      placeholder='Password'
                      ref={inputsRef.password}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {validations.password && (
                      <span className='error-message'>Password Required</span>
                    )}
                  </div>
                )}
                <div className='mt-2 font-bold text-[14px] flex justify-end'>
                  <button
                    className='signin-link'
                    onClick={handleForgotPassword}
                    disabled={otpSent}
                  >
                    {forgotPasswordLoading ? 'Loading...' : 'Forgot Password?'}
                  </button>
                </div>
                {otpSent && (
                  <>
                    <div className='mt-2'>
                      <input
                        type='password'
                        placeholder='New Password'
                        name='newPassword'
                        ref={inputsRef.newPassword}
                        value={newPassword}
                        onChange={e => {
                          setValidations(prev => ({ ...prev, newPassword: false }))
                          setNewPassword(e.target.value)
                        }}
                      />
                      {validations.newPassword && (
                        <span className='error-message'>
                          {' '}
                          {!newPassword
                            ? 'New Password Required'
                            : 'Password must be greater than 8 character'}
                        </span>
                      )}
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-4 mt-4'>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          value={digit}
                          maxLength={1}
                          onChange={e => handleOTPChange(e.target.value, index)}
                          onKeyUp={e => handleBackspaceAndEnter(e, index)}
                          ref={reference =>
                            (otpBoxReference.current[index] = reference)
                          }
                          className={`OTP-boxes rounded-md block appearance-none p-0`}
                        />
                      ))}
                    </div>
                    {validations.otp && (
                      <div className='error-message flex justify-center w-100'>
                        OTP Required
                      </div>
                    )}
                    {otpSent && (
                      <>
                        <p className='text-center m-0 mt-2'>
                          You can Retry after {timer} second
                        </p>
                      </>
                    )}
                  </>
                )}
                <div className='contact-submit-div'>
                  <button className='contact-submit-btn w-100' onClick={checkValidations}>
                    {loading ? 'Loading...' : otpSent ? 'Submit' : 'Login'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
