'use client'
import { ROOT_URL } from '@/utils/constant'
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

export default function Profile () {
  const token = getCookie('token')
  const [data, setData] = useState()
  const [isEditable, setIsEditable] = useState(false)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState({
    pageLoading: false,
    changePasswordLoading: false,
    editProfileLoading: false
  })
  const [changePassword, setChangePassword] = useState(false)
  const [oldNewPass, setOldNewPass] = useState({
    oldpassword: '',
    newpassword: ''
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
    setData(pre => ({
      ...pre,
      dob: selectedDates[0]?.toISOString().split('T')[0] || ''
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

    if (!data.dob) {
      setValidations(pre => ({ ...pre, dob: true }))
      handleError('dob')
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

    handleEdit()
  }

  const handleEdit = async () => {
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

  return (
    <div className='profile'>
      {loading.pageLoading ? (
        <Loader />
      ) : (
        <div className='profile-container'>
          <div className='profile-details-container w-100'>
            <div className='profile-form-heading'>
              <h2>PROFILE DETAILS</h2>
              <p>Register your all AI-devices with AI-Universe.</p>
            </div>
            <div className='profile-form'>
              <div className='profile-header-container'>
                <div className='profile-form-header dja'>
                  <div className='flex gap-2'>
                    <Image
                      src={`data:image/png;base64,${data?.image}` || '/images/profile.png'}
                      className='profile-image cursor-pointer'
                      width={40}
                      height={40}
                      alt='profile'
                      onClick={() => {
                        inputFile.current.click()
                      }}
                    />
                    <input
                      type='file'
                      id='file'
                      ref={inputFile}
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    <div>
                      <h1 className='font-bold'>{data?.fullName}</h1>
                      <h1 className='text-[14px] opacity-70'>{data?.email}</h1>
                    </div>
                  </div>
                  <div className='profile-edit-btn gap-2 flex'>
                    {isEditable ? (
                      <button
                        onClick={() => {
                          setIsEditable(false)
                        }}
                      >
                        <i className='fa-solid fa-x text-[14px] opacity-70'></i>
                      </button>
                    ) : (
                      <button
                        className='font-bold'
                        onClick={() => {
                          setIsEditable(true)
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className='form-details'>
                <div className='field-details'>
                  <p>Full Name</p>
                  {!isEditable ? (
                    <h2>{data?.fullName}</h2>
                  ) : (
                    <input
                      type='text'
                      className='text-right'
                      name='fullName'
                      ref={inputsRef.fullName}
                      onChange={handleEditChange}
                      value={data?.fullName}
                    />
                  )}
                </div>
                {validations.fullName && (
                  <span className='error-message'>Fullname Required</span>
                )}
                <div className='field-container'>
                  <div className='field-details w-100'>
                    {!isEditable ? (
                      <>
                        <p>Gender</p>
                        <h2>{data?.gender}</h2>
                      </>
                    ) : (
                      <>
                        <select
                          className='w-100'
                          id='gender'
                          name='gender'
                          ref={inputsRef.gender}
                          onChange={handleEditChange}
                          value={data?.gender}
                        >
                          <option value=''>Select your Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                          <option value='other'>Other</option>
                        </select>
                      </>
                    )}
                  </div>

                  <div className='field-details w-100'>
                    {!isEditable ? (
                      <>
                        <p>Date of Birth</p>
                        <h2>{dateFormat(data?.dob, 'd mmm, yyyy')}</h2>
                      </>
                    ) : (
                      <div className='flex justify-between w-100'>
                        <label htmlFor=''>DOB</label>
                        <input
                          type='date'
                          name='dob'
                          ref={inputsRef.dob}
                          value={data.dob}
                          onChange={handleEditChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {validations.dob && (
                  <span className='error-message'>Dob Required</span>
                )}
                {validations.gender && (
                  <span className='error-message'>Gender Required</span>
                )}

                <div className='field-details'>
                  <p>Email</p>
                  <h2>{data?.email}</h2>
                </div>
                <div className='field-details'>
                  <p>Phone</p>
                  <h2>{data?.phone}</h2>
                </div>
                <div className='field-details'>
                  {!isEditable ? (
                    <>
                      <p>Country</p>
                      <h2>{data?.country}</h2>
                    </>
                  ) : (
                    <div className='flex justify-between w-100'>
                      <select
                        id='country'
                        className='w-100'
                        name='country'
                        ref={inputsRef.country}
                        value={data.country}
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
                    </div>
                  )}
                </div>
                {validations.country && (
                  <span className='error-message'>Country Required</span>
                )}

                {changePassword && (
                  <>
                    <div className='field-details'>
                      <input
                        type='password'
                        className='w-100 change-password-input'
                        placeholder='Old Password'
                        name='oldpassword'
                        value={oldNewPass.oldpassword}
                        onChange={handlePassChange}
                      />
                    </div>
                    {validations.oldpassword && (
                      <span className='error-message'>
                        Old Password Required
                      </span>
                    )}
                    <div className='field-details'>
                      <input
                        type='password'
                        className='w-100 change-password-input'
                        placeholder='New Password'
                        name='newpassword'
                        value={oldNewPass.newpassword}
                        onChange={handlePassChange}
                      />
                    </div>
                    {validations.newpassword && (
                      <span className='error-message'>
                        New Password Required
                      </span>
                    )}
                  </>
                )}
                <div className='field-details change-password gap-2'>
                  <button
                    className='change-password-btn'
                    onClick={handleChangePassword}
                  >
                    {loading.pageLoading ? 'Loading...' : 'Change Password'}
                  </button>
                  {changePassword && (
                    <button
                      onClick={() => {
                        setChangePassword(false)
                      }}
                    >
                      <i className='fa-solid fa-x text-[14px] opacity-70'></i>
                    </button>
                  )}
                </div>
                {isEditable && (
                  <div className='w-100 flex justify-center m-0'>
                    <div className='field-details change-password gap-2'>
                      <button
                        className='change-password-btn'
                        onClick={checkValidations}
                      >
                        {loading.editProfileLoading ? 'Loading...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
