'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import countryList from '../utils/countryList.json'
import {
  EMAIL_REGEX,
  FULLNAME_REGEX,
  PHONE_REGEX,
  ROOT_URL
} from '@/utils/constant'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

export default function SignUp() {
  const router = useRouter()
  const [timer, setTimer] = useState(60)
  let numberOfDigits = 4
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''))
  const otpBoxReference = useRef([])
  const [otpSent, setOtpSent] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)

  const inputsRef = {
    fullName: useRef(),
    phone: useRef(),
    dob: useRef(),
    gender: useRef(),
    email: useRef(),
    country: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
    check: useRef()
  }

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dob: '',
    gender: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    check: false
  })

  const [validations, setValidations] = useState({
    fullName: false,
    phone: false,
    dob: false,
    gender: false,
    email: false,
    country: false,
    password: false,
    confirmPassword: false,
    check: false,
    otp: false
  })

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

  const handleChange = e => {
    const { name, value } = e.target

    if (name == 'fullName' && !FULLNAME_REGEX.test(value)) {
      return
    }

    if (name == 'phone' && !PHONE_REGEX.test(value)) {
      return
    }

    setFormData(pre => ({ ...pre, [name]: value }))
    setValidations(pre => ({ ...pre, [name]: false }))
  }

  const handleDate = selectedDates => {
    setFormData(pre => ({
      ...pre,
      dob: selectedDates[0]?.toISOString().split('T')[0] || ''
    }))
    setValidations(pre => ({ ...pre, dob: false }))
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

    if (!formData.fullName.trim()) {
      setValidations(pre => ({ ...pre, fullName: true }))
      handleError('fullName')
      return
    }

    if (!formData.phone.trim() || formData.phone.length !== 10) {
      setValidations(pre => ({ ...pre, phone: true }))
      handleError('phone')
      return
    }

    if (!formData.dob) {
      setValidations(pre => ({ ...pre, dob: true }))
      handleError('dob')
      return
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      setValidations(pre => ({ ...pre, email: true }))
      handleError('email')
      return
    }

    if (!formData.gender) {
      setValidations(pre => ({ ...pre, gender: true }))
      handleError('gender')
      return
    }

    if (!formData.country) {
      setValidations(pre => ({ ...pre, country: true }))
      handleError('country')
      return
    }

    if (!formData.password || formData.password.length < 8) {
      setValidations(pre => ({ ...pre, password: true }))
      handleError('password')
      return
    }

    if (
      !formData.confirmPassword ||
      formData.confirmPassword !== formData.password
    ) {
      setValidations(pre => ({ ...pre, confirmPassword: true }))
      handleError('confirmPassword')
      return
    }

    if (!formData.check) {
      setValidations(pre => ({ ...pre, check: true }))
      handleError('check')
      return
    }

    onSubmit()
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${ROOT_URL}/register`,
        {},
        {
          params: {
            ...formData,
            confirmPassword: undefined,
            check: undefined
          }
        }
      )
      if (res?.data?.success) {
        setOtpSent(true)
        Timer()
        setIsOpen(true)
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async () => {
    const otpValue = otp.join('')
    if (!otpValue) {
      setValidations(pre => ({ ...pre, otp: true }))
      return
    }
    try {
      setVerifyLoading(true)
      const res = await axios.post(`${ROOT_URL}/register/verify_otp`, {
        email: formData.email,
        otp: otpValue
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setIsOpen(false)
        setOtpSent(false)
        setOtp([])
        router.push('/sign-in')
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setVerifyLoading(false)
    }
  }
  return (
    <>
      <div className='contact-main flex items-center justify-center'>
        <div className='flex justify-center items-center gap-[100px]'>
          <div>
            <div className='heading-btn'>
              <button disabled>Register</button>
            </div>
            <div className='contactus-heading mt-6'>
              <h1>Welcome to <br />Ai-Universe</h1>
              <p className='mt-4'>create your account Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eos saepe eum nobis fugiat debitis laboriosam harum consequatur sapiente sed.</p>
            </div>
            <div className='talk-about mt-[48px]'>
            <div className='flex items-center mt-2 gap-2'>
                  <p>Already have an account ?</p>
                  <Link href='/sign-in' className='signin-link font-semibold'>
                    Sign in
                  </Link>
                </div>
            </div>
          </div>
          <div className='contact-form-container signup-form-container'>
            <div className='contact-form-heading'>
              <h1>Welcome to Ai-Universe</h1>
              <p>create your account</p>
            </div>
            <div className='flex flex-col'>
              <div className='contact-form mt-3'>
                <div className='mt-2'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    ref={inputsRef.fullName}
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {validations.fullName && (
                    <span className='error-message'>Fullname Required</span>
                  )}
                </div>
                <div className='mt-2'>
                  <input
                    type='text'
                    placeholder='Phone'
                    ref={inputsRef.phone}
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {validations.phone && (
                    <span className='error-message'>
                      {!formData.phone
                        ? 'Phone number Required'
                        : 'Invalid Phone'}
                    </span>
                  )}
                </div>
                <div className='mt-3'>
                  <Flatpickr
                    options={{
                      dateFormat: 'Y-m-d'
                    }}
                    value={formData.dob}
                    onChange={handleDate}
                    className='form-control date-input m-0'
                    id='dob'
                    name='dob'
                    placeholder='Select your birth date'
                  />
                  {validations.dob && (
                    <span className='error-message'>DOB Required</span>
                  )}
                </div>
                <div className='mt-2'>
                  <div className='flex flex-wrap mt-0'>
                    <input
                      type='email'
                      placeholder='Email'
                      ref={inputsRef.email}
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {validations.email && (
                    <span className='error-message'>
                      {!formData.email ? 'Email Required' : 'Invalid Email'}
                    </span>
                  )}
                </div>
                <div className='mt-2'>
                  <select
                    placeholder="Gender"
                    ref={inputsRef.gender}
                    id='gender'
                    name='gender'
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    <option value=''>Select your Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                  {validations.gender && (
                    <span className='error-message'>Gender Required</span>
                  )}
                </div>
                <div className='mt-2'>
                  <select
                    id='country'
                    placeholder="Country"
                    ref={inputsRef.country}
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value=''>Select your country</option>
                    {countryList.map((list, index) => {
                      return (
                        <option key={index} value={list.name}>
                          {list.name}
                        </option>
                      )
                    })}
                  </select>
                  {validations.country && (
                    <span className='error-message'>Country Required</span>
                  )}
                </div>
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
                    <span className='error-message'>
                      {' '}
                      {!formData.password
                        ? 'Password Required'
                        : 'Password must be greater than 8 character'}
                    </span>
                  )}
                </div>
                <div className='mt-2'>
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    ref={inputsRef.confirmPassword}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {validations.confirmPassword && (
                    <span className='error-message'>
                      {!formData.confirmPassword
                        ? 'Confirm Password Required'
                        : 'Passwords do not match'}
                    </span>
                  )}
                </div>

                <div className='flex items-center mt-2 gap-2'>
                  <input
                    type='checkbox'
                    className='checkbox mt-0'
                    id='checkbox'
                    name='checkbox'
                    ref={inputsRef.checkbox}
                    checked={formData.check}
                    onChange={e => {
                      setFormData({ ...formData, check: e.target.checked }),
                        setValidations({ ...validations, check: false })
                    }}
                  />
                  I agree <Link href='#'>terms & condition</Link>
                </div>
                {validations.check && (
                  <span className='error-message'>Agree Terms And Condition</span>
                )}
                <div className='contact-submit-div'>
                  <button className='contact-submit-btn w-100' onClick={
                    otpSent
                      ? () => {
                        setIsOpen(true)
                      }
                      : checkValidations
                  }>
                    {loading && !isOpen ? 'Loading...' : 'Create an account'}
                  </button>
                </div>

                <div className='flex justify-center items-center mt-2 gap-2'>
                  <p>Already have an account ?</p>
                  <Link href='/sign-in' className='signin-link font-semibold'>
                    Sign in
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isOpen}
        onHide={() => {
          setIsOpen(false)
        }}
        centered
        className='otp-modal'
      >
        <Modal.Header>
          <div className='flex items-center justify-between w-100'>
            <h1>Enter OTP For Verify Email</h1>
            <button
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <i className="fa-solid fa-x close"></i>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <h1 className='text-[40px]'>Enter Vetification Code</h1>
            <h1 className='opacity-40 mt-3'>
              We have send a verification code email to
            </h1>
            <h1 className='mt-2'>{formData.email || 'info@gmail.com'}</h1>
          </div>
          <div className='d-flex justify-content-center align-items-center gap-4 mt-4'>
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={1}
                onChange={e => handleOTPChange(e.target.value, index)}
                onKeyUp={e => handleBackspaceAndEnter(e, index)}
                ref={reference => (otpBoxReference.current[index] = reference)}
                className={`OTP-boxes border rounded-md block focus:border-2 focus:outline-none appearance-none`}
              />
            ))}
          </div>
          {validations.otp && (
            <div className='error-message flex justify-center w-100'>
              OTP Required
            </div>
          )}
          <div className='flex justify-center mt-2 w-100'>
            <button className='otp-submit-btn' onClick={handleVerifyEmail}>
              {verifyLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          {otpSent && (
            <>
              <p className='text-center m-0 mt-2'>
                You can resend OTP after {timer} second
              </p>
            </>
          )}
          <div className='dja'>
            <button
              className='btn btn-default resend-otp-btn'
              onClick={checkValidations}
              disabled={otpSent}
            >
              {loading && isOpen ? 'Sending...' : ' Resend OTP'}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
