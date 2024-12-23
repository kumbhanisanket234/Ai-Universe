'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import countryList from '../utils/countryList.json'
import { EMAIL_REGEX, FULLNAME_REGEX, PHONE_REGEX } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function SignUp () {
  const router = useRouter()
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
    check: false
  })

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

  const onSubmit = () => {
    console.log(formData)
    toast.success("Submit Successfully")
    setFormData(prev => ({
      ...prev,
      fullName: '',
      phone: '',
      dob: '',
      gender: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: '',
      check: false
    }))
  }

  return (
    <div className='signup-main'>
      <div className='signup flex justify-center'>
        <div className='signup-image-container'>
          <button
            className='back-btn'
            onClick={() => {
              router.push('/ai-universe')
            }}
          >
            Back to home
          </button>
          <Image
            src='/images/signup-robot.png'
            height={600}
            width={883}
            alt='Register'
            className='signup-image'
          />
        </div>
        <div className='signup-form-container'>
          <div className='signup-heading'>
            <h1 className='text-[25px] font-bold'>Welcome to Ai-Universe</h1>
            <p className='text-[16px] mt-[46px]'>create your account</p>
          </div>
          <div className='signup-form mt-[23px]'>
            <div className='mt-5'>
              <label htmlFor=''>Full name</label>
              <input
                type='text'
                ref={inputsRef.fullName}
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
              />
              {validations.fullName && (
                <span className='error-message'>Fullname Required</span>
              )}
            </div>
            <div className='mt-5'>
              <label htmlFor=''>Phone</label>
              <input
                type='text'
                ref={inputsRef.phone}
                name='phone'
                value={formData.phone}
                onChange={handleChange}
              />
              {validations.phone && (
                <span className='error-message'>
                  {!formData.phone ? 'Phone number Required' : 'Invalid Phone'}
                </span>
              )}
            </div>
            <div className='mt-5'>
              <label htmlFor=''>DOB</label>
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
              <label htmlFor='gender'>Gender</label>
              <br />
              <select
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
            <div className='mt-5'>
              <label htmlFor='country'>Country</label>
              <br />
              <select
                ref={inputsRef.country}
                id='country'
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
            <div className='mt-5'>
              <label htmlFor=''>Repeat Password</label>
              <input
                type='password'
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
            <div className='flex items-center mt-5 gap-2'>
              <input
                type='checkbox'
                className='checkbox'
                id='checkbox'
                name='checkbox'
                ref={inputsRef.checkbox}
                checked={formData.check}
                onChange={e => {
                  setFormData({ ...formData, check: e.target.checked }),
                    setValidations({ ...validations, check: false })
                }}
              />
              <label htmlFor='checkbox'>
                I agree <Link href='#'>terms & condition</Link>
              </label>
              <br />
            </div>
            {validations.check && (
              <span className='error-message'>Agree Terms And Condition</span>
            )}
            <button className='submit-btn' onClick={checkValidations}>
              Create an account
            </button>
            <div className='flex justify-center items-center mt-5 gap-2'>
              <p>Already have an account ?</p>
              <Link href='/sign-in' className='signin-link font-semibold'>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
