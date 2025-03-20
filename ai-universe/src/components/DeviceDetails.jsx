'use client'
import { ROOT_URL } from '@/utils/constant'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { colorCode } from '@/utils/colorCode'
import Loader from './Loader'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import ProductMoreDetails from './Modals/ProductMoreDetails'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/utils/cookies'

export default function DeviceDetails() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [openMoreDetails, setOpenMoreDetails] = useState(false)
    const [moreDetails, setMoreDetails] = useState()
    const router = useRouter();
    const [premiumUser, setPremiumUser] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${ROOT_URL}/register_ai`)
            setData(res?.data?.data)
        }
        catch (err) {
            console.log(err)
            toast.error(err?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const fetchPremiumUser = async () => {
        try {
            const res = await axios.get(`${ROOT_URL}/premium_user`, {
                headers: {
                    'Authorization': `Bearer ${getCookie("token")}`
                }
            })

            if (res?.data?.success) {
                setPremiumUser(true)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPremiumUser()
        fetchData();
    }, [])

    const handleMoreDetails = (items) => {
        if (premiumUser) {
            setMoreDetails(items)
            setOpenMoreDetails(true)
        }else{
            toast.error("Get Premium For Access More Details")
            router.push("/premium")
        }
    }

    return (
        <div>
            <div className="review-container md:px-5 px-4">
                {
                    loading ?
                        <div className='dja h-screen'>
                            <Loader />
                        </div>
                        :
                        <>
                            {
                                data?.length > 0 ?
                                    <>

                                        <div className="review-heading">
                                            <div className='dja mt-6'>
                                                <h1 className='text-[40px] text-[#cdff09]'>Explore All Registered Devices</h1>
                                            </div>
                                        </div>
                                        {/* <div className='flex justify-end w-full mt-5'>
                                            <input type="search" name="" id="" className='bg-[#455018] p-2  w-full max-w-[400px] rounded-lg' />
                                        </div> */}
                                        <div className='flex justify-start w-full mt-5'>
                                            <button className='border border-[#cdff09] w-full max-w-[100px] rounded-[20px] py-2 hover:bg-[#cdff09] hover:text-[#000] font-semibold transition-all duration-300' onClick={() => { router.back() }}>Back</button>

                                        </div>
                                        <div className='dja w-full'>

                                            <div className="gap-20 mt-[36px] grid  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full device-card-container">
                                                {

                                                    data?.map((items, index) => {
                                                        return (
                                                            <div key={index} className="bg-[#11151d] p-5 text-white shadow-lg border border-[#cdff09] rounded-md w-full">
                                                                <div className="bg-[#242b0b] border border-[#cdff09] rounded-md flex justify-center h-[350px]">
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
                                                                <div className=' flex justify-between w-full mt-3'>
                                                                    <h1 className='text-[20px] text-[#cdff09] font-medium' title='Model Name'>{items?.modelName}</h1>
                                                                    <p className='text-[20px] text-[#cdff09] font-medium' title='Model Id'>#{items?.modelId}</p>
                                                                </div>
                                                                <p className='text-[16px] opacity-50' title='Model Type'>{items?.modelType}</p>
                                                                <div className='flex justify-between items-center mt-3'>
                                                                    <div className='grid gap-2'>
                                                                        <div className='flex items-center gap-2 w-full'>
                                                                            <div className='w-[20px] h-[20px]'>
                                                                                <Image src="/images/user.svg" height={20} width={20} alt='owner' />
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-[14px] opacity-50'>Owner</p>
                                                                                <p className='text-[14px]'>{items?.owner}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex items-center gap-2 w-full'>
                                                                            <div className='w-[20px] h-[20px]'>
                                                                                <Image src="/images/calendar.svg" height={20} width={20} alt='owner' />
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-[14px] opacity-50'>Register Date</p>
                                                                                <p className='text-[14px]'>{items?.registerDate?.split("T")[0]}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='grid gap-2'>
                                                                        <div className='flex items-center gap-2 w-full'>
                                                                            <div className='h-[20px] w-[20px]'>
                                                                                <Image src="/images/user.svg" height={20} width={20} alt='owner' />
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-[14px] opacity-50'>Manufacturer</p>
                                                                                <p className='text-[14px]'>{items?.manufactureName}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex items-center gap-2 w-full'>
                                                                            <div className='h-[20px] w-[20px]'>
                                                                                <Image src="/images/version.svg" height={20} width={20} alt='Version' />
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-[14px] opacity-50'>Version</p>
                                                                                <p className='text-[14px]'>{items?.modelVersion}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=' mt-3 bg-[#242b0b] border border-[#cdff09] rounded-md'>
                                                                    <div className='dja w-full'>
                                                                        <button className='gap-2 text-[14px] p-2 rounded-md w-full font-semibold'
                                                                            onClick={() => { handleMoreDetails(items) }}
                                                                        >
                                                                            More Details
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <Dialog open={openMoreDetails} onClose={setOpenMoreDetails} className="relative z-10">
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
                                                        <ProductMoreDetails setOpenMoreDetails={setOpenMoreDetails} moreDetails={moreDetails} />
                                                    </DialogPanel>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </> :
                                    <div className='dja h-screen'>
                                        <h1 className='text-[40px] text-[#cdff09]'>Data Not Found</h1>
                                    </div>


                            }
                        </>


                }

            </div>
        </div>
    )
}
