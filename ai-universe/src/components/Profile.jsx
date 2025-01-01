'use client'
import { ROOT_URL } from '@/utils/constant'
import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import Image from 'next/image'

export default function Profile () {
  const token = getCookie('token')
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${ROOT_URL}/login/getuser`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('-------------------->', res)

      if (res?.data?.success) {
        setData(res?.data?.user)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleEdit = () => {}
  
  return (
    <div className='dashboard'>
      {loading ? (
        <div>
          <div className='loader'></div>{' '}
        </div>
      ) : (
        <div className='dashboard-container'>
          <div className='dashboard-details-container w-100'>
            <div className='dashboard-form-heading'>
              <h2>PROFILE DETAILS</h2>
              <p>Register your all AI-devices with AI-Universe.</p>
            </div>
            <div className='dashboard-form'>
              <div className='dashboard-faithid-container'>
                <div className='dashboard-form-faithid dja'>
                  <div className='flex gap-2'>
                    <Image
                      src={data?.image || '/images/profile.png'}
                      className='profile-image'
                      width={40}
                      height={40}
                      alt='profile'
                    />
                    <div>
                      <h1 className='font-bold'>{data?.fullName}</h1>
                      <h1 className='text-[14px] opacity-70'>{data?.email}</h1>
                    </div>
                  </div>
                  <h2>
                    <button className='profile-edit-btn' onClick={handleEdit}>
                      Edit
                    </button>
                  </h2>
                </div>
              </div>
              <div className='form-details'>
                <div className='field-details'>
                  <p>Full Name</p>
                  <input
                    type='text'
                    className='text-right'
                    value={data?.fullName}
                    disabled
                  />
                </div>
                <div className='field-container'>
                  <div className='field-details w-100'>
                    <p>Gender</p>
                    <h2>{data?.gender}</h2>
                  </div>
                  <div className='field-details w-100'>
                    <p>Date of Birth</p>
                    <h2>{dateFormat(data?.dob, 'd mmm, yyyy')}</h2>
                  </div>
                </div>

                <div className='field-details'>
                  <p>Email</p>
                  <h2>{data?.email}</h2>
                </div>
                <div className='field-details'>
                  <p>Phone</p>
                  <h2>{data?.phone}</h2>
                </div>
                <div className='field-details'>
                  <p>Country</p>
                  <h2>{data?.country}</h2>
                </div>

                <button className='change-password-btn mt-2'>Change Password</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
