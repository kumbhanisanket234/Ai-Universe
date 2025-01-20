'use client'
import { convert, ROOT_URL } from '@/utils/constant'
import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import dateFormat from 'dateformat'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import countryList from '../utils/countryList.json'
import Loader from './Loader'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

export default function Profile () {
  const token = getCookie('token')
  const [isEditable, setIsEditable] = useState(false)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState({
    pageLoading: false,
    changePasswordLoading: false,
    editProfileLoading: false
  })
  const [data, setData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    country: ''
  })
  const [validations, setValidations] = useState({
    fullName: false,
    dob: false,
    gender: false,
    country: false,
    oldpassword: false,
    newpassword: false
  })

  const inputsRef = {
    fullName: useRef(),
    dob: useRef(),
    gender: useRef(),
    country: useRef(),
    newpassword: useRef()
  }
  
  const [changePassword, setChangePassword] = useState(false)
  const [oldNewPass, setOldNewPass] = useState({
    oldpassword: '',
    newpassword: ''
  })

  const fetchData = async () => {
    try {
      setLoading(prev => ({ ...prev, pageLoading: true }))
      const res = await axios.get(`${ROOT_URL}/login/getuser`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res?.data?.success) {
        setData(res?.data?.user)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(prev => ({ ...prev, pageLoading: false }))
    }
  }
  useEffect(() => {
    fetchData()
  }, [isEditable])

  const handlePassChange = e => {
    const { name, value } = e.target
    setOldNewPass(prev => ({ ...prev, [name]: value }))
    setValidations(prev => ({ ...prev, [name]: false }))
  }
  const changePass = async () => {
    if (!oldNewPass.oldpassword) {
      setValidations(pre => ({ ...pre, oldpassword: true }))
      return
    }
    if (!oldNewPass.newpassword || oldNewPass.newpassword < 8) {
      setValidations(pre => ({ ...pre, newpassword: true }))
      return
    }
    try {
      setLoading(prev => ({ ...prev, changePasswordLoading: true }))

      const res = await axios.post(`${ROOT_URL}/changepassword`, {
        email: data.email,
        old_password: oldNewPass.oldpassword,
        new_password: oldNewPass.newpassword
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setOldNewPass({
          oldpassword: '',
          newpassword: ''
        })
        setChangePassword(false)
        return
      }
      toast.error(res?.data?.error)
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(prev => ({ ...prev, changePasswordLoading: false }))
    }
  }
  const handleChangePassword = () => {
    setChangePassword(true)
    if (changePassword) {
      changePass()
    }
  }

  const handleDate = selectedDates => {
    console.log(selectedDates)
    setData(pre => ({
      ...pre,
      dob: convert(selectedDates?.$d) || ''
    }))
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

    if (!data.fullName.trim()) {
      setValidations(pre => ({ ...pre, fullName: true }))
      handleError('fullName')
      return
    }

    if (!data.gender) {
      setValidations(pre => ({ ...pre, gender: true }))
      handleError('gender')
      return
    }
    if (!data.country) {
      setValidations(pre => ({ ...pre, country: true }))
      handleError('country')
      return
    }
    if (!data.dob) {
      setValidations(pre => ({ ...pre, dob: true }))
      handleError('dob')
      return
    }

    handleEdit()
  }

  const handleEdit = async () => {
    setLoading(prev => ({ ...prev, editProfileLoading: true }))
    try {
      const res = await axios.patch(
        `${ROOT_URL}/update_user`,
        {},
        {
          params: {
            email: data.email,
            fullName: data.fullName,
            dob: data.dob,
            country: data.country
          }
        }
      )

      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setIsEditable(false)
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(prev => ({ ...prev, editProfileLoading: false }))
    }
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    setValidations(pre => ({ ...pre, [name]: false }))
  }

  const handleFileChange = async e => {
    const image = e.target.files[0]
    const bodyData = new FormData()
    bodyData.append('image', image)
    bodyData.append('email', data?.email)

    try {
      const res = await axios.patch(`${ROOT_URL}/profile_image`, bodyData)
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        fetchData()
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    } catch (err) {
      console.log(err)
    }
  }

  return loading.pageLoading ? (
    <Loader />
  ) : (
    <div className='profile min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-100 bg-gray-800 rounded-xl shadow-lg p-8'>
        <div className='flex items-center justify-between space-x-4 mb-8'>
          <div className='relative flex items-center gap-3 w-24 h-24'>
            <Image
              src={
                `data:image/png;base64,${data?.image}` || '/images/profile.png'
              }
              alt='Profile'
              width={96}
              height={96}
              className='rounded-full object-cover cursor-pointer'
              onClick={() => {
                inputFile.current.click()
              }}
            />
            <input
              type='file'
              id='file'
              ref={inputFile}
              onChange={handleFileChange}
              disabled={!isEditable}
              className='hidden'
            />
            <div>
              <h1 className='text-xl font-semibold text-white'>
                {data?.fullName || 'John Deo'}
              </h1>
              <p className='text-gray-400'>{data?.email || 'demo@gmail.com'}</p>
            </div>
          </div>

          {isEditable ? (
            <button
              onClick={() => {
                setIsEditable(false)
                setValidations(prev => ({
                  ...prev,
                  fullName: false,
                  dob: false,
                  gender: false,
                  country: false
                }))
              }}
            >
              <i className='fa-solid fa-x text-[14px] opacity-70'></i>
            </button>
          ) : (
            <button
              className='ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg'
              onClick={() => {
                setIsEditable(true)
              }}
            >
              Edit
            </button>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Full Name'
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
              disabled={!isEditable}
              name='fullName'
              ref={inputsRef.fullName}
              value={data?.fullName}
              onChange={handleEditChange}
            />
            {validations.fullName && (
              <span className='error-message'>Fullname Required</span>
            )}
          </div>
          <div className='mb-6'>
            <div className='relative'>
              <select
                id='gender'
                className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                disabled={!isEditable}
                name='gender'
                ref={inputsRef.gender}
                value={data?.gender}
                onChange={handleEditChange}
              >
                <option value=''>Select Your gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
            {validations.gender && (
              <span className='error-message'>Gender Required</span>
            )}
          </div>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Phone'
              disabled
              name='phone'
              value={data?.phone}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
            />
          </div>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={data?.email}
              disabled
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
            />
          </div>
          <div className='mb-6'>
            <div className='relative'>
              <select
                id='country'
                className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                disabled={!isEditable}
                name='country'
                ref={inputsRef.country}
                value={data?.country}
                onChange={handleEditChange}
              >
                <option value=''>Select Your Country</option>
                {countryList.map((list, index) => {
                  return (
                    <option key={index} value={list.name}>
                      {list.name}
                    </option>
                  )
                })}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
            {validations.country && (
              <span className='error-message'>Country Required</span>
            )}
          </div>
          <div className='mb-6'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                  disabled={!isEditable}
                  name='dob'
                  defaultValue={dayjs(data?.dob)}
                  onChange={handleDate}
                />
              </DemoContainer>
            </LocalizationProvider>
            {validations.dob && (
              <span className='error-message'>Dob Required</span>
            )}
          </div>

          {changePassword && (
            <>
              <div className='mb-6'>
                <input
                  type='password'
                  placeholder='Old Password'
                  name='oldpassword'
                  value={oldNewPass?.oldpassword}
                  onChange={handlePassChange}
                  className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                />
                {validations.oldpassword && (
                  <span className='error-message'>Old Password Required</span>
                )}
              </div>
              <div className='field-details'>
                <input
                  type='password'
                  placeholder='New Password'
                  name='newpassword'
                  value={oldNewPass.newpassword}
                  onChange={handlePassChange}
                  className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                />
                {validations.newpassword && (
                  <span className='error-message'>New Password Required</span>
                )}
              </div>
            </>
          )}
          <div className='mb-6'>
            <div className='relative'>
              <button
                className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                onClick={handleChangePassword}
              >
                {loading.pageLoading ? 'Loading...' : 'Change Password'}
              </button>
              {changePassword && (
                <button
                  onClick={() => {
                    setChangePassword(false)
                    setValidations(prev => ({
                      ...prev,
                      oldpassword: false,
                      newpassword: false
                    }))
                  }}
                >
                  <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                    <i className='fa-solid fa-x text-[14px] opacity-70'></i>
                  </div>
                </button>
              )}
            </div>
          </div>
          {isEditable && (
            <div className='mb-6'>
              <div className='relative'>
                <button
                  className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100'
                  onClick={checkValidations}
                >
                  {loading.editProfileLoading ? 'Loading...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
