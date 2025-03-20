"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { getCookie, setCookie } from '@/utils/cookies'
import axios from 'axios'
import { convert, FULLNAME_REGEX, ROOT_URL, STRING_REGEX } from '@/utils/constant'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import countryList from '../utils/countryList.json'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loader from './Loader'
import TwoFAVarification from './Modals/TwoFAVerification'
import { X } from 'lucide-react'
import Disable2Fa from './Modals/Disable2Fa'

export default function ProfilePage() {
    const token = getCookie('token')
    const [open, setOpen] = useState(false)
    const contentRef = useRef(null);
    const inputFile = useRef(null)
    const [myDevices, setMyDevices] = useState()
    const [recentlyLogin, setRecentlyLogin] = useState()
    const router = useRouter()
    const [isOnTwoFA, setIsOnTwoFA] = useState(false)
    const [backupCode, setBackupCode] = useState("")
    const [twoFaLink, setTwoFaLink] = useState("")
    const [twoFAOpen, setTwoFAOpen] = useState(false)

    const [deviceUpdate, setDeviceUpdate] = useState({
        modelId: null,
        owner: "",
        modelType: "",
        modelName: "",
        modelVersion: "",
        modelHeight: "",
        modelWeight: "",
        manufactureName: "",
        feature: "",
        summary: "",
    })
    const [isOpen, setIsOpen] = useState({
        updateProfile: false,
        recentlyDevice: true
    })
    const [loading, setLoading] = useState({
        pageLoading: false,
        myDeviceLoading: false,
        changePasswordLoading: false,
        editProfileLoading: false,
        deviceUpdateLoading: false,
        recentlyLoading: false
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
        newpassword: false,
        owner: false,
        modelType: false,
        modelName: false,
        modelVersion: false,
        modelHeight: false,
        modelWeight: false,
        manufactureName: false,
        feature: false,
        summary: false,
    })

    const inputsRef = {
        fullName: useRef(),
        dob: useRef(),
        gender: useRef(),
        country: useRef(),
        newpassword: useRef(),
        owner: useRef(),
        modelType: useRef(),
        modelName: useRef(),
        modelVersion: useRef(),
        modelHeight: useRef(),
        modelWeight: useRef(),
        manufactureName: useRef(),
        feature: useRef(),
        summary: useRef(),
    }

    const [changePassword, setChangePassword] = useState(false)
    const [oldNewPass, setOldNewPass] = useState({
        oldpassword: '',
        newpassword: ''
    })

    const fetchProfileData = async () => {
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

    const fetchRecentLogin = async () => {
        try {
            setLoading((prev) => ({ ...prev, recentlyLoading: true }))
            const res = await axios.get(
                `${ROOT_URL}/recent_login`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res?.data?.success) {
                setRecentlyLogin(res?.data?.data)
            }
            console.log("Recent Login-------->", res)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading((prev) => ({ ...prev, recentlyLoading: false }))
        }
    }
    useEffect(() => {
        fetchProfileData()
        fetchMydevices()
        fetchRecentLogin()
    }, [twoFAOpen, isOnTwoFA])

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

    const checkEditProfileValidations = () => {
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
                setOpen(false)
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
                fetchProfileData()
                return
            }
            toast.error(res?.data?.error || 'Something went wrong')
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeviceUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name == 'modelName' && !FULLNAME_REGEX.test(value)) {
            return
        }
        if (name == 'modelVersion' && STRING_REGEX.test(value)) {
            return
        }
        if (name == 'owner' && !FULLNAME_REGEX.test(value)) {
            return
        }
        setDeviceUpdate((prev) => ({ ...prev, [name]: value }))
        setValidations(prev => ({ ...prev, [name]: false }))
    }

    const checkUpdateDeviceValidations = () => {
        const handleError = key => {
            setValidations(prev => ({ ...prev, [key]: true }))
            inputsRef[key].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            inputsRef[key].current?.focus()
        }

        if (!deviceUpdate.modelName.trim()) {
            setValidations(pre => ({ ...pre, modelName: true }))
            handleError('modelName')
            return
        }
        if (!deviceUpdate.modelVersion.trim()) {
            setValidations(pre => ({ ...pre, modelVersion: true }))
            handleError('modelVersion')
            return
        }
        if (!deviceUpdate.owner.trim()) {
            setValidations(pre => ({ ...pre, owner: true }))
            handleError('owner')
            return
        }
        if (!deviceUpdate.modelName.trim()) {
            setValidations(pre => ({ ...pre, modelName: true }))
            handleError('modelName')
            return
        }
        handleDeviceUpdate()
    }
    const handleDeviceUpdate = async () => {
        try {
            setLoading((prev) => ({ ...prev, deviceUpdateLoading: true }))
            const res = await axios.patch(`${ROOT_URL}/update_mydevice`, {},
                {
                    params: {
                        ...deviceUpdate,
                        image: undefined
                    }
                })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                fetchMydevices()
                return
            }
            toast.error(res?.data?.error || 'Something went wrong')

        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || 'Something went wrong')

        } finally {
            setLoading((prev) => ({ ...prev, deviceUpdateLoading: false }))
        }
    }

    const handleTwoFAChange = async (e) => {
        const { checked } = e.target
        if (checked) {
            setIsOnTwoFA(true)
            try {
                const res = await axios.post(`${ROOT_URL}/enable_2FA`, { email: data?.email })
                if (res?.data?.success) {
                    // toast.success(res?.data?.message)
                    console.log("Enable 2FA---->", res)
                    setTwoFaLink(res?.data?.otp_uri)
                    setBackupCode(res?.data?.secret)
                    return
                }
                toast.error(res?.data?.error || 'Something went wrong')
            } catch (err) {
                console.log(err)
                toast.error(err.response?.data?.message || 'Something went wrong')
            }
        }
        if (!checked) {
            setTwoFAOpen(true)
        }
    }

    return (
        <div className='p-5 dja hero-main'>
            <div className='shadow shadow-left hidden md:block'>

            </div>
            {
                loading.pageLoading ?
                    <Loader />
                    :

                    <div className='w-full max-w-[1400px] mt-10'>
                        <div className='dja '>
                            <div className='flex items-center justify-between max-w-[1250px] w-full'>
                                <button className='border border-[#cdff09] w-full max-w-[100px] rounded-[20px] py-2 hover:bg-[#cdff09] hover:text-[#000] font-semibold transition-all duration-300' onClick={() => { router.back() }}>Back</button>
                                <div className='w-full dja'>
                                    <h1 className='text-[25px] sm:text-[40px] text-[#cdff09] text-center w-[25%] border-b border-[#718524] pb-1 font-semibold'>My Profile</h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap sm:flex-nowrap justify-center w-full gap-10 mt-[60px]'>
                            <div className='w-full max-w-[850px]'>
                                <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5 bg-[#000]'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex items-center w-full gap-2'>
                                            <div className='flex rounded h-[90px] w-[90px]'>
                                                <Image
                                                    src={
                                                        data?.image ? `data:image/png;base64,${data?.image}` : '/images/profile.png'
                                                    }
                                                    alt='Profile'
                                                    width={90}
                                                    height={90}
                                                    className='rounded-full object-cover cursor-pointer'
                                                    onClick={() => {
                                                        inputFile.current.click()
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type='file'
                                                id='file'
                                                ref={inputFile}
                                                onChange={handleFileChange}
                                                className='hidden'
                                            />
                                            <div className='grid gap-1'>
                                                <h1 className='text-[14px] md:text-[15px] lg:text-[20px] font-bold'> {data?.fullName}</h1>
                                                <p className='text-[10px] md:text-[14px] text-[#fff]/75'>Software Developer</p>
                                                <p className='border border-[#fff] p-1 w-[50%] rounded-[20px] text-center text-[8px] md:text-[10px]'>{myDevices?.length} Devices</p>
                                            </div>
                                        </div>
                                        <div className='w-full grid gap-2 '>
                                            <div className='flex justify-end'>
                                                <button
                                                    className='p-2 max-w-[50px] lg:max-w-[150px] rounded-xl border border-[#cdff09] transition-all hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full dja gap-2'
                                                    onClick={() => { setOpen(true) }}
                                                >
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                    <p className='hidden lg:block'>Edit Profile</p>
                                                </button>
                                            </div>
                                            <label className='flex justify-end gap-2 cursor-pointer select-none items-center'>
                                                <h1 className='opacity-70'>2FA Varification</h1>
                                                <div className='relative'>
                                                    <input
                                                        type='checkbox'
                                                        checked={data?.is_2fa === 1}
                                                        onChange={handleTwoFAChange}
                                                        className='sr-only'
                                                    />
                                                    <div
                                                        className={`box block h-7 w-12 rounded-full ${data?.is_2fa === 1 ? 'bg-[#7c8f30]' : 'bg-[#3d4131]'}`}
                                                    ></div>
                                                    <div
                                                        className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${data?.is_2fa === 1 ? 'translate-x-full' : ''}`}
                                                    ></div>
                                                </div>
                                            </label>

                                        </div>
                                    </div>
                                    <div className='flex flex-wrap lg:flex-nowrap justify-between mt-5'>
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
                                                <h1>{data?.phone}</h1>
                                            </div>
                                            <div className='grid gap-2'>
                                                <p className='text-[14px] opacity-50'>Gender</p>
                                                <h1>{data?.gender}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='w-full mt-5'>
                                    <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5 h-fit bg-[#000]'>
                                        <div className='relative' onClick={() => { setIsOpen({ updateProfile: false, recentlyDevice: true }) }}>
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
                                            className="overflow-hidden transition-[max-height] duration-500 ease-in-out w-full grid gap-5"
                                            style={{
                                                maxHeight: isOpen.updateProfile ? `550px` : "0px",
                                            }}
                                        >
                                            <div className='flex gap-5 w-full mt-5'>
                                                <div className='w-full p-1'>

                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Model Name</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Model Name'
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='modelName'
                                                        ref={inputsRef.modelName}
                                                        value={deviceUpdate?.modelName}
                                                        onChange={handleDeviceUpdateChange}
                                                    />
                                                    {validations.modelName && (
                                                        <span className='error-message'>ModelName Required</span>
                                                    )}
                                                </div>
                                                <div className='w-full p-1'>
                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Version</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Version'
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='modelVersion'
                                                        ref={inputsRef.modelVersion}
                                                        value={deviceUpdate?.modelVersion}
                                                        onChange={handleDeviceUpdateChange}
                                                    />
                                                    {validations.modelVersion && (
                                                        <span className='error-message'>ModelVersion Required</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex gap-5'>
                                                <div className='w-full p-1'>
                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Owner Name</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Owner'
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='owner'
                                                        ref={inputsRef.owner}
                                                        value={deviceUpdate?.owner}
                                                        onChange={handleDeviceUpdateChange}
                                                    />
                                                    {validations.owner && (
                                                        <span className='error-message'>Owner Required</span>
                                                    )}
                                                </div>
                                                <div className='w-full p-1'>
                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Feature</label>
                                                    {/* <input
                                                        type='text'
                                                        placeholder='Feature'
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='feature'
                                                        ref={inputsRef.feature}
                                                        value={deviceUpdate?.feature}
                                                        onChange={handleDeviceUpdateChange}
                                                    /> */}
                                                    <textarea
                                                        id="w3review"
                                                        rows="1"
                                                        cols="50"
                                                        type='text'
                                                        placeholder='Feature'
                                                        className='w-full p-3 opacity-70 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='feature'
                                                        ref={inputsRef.feature}
                                                        value={deviceUpdate?.feature}
                                                        onChange={handleDeviceUpdateChange}
                                                    ></textarea>
                                                    {validations.feature && (
                                                        <span className='error-message'>Feature Required</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex gap-5 w-full'>
                                                <div className='w-full p-1'>

                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Model height</label>
                                                    <div className='relative'>
                                                        <input
                                                            type='text'
                                                            placeholder='Model Height'
                                                            className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                            name='modelHeight'
                                                            ref={inputsRef.modelHeight}
                                                            value={deviceUpdate?.modelHeight}
                                                            onChange={handleDeviceUpdateChange}
                                                        />
                                                        <div className='absolute right-3 top-[40%] transform -translate-y-1/2 mt-1'>
                                                            <p className='opacity-70'>cm</p>
                                                        </div>

                                                    </div>
                                                    {validations.modelHeight && (
                                                        <span className='error-message'>ModelHeight Required</span>
                                                    )}
                                                </div>
                                                <div className='w-full p-1'>
                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Model Weight</label>
                                                    <div className='relative'>
                                                        <input
                                                            type='text'
                                                            placeholder='model Weight'
                                                            className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                            name='modelWeight'
                                                            ref={inputsRef.modelWeight}
                                                            value={deviceUpdate?.modelWeight}
                                                            onChange={handleDeviceUpdateChange}
                                                        />
                                                        <div className='absolute right-3 top-[40%] transform -translate-y-1/2 mt-1'>
                                                            <p className='opacity-70'>kg</p>
                                                        </div>
                                                    </div>
                                                    {validations.modelWeight && (
                                                        <span className='error-message'>ModelWeight Required</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='flex gap-5 w-full'>
                                                <div className='w-full p-1'>
                                                    <label htmlFor="" className='text-[14px] opacity-60 pl-[10px]'>Summary</label>
                                                    {/* <input
                                                        type='text'
                                                        placeholder='Summary'
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='summary'
                                                        ref={inputsRef.summary}
                                                        value={deviceUpdate?.summary}
                                                        onChange={handleDeviceUpdateChange}
                                                    /> */}
                                                    <textarea
                                                        id="w3review"
                                                        rows="3"
                                                        cols="50"
                                                        type='text'
                                                        placeholder='Summary'
                                                        className='w-full p-3 opacity-70 rounded-lg text-gray-100 bg-[#121212] border border-transparent active:border-red-700 focus:!border-[#cdff09]'
                                                        name='summary'
                                                        ref={inputsRef.summary}
                                                        value={deviceUpdate?.summary}
                                                        onChange={handleDeviceUpdateChange}
                                                    >
                                                    </textarea>
                                                    {validations.summary && (
                                                        <span className='error-message'>Summary Required</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='dja'>
                                                <button
                                                    className='transition-all duration-300 p-2 rounded-xl border border-[#cdff09] hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full max-w-[300px]'
                                                    onClick={checkUpdateDeviceValidations}
                                                >{loading.deviceUpdateLoading ? 'Loading...' : 'Save Changes'}</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full mt-5'>
                                    <div className='w-full border border-[#cdff09] shadow-sm-[#cdff09] rounded-lg p-5 h-fit bg-[#000]'>
                                        <div className='relative'>
                                            <h1 className='text-center text-[#cdff09] text-[25px]'>Recently Login</h1>
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
                                        <div
                                            ref={contentRef}
                                            className="overflow-hidden transition-[max-height] duration-500 ease-in-out w-full grid gap-5"
                                            style={{
                                                maxHeight: isOpen.recentlyDevice ? `700px` : "0px",
                                            }}
                                        >
                                            {
                                                recentlyLogin?.map((items, index) => (
                                                    <div key={index} className='grid lg:grid-cols-2 items-center bg-[#171b06] rounded-lg p-5 mt-3'>
                                                        <div className='flex items-center gap-5'>
                                                            <div className='h-[50px] w-[50px] rounded-[50%] dja'>
                                                                <i className="fa-brands fa-windows  text-[#cdff09] text-[45px]"></i>
                                                                {/* <i className="fa-solid fa-laptop text-[#cdff09] text-[45px]"></i> */}
                                                            </div>
                                                            <div>
                                                                <h1>{items?.os},{items?.deviceType}</h1>
                                                                <h1>{items?.city},{items?.regionName} - {items?.zip}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center gap-5'>
                                                            <div className='h-[50px] w-[50px] rounded-[50%] dja'>
                                                                <i className="fa-brands fa-chrome text-[#cdff09] text-[45px]"></i>
                                                            </div>
                                                            <div>
                                                                <h1>{items?.browser}</h1>
                                                                <h1 title='ip address'>{items?.ip}</h1>
                                                                <h1>{items?.loginDate} {items?.loginTime}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='border border-[#cdff09] p-5 rounded-lg w-full sm:max-w-[400px] h-fit max-h-[900px] overflow-auto bg-[#000] relative z-10'>
                                <div>
                                    <h1 className='text-[#cdff09] text-[25px] font-medium'>Recently Added Devices</h1>
                                </div>
                                <div className='rounded-lg  mt-3 grid gap-5'>
                                    {
                                        myDevices?.length > 0 ?
                                            myDevices.map((items, index) => (
                                                <div key={index} className='border border-[#cdff09] rounded-lg'>
                                                    <div className="bg-[#242b0b] rounded-t-lg flex justify-center h-[300px]">
                                                        <Image
                                                            src={
                                                                `data:image/png;base64,${items?.image}`
                                                                // '/images/feature.png'
                                                            }
                                                            alt='device'
                                                            width={300}
                                                            height={300}
                                                            style={{ objectFit: 'contain' }}
                                                        />
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
                                                                    <p className='text-[16px] opacity-75' title='registered date'>{items?.registerDate?.split("T")[0]}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2 items-center mt-5'>
                                                            <i className="fa-solid fa-rotate text-[#cdff09] text-[25px]"></i>
                                                            <p className='text-[16px] opacity-75'>Last Update date: {items?.lastupdate || items?.registerDate?.split("T")[0]}</p>
                                                        </div>
                                                        <div className='flex gap-2 items-center mt-5 bg-[#242b0b] p-2 rounded-md w-fit'>
                                                            <p className='text-[16px] opacity-75'>KYC : {items?.kyc ? "Verified" : 'Pending'}</p>
                                                        </div>
                                                        <div className='mt-5'>
                                                            <button
                                                                className='p-2 rounded-xl border border-[#cdff09] hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full'
                                                                onClick={() => { setCookie("modelId", items?.modelId); router.push("/kyc") }}
                                                            >Kyc</button>
                                                        </div>
                                                        <div className='mt-5'>
                                                            <button
                                                                className='p-2 rounded-xl border border-[#cdff09] hover:border-[#000] hover:bg-[#cdff09] hover:text-[#000] font-bold text-[14px] w-full'
                                                                onClick={() => { setDeviceUpdate(items), setIsOpen({ updateProfile: true }) }}
                                                            >Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <div>
                                                <h1 className='text-center text-[25px]'>No Device Found</h1>
                                                <button className='w-full mt-5 py-3 border border-[#cdff09] rounded-lg hover:bg-[#cdff09] hover:text-black font-semibold transition-all duration-300'
                                                    onClick={() => { router.push('/register-ai') }}
                                                >Add Now</button>
                                            </div>
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
                                            <div className='flex items-center mb-6'>
                                                <h1 className='text-center text-[30px] text-[#cdff09] w-full'>Edit Profile</h1>
                                                <button onClick={() => { setOpen(false) }}><i className="fa-solid fa-x text-[#cdff09]"></i></button>
                                            </div>
                                            <div className='mb-6'>
                                                <input
                                                    type='text'
                                                    placeholder='Full Name'
                                                    className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] border border-transparent focus:!border-[#cdff09]'
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
                                                        className='w-full p-3 rounded-lg text-gray-100 bg-[#121212] opacity-60'
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
                                                        className='w-full p-3 rounded-lg text-gray-100 opacity-60 bg-[#121212]'
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
                                                onClick={checkEditProfileValidations}
                                            >
                                                {loading.editProfileLoading ? 'Loading...' : 'Update'}
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog >
                        <Dialog open={isOnTwoFA} onClose={setIsOnTwoFA} className="relative z-10">
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
                                        <div className="flex items-center justify-between">
                                            <div className='dja w-full'>
                                                <h1 className='text-[30px] text-[#cdff09] text-center'>Scan Code</h1>
                                            </div>
                                            <button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setIsOnTwoFA(false) }}>
                                                <X className="h-7 w-7" />
                                            </button>
                                        </div>
                                        <TwoFAVarification setIsOnTwoFA={setIsOnTwoFA} email={data?.email} twoFaLink={twoFaLink} backupCode={backupCode} />
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>

                    </div >
            }
            <Disable2Fa twoFAOpen={twoFAOpen} setTwoFAOpen={setTwoFAOpen} email={data?.email} />

            <div className='shadow shadow-right hidden md:block'>

            </div>
        </div >
    )
}
