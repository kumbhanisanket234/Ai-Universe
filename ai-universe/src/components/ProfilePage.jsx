"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { getCookie } from '@/utils/cookies'
import axios from 'axios'
import { convert, ROOT_URL } from '@/utils/constant'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import countryList from '../utils/countryList.json'
import toast from 'react-hot-toast'

export default function ProfilePage() {
    const [open, setOpen] = useState(false)
    const contentRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false)
    const inputFile = useRef(null)
    const [myDevices, setMyDevices] = useState()
    const [deviceUpdate, setDeviceUpdate] = useState()
    const [isOpen, setIsOpen] = useState({
        updateProfile: false,
        recentlyDevice: false
    })
    const [loading, setLoading] = useState({
        pageLoading: false,
        myDeviceLoading: false,
        changePasswordLoading: false,
        editProfileLoading: false
    })
    const token = getCookie('token')
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

    const fetchMydevices = async () => {
        try {
            setLoading(prev => ({ ...prev, myDeviceLoading: true }))
            const res = await axios.get(`${ROOT_URL}/mydevices`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log("myDevices--------->", res)
            if (res?.data?.success) {
                setMyDevices(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(prev => ({ ...prev, myDeviceLoading: false }))
        }
    }
    useEffect(() => {
        fetchData()
        fetchMydevices()
    }, [])

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
                    headers: { Authorization: `Bearer ${token}` },
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

    const handleDeviceUpdate = (device) => {
        setDeviceUpdate(device)
        console.log("MyDevice------->", device)
    }
    return (
        <div className='p-5 dja'>
            <div className='w-full max-w-[1400px]'>
                <h1 className='text-[40px] text-[#cdff09] font-medium text-center'>My Profile</h1>
                <div className='flex justify-center w-full gap-5 mt-5'>
                    <div className='w-full max-w-[850px]'>
                        <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='dja gap-2'>
                                    <Image src={
                                        `data:image/png;base64,${data?.image}` ||
                                        '/images/profile.png'
                                    }
                                        alt='Profile'
                                        width={96}
                                        height={96}
                                        className='rounded-full object-cover cursor-pointer'
                                        onClick={() => {
                                            inputFile.current.click()
                                        }} />
                                    <input
                                        type='file'
                                        id='file'
                                        ref={inputFile}
                                        onChange={handleFileChange}
                                        className='hidden'
                                    />
                                    <div className='grid gap-1'>
                                        <h1 className='text-[20px] font-bold'> {data?.fullName}</h1>
                                        <p className='text-[14px] text-[#fff]/75'>Software Developer</p>
                                        <p className='border border-[#fff] p-1 w-[50%] rounded-[20px] text-center text-[10px]'>{myDevices?.length} Devices</p>
                                    </div>
                                </div>
                                <div className='w-full  max-w-[150px]'>
                                    <button
                                        className='p-2 rounded-xl border border-[#cdff09] transition-all hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full dja gap-2'
                                        onClick={() => { setOpen(true) }}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <div className='w-full grid gap-3'>
                                    <div className='grid gap-2'>
                                        <p className='text-[14px] opacity-50'>Email</p>
                                        <h1>{data?.email}</h1>
                                    </div>
                                    <div className='grid gap-2'>
                                        <p className='text-[14px] opacity-50'>Date of Birth</p>
                                        <h1>{data?.dob}</h1>
                                    </div>
                                </div>
                                <div className='w-full grid gap-3'>
                                    <div className='grid gap-2'>
                                        <p className='text-[14px] opacity-50'>Phone</p>
                                        <h1>{data?.phone || "+91 XXXXXXXXXX"}</h1>
                                    </div>
                                    <div className='grid gap-2'>
                                        <p className='text-[14px] opacity-50'>Gender</p>
                                        <h1>{data?.gender}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='w-full mt-5'>
                            <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5 h-fit'>
                                <div className='relative' onClick={() => { setIsOpen({ updateProfile: !isOpen.updateProfile }) }}>
                                    <h1 className='text-center text-[25px] text-[#cdff09]'>Update Your Device</h1>
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 ${isOpen.updateProfile ? "rotate-180" : ''}`}
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

                                <div
                                    ref={contentRef}
                                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out w-full grid gap-5"
                                    style={{
                                        maxHeight: isOpen.updateProfile ? `${contentRef.current?.scrollHeight}px` : "0px",
                                    }}
                                >
                                    <div className='flex gap-5 w-full mt-5'>
                                        <div className='w-full p-1'>

                                            <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Model Name</label>
                                            <input
                                                type='text'
                                                placeholder='Model Name'
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                name='fullName'
                                                // ref={inputsRef.fullName}
                                                value={deviceUpdate?.modelName}
                                                onChange={handleDeviceUpdate}
                                            />
                                        </div>
                                        <div className='w-full p-1'>
                                            <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Version</label>
                                            <input
                                                type='text'
                                                placeholder='Version'
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                name='fullName'
                                                // ref={inputsRef.fullName}
                                                value={deviceUpdate?.modelVersion}
                                                onChange={handleDeviceUpdate}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-5'>
                                        <div className='w-full p-1'>
                                            <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Owner Name</label>
                                            <input
                                                type='text'
                                                placeholder='Owner'
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                name='fullName'
                                                // ref={inputsRef.fullName}
                                                value={deviceUpdate?.owner}
                                                onChange={handleDeviceUpdate}
                                            />
                                        </div>
                                        <div className='w-full p-1'>
                                            <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Feature</label>
                                            <input
                                                type='text'
                                                placeholder='Feature'
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                name='fullName'
                                                // ref={inputsRef.fullName}
                                                value={deviceUpdate?.feature}
                                                onChange={handleDeviceUpdate}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className='w-full mt-5'>
                            <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5 h-fit' onClick={() => { setIsOpen({ recentlyDevice: !isOpen.recentlyDevice }) }}>
                                <div className='relative'>
                                    <h1 className='text-center text-[#cdff09] text-[25px]'>Recently Loggin</h1>
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 ${isOpen.recentlyDevice ? "rotate-180" : ''}`}
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
                            </div>
                        </div>

                    </div>
                    <div className='border border-[#cdff09] p-5 rounded-lg w-full max-w-[400px] max-h-[450px]'>
                        <div>
                            <h1 className='text-[#cdff09] text-[25px] font-medium'>Recently Added Devices</h1>
                        </div>
                        <div className='max-h-[450px] rounded-lg overflow-auto mt-5 grid gap-5'>
                            {
                                myDevices &&
                                myDevices.map((items, index) => (
                                    <div key={index}>
                                        <div className='dja bg-[#fff]/80 rounded-t-lg '>
                                            <div className='w-[300px] h-[250px] dja'>
                                                <Image src={`data:image/png;base64,${items?.image}` || "/images/feature.png"} width={200} height={200} alt='device' />
                                            </div>
                                        </div>
                                        <div className='bg-[#000] p-5 rounded-b-lg'>
                                            <div className='flex justify-between'>
                                                <h1 className='text-[20px] text-[#cdff09] font-bold' title='model name'>{items?.modelName}</h1>
                                                <h1 className='text-[20px] text-[#cdff09] font-bold' title='model Id'>#{items?.modelId}</h1>
                                            </div>
                                            <div className='flex justify-between mt-5'>
                                                <div className='grid gap-3'>
                                                    <div className='flex gap-2 items-center'>
                                                        <Image src="/images/model.svg" height={25} width={25} alt='user' />
                                                        <p className='text-[16px] opacity-75' title='model type'>{items?.modelType}</p>
                                                    </div>
                                                    <div className='flex gap-2 items-center'>
                                                        <Image src="/images/user.svg" height={25} width={25} alt='user' />
                                                        <p className='text-[16px] opacity-75' title='owner'>{items?.owner}</p>
                                                    </div>
                                                </div>
                                                <div className='grid gap-3'>
                                                    <div className='flex gap-2 items-center'>
                                                        <Image src="/images/version.svg" height={25} width={25} alt='version' />
                                                        <p className='text-[16px] opacity-75' title='version'>{items?.modelVersion}</p>
                                                    </div>
                                                    <div className='flex gap-2 items-center'>
                                                        <Image src="/images/calendar.svg" height={25} width={25} alt='calendar' />
                                                        <p className='text-[16px] opacity-75' title='registered date'>{items?.registerDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 items-center mt-5 '>
                                                <i className="fa-solid fa-rotate text-[#cdff09] text-[25px]"></i>
                                                <p className='text-[16px] opacity-75'>Last Update date: {items?.lastupdate || items?.registerDate}</p>
                                            </div>
                                            <div className='mt-5'>
                                                <button
                                                    className='p-2 rounded-xl border border-[#cdff09] hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full'
                                                    onClick={() => { handleDeviceUpdate(items) }}
                                                >Update</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-[#1A1A1A66] transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden p-5 sm:p-7 rounded-[20px] bg-[#000] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className='text-start'>
                                    <h1 className='text-center mb-6 text-[30px] text-[#cdff09]'>Edit Profile</h1>
                                    <div className='mb-6'>
                                        <input
                                            type='text'
                                            placeholder='Full Name'
                                            className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
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
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
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
                                            className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
                                        />
                                    </div>
                                    <div className='mb-6'>
                                        <input
                                            type='text'
                                            placeholder='Email'
                                            name='email'
                                            value={data?.email}
                                            disabled
                                            className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
                                        />
                                    </div>
                                    <div className='mb-6'>
                                        <div className='relative'>
                                            <select
                                                id='country'
                                                className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
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
                                                    className='w-full bg-[#121212] rounded-lg text-gray-100'
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
                                                    className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
                                                />
                                                {validations.oldpassword && (
                                                    <span className='error-message'>Old Password Required</span>
                                                )}
                                            </div>
                                            <div className='field-details mb-6'>
                                                <input
                                                    type='password'
                                                    placeholder='New Password'
                                                    name='newpassword'
                                                    value={oldNewPass.newpassword}
                                                    onChange={handlePassChange}
                                                    className='w-full p-3 rounded-lg text-gray-100 bg-[#121212]'
                                                />
                                                {validations.newpassword && (
                                                    <span className='error-message'>New Password Required</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <div className='mb-6'>
                                        <div className='relative bg-[#121212] rounded-[15px]'>
                                            <button
                                                className='w-full p-3 rounded-lg text-gray-100'
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
                                </div>

                                <div className='w-full heading-btn dja mt-3'>
                                    <button
                                        className='review-btn w-full'
                                        onClick={checkValidations}
                                    >
                                        {loading.editProfileLoading ? 'Loading...' : 'Update'}
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog >

            </div >
        </div >
    )
}
