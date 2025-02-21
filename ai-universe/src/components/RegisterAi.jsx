'use client'
import { EMAIL_REGEX, PHONE_REGEX, ROOT_URL } from '@/utils/constant'
import { getCookie, setCookie } from '@/utils/cookies'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function RegisterAi() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const token = getCookie("token");

    const inputsRef = {
        owner: useRef(),
        modelName: useRef(),
        modelType: useRef(),
        modelVersion: useRef(),
        modelHeight: useRef(),
        modelWeight: useRef(),
        manufactureName: useRef(),
        feature: useRef(),
        summary: useRef(),
        image: useRef(),
    }

    const [formData, setFormData] = useState({
        owner: '',
        modelName: '',
        modelType: '',
        modelVersion: '',
        modelHeight: '',
        modelWeight: '',
        manufactureName: '',
        feature: '',
        summary: '',
        image: ''
    })

    const [validations, setValidations] = useState({
        owner: false,
        modelName: false,
        modelType: false,
        modelVersion: false,
        modelHeight: false,
        modelWeight: false,
        manufactureName: false,
        feature: false,
        summary: false,
        image: false
    })

    const handleChange = e => {
        const { name, value } = e.target

        setFormData(pre => ({ ...pre, [name]: value }))
        setValidations(pre => ({ ...pre, [name]: false }))
    }

    const handleFileChange = e => {
        if ([...e.target.files].filter(file => file.type === "image/png") == "") {
            setValidations(pre => ({ ...pre, image: true }))
        }
        else{
            setValidations((prev) => ({ ...prev, image: false }))
        }
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
    }

    const bodyData = new FormData()
    bodyData.append('owner', formData?.owner)
    bodyData.append('modelName', formData?.modelName)
    bodyData.append('modelType', formData?.modelType)
    bodyData.append('modelVersion', formData?.modelVersion)
    bodyData.append('modelHeight', formData?.modelHeight)
    bodyData.append('modelWeight', formData?.modelWeight)
    bodyData.append('manufactureName', formData?.manufactureName)
    bodyData.append('feature', formData?.feature)
    bodyData.append('summary', formData?.summary)
    bodyData.append('image', formData?.image)

    const checkValidations = () => {
        const handleError = key => {
            setValidations(prev => ({ ...prev, [key]: true }))
            inputsRef[key].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            inputsRef[key].current?.focus()
        }

        if (!formData.owner.trim()) {
            setValidations(pre => ({ ...pre, owner: true }))
            handleError('owner')
            return
        }

        if (!formData.modelName.trim()) {
            setValidations(pre => ({ ...pre, modelName: true }))
            handleError('modelName')
            return
        }

        if (!formData.modelType.trim()) {
            setValidations(pre => ({ ...pre, modelType: true }))
            handleError('modelType')
            return
        }

        if (!formData.modelVersion.trim()) {
            setValidations(pre => ({ ...pre, modelVersion: true }))
            handleError('modelVersion')
            return
        }

        if (!formData.modelHeight.trim()) {
            setValidations(pre => ({ ...pre, modelHeight: true }))
            handleError('modelHeight')
            return
        }

        if (!formData.modelWeight.trim()) {
            setValidations(pre => ({ ...pre, modelWeight: true }))
            handleError('modelWeight')
            return
        }

        if (!formData.manufactureName.trim()) {
            setValidations(pre => ({ ...pre, manufactureName: true }))
            handleError('manufactureName')
            return
        }

        if (!formData.feature.trim()) {
            setValidations(pre => ({ ...pre, feature: true }))
            handleError('feature')
            return
        }

        if (!formData.summary.trim()) {
            setValidations(pre => ({ ...pre, summary: true }))
            handleError('summary')
            return
        }

        if (!formData.image || validations.image) {
            setValidations(pre => ({ ...pre, image: true }))
            handleError('image')
            return
        }
        
        onSubmit()
    }

    const onSubmit = async () => {
        if (loading) return
        try {
            setLoading(true)
            const res = await axios.post(
                `${ROOT_URL}/register_ai`, bodyData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (res?.data?.success) {
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

    return (
        <div className='contact-main flex items-center justify-center'>
            <div className='flex justify-center items-center gap-[100px]'>
                <div>
                    <div className='heading-btn'>
                        <button className='hover:bg-[#cdff09] hover:text-[#000] font-semibold transition-all duration-300' onClick={() => { router.back() }}>Back</button>
                    </div>
                    <div className='contactus-heading mt-6'>
                        <h1>Welcome to <br />Ai-Universe</h1>
                        <p className='mt-4'>Register Your Ai  </p>
                        <p>Easily register your AI devices, integrate essential tools, and start managing your AI-powered devices securely. AI Universe simplifies the process, ensuring seamless device registration, real-time monitoring, and complete ownership verification.
                        </p>
                    </div>
                </div>
                <div className='contact-form-container signup-form-container'>
                    <div className='contact-form-heading'>
                        <h1>Welcome to Ai-Universe</h1>
                        <p>Register Your Ai</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='contact-form mt-3'>
                            <div className='mt-2'>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        placeholder='Owner Name'
                                        ref={inputsRef.owner}
                                        name='owner'
                                        value={formData.owner}
                                        onChange={handleChange}
                                    />
                                    {validations.owner && (
                                        <span className='error-message'>Owner Name Required</span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        placeholder='Device Name'
                                        ref={inputsRef.modelName}
                                        name='modelName'
                                        value={formData.modelName}
                                        onChange={handleChange}
                                    />
                                    {validations.modelName && (
                                        <span className='error-message'>Model Name Required</span>
                                    )}
                                </div>

                                <div className='mt-2'>
                                    <div className='relative m-0'>
                                        <select
                                            ref={inputsRef.modelType}
                                            id='modelType'
                                            name='modelType'
                                            onChange={handleChange}
                                            value={formData.modelType}
                                        >
                                            <option value=''>Select your Model Type</option>
                                            <option value='robot'>Robot</option>
                                            <option value='autocar'>Auto Car</option>
                                            <option value='other'>Other</option>
                                        </select>
                                        <div className='absolute right-3 top-[30%] transform -translate-y-1/2 mt-1'>
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
                                    {validations.modelType && (
                                        <span className='error-message'>Model Type Required</span>
                                    )}
                                </div>
                                <div className='mt-2'>

                                    <input
                                        type='text'
                                        placeholder='Model Version'
                                        ref={inputsRef.modelVersion}
                                        name='modelVersion'
                                        value={formData.modelVersion}
                                        onChange={handleChange}
                                    />

                                    {validations.modelVersion && (
                                        <span className='error-message'>Model Version Required</span>
                                    )}
                                </div>

                                <div className='mt-2 '>
                                    <div className='m-0 relative'>
                                        <input
                                            type='text'
                                            placeholder='Model Height'
                                            ref={inputsRef.modelHeight}
                                            name='modelHeight'
                                            value={formData.modelHeight}
                                            onChange={handleChange}
                                        />
                                        <div className='absolute right-3 top-[30%] transform -translate-y-1/2 mt-1'>
                                            <p className='opacity-70'>cm</p>
                                        </div>
                                    </div>
                                    {validations.modelHeight && (
                                        <span className='error-message'>Model Height Required</span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <div className='relative m-0'>
                                        <input
                                            type='text'
                                            placeholder='Model Weight'
                                            ref={inputsRef.modelWeight}
                                            name='modelWeight'
                                            value={formData.modelWeight}
                                            onChange={handleChange}
                                        />
                                        <div className='absolute right-3 top-[30%] transform -translate-y-1/2 mt-1'>
                                            <p className='opacity-70'>kg</p>
                                        </div>
                                    </div>
                                    {validations.modelWeight && (
                                        <span className='error-message'>Model Weight Required</span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        placeholder='Manufacture Company Name'
                                        ref={inputsRef.manufactureName}
                                        name='manufactureName'
                                        value={formData.manufactureName}
                                        onChange={handleChange}
                                    />
                                    {validations.manufactureName && (
                                        <span className='error-message'>Manufacture Name Required</span>
                                    )}
                                </div>

                                <div className='mt-2'>
                                    <input
                                        type='text'
                                        placeholder='Features'
                                        ref={inputsRef.feature}
                                        name='feature'
                                        value={formData.feature}
                                        onChange={handleChange}
                                    />
                                    {validations.feature && (
                                        <span className='error-message'>Feature Required</span>
                                    )}
                                </div>

                                <div className='mt-2'>
                                    <textarea
                                        id='message'
                                        placeholder='Summary'
                                        rows='3'
                                        cols='50'
                                        ref={inputsRef.summary}
                                        name='summary'
                                        value={formData.summary}
                                        onChange={handleChange}
                                    ></textarea>
                                    {validations.summary && (
                                        <span className='error-message'>Summary Required</span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <input
                                        type='file'
                                        accept='image/png'
                                        id='file'
                                        ref={inputsRef.image}
                                        onChange={handleFileChange}
                                        className='m-0'
                                    />
                                    {validations.image && (
                                        <span className='error-message'>{formData.image ? "Image type must be png" :"Image Required"}</span>
                                    )}
                                </div>
                                <div className='contact-submit-div'>
                                    <button className='contact-submit-btn w-100' onClick={checkValidations}>
                                        {loading ? 'Loading...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
