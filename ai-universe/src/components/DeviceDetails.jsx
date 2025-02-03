'use client'
import { ROOT_URL } from '@/utils/constant'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {colorCode} from '@/utils/colorCode'

export default function DeviceDetails() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

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

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className="review-container md:px-5 px-4">
                <div className="review-heading">
                    <div className='contactus-heading dja mt-6'>
                        <h1>Explore All Registered Devices</h1>
                    </div>
                </div>

                <div className='dja '>

                    <div className="Plans-boxes gap-3 mt-[56px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full device-card-container">
                        {

                            data?.map((items, index) => {
                                return (
                                    <div className="bg-[#11151d] text-white shadow-lg text-left device-card" key={index}>
                                        <div className={`device-image-container flex justify-center `} style={{backgroundColor:`${colorCode[index]}`}}>
                                            <Image
                                                src={
                                                    `data:image/png;base64,${items?.image}`
                                                    // '/images/feature.png'
                                                }
                                                alt='device'    
                                                width={200}
                                                height={200}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className='bg-[#000] flex justify-between w-100 p-3'>
                                            <p>{items?.modelName}</p>
                                            <p>{items?.modelId}</p>
                                        </div>
                                        <div className='p-3 flex justify-between items-center'>
                                            <p>{items?.owner} </p>
                                            <p className='text-[10px] opacity-70'></p>
                                        </div>
                                        <div className='p-3'>
                                            <p>{items?.feature}</p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
