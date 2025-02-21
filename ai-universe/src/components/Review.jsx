'use client'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FULLNAME_REGEX, ROOT_URL } from '@/utils/constant'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { getCookie } from '@/utils/cookies'


export default function Review() {
  const [active, setActive] = useState(false)
  const [reviewsContainer, setReviewsContainer] = useState([])
  const token = getCookie('token');
  const [open, setOpen] = useState(false)
  const [add, setAdd] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    work: '',
    email: '',
    img: null,
    location: '',
    rating: null
  })

  const [validations, setValidations] = useState({
    name: false,
    description: false,
    work: false,
    img: false,
    location: false,
    rating: false
  })

  const swiperRef = useRef(null);
  const handleNextBtn = () => {
    swiperRef.current.swiper.slideNext();
    setActive(false)

  };

  const handlePreviousBtn = () => {
    swiperRef.current.swiper.slidePrev();
    setActive(true)

  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${ROOT_URL}/reviews`)
      if (res?.data?.success) {
        setReviewsContainer(res?.data?.reviews)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'name' && !FULLNAME_REGEX.test(value)) {
      return
    }
    setFormData(pre => ({ ...pre, [name]: value }))
    setValidations(pre => ({ ...pre, [name]: false }))
  }

  const handleFileChange = e => {
    setFormData(pre => ({
      ...pre,
      img: e.target.files[0]
    }))
    setValidations(pre => ({ ...pre, img: false }))
  }

  const handleRating = (index) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 })), setValidations((prev) => ({ ...prev, rating: false }))
  }

  const checkValidations = () => {
    const { name, description, work, img, location, rating } = formData

    if (!name) {
      setValidations(pre => ({ ...pre, name: true }))
      return
    }
    if (!description) {
      setValidations(pre => ({ ...pre, description: true }))
      return
    }
    if (!work) {
      setValidations(pre => ({ ...pre, work: true }))
      return
    }
    if (!img) {
      setValidations(pre => ({ ...pre, img: true }))
      return
    }
    if (!location) {
      setValidations(pre => ({ ...pre, location: true }))
      return
    }
    if (!rating) {
      setValidations(pre => ({ ...pre, rating: true }))
      return
    }

    onSubmit()
  }

  const onSubmit = async () => {
    const bodyData = new FormData()
    bodyData.append('name', formData?.name)
    bodyData.append('description', formData?.description)
    bodyData.append('image', formData?.img)
    bodyData.append('work', formData?.work)
    bodyData.append('location', formData?.location)
    bodyData.append('rating', formData?.rating)

    try {
      const res = await axios.post(`${ROOT_URL}/reviews`,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setOpen(false)
        // setFormData(prev => ({
        //   ...prev,
        //   name: '',
        //   description: '',
        //   img: '',
        //   work: '',
        //   location: '',
        //   rating: 0
        // }))
        fetchReviews()
        return
      }

      toast.error(res?.data?.error)
      return
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }


  return (
    <div className='review-main'>
      <div className='review'>
        <div>
          <div className="review-container">
            <div className="review-heading">
              <div className='heading-btn dja'>
                <button disabled>User Reviews</button>
              </div>
              <div className='contactus-heading dja mt-6'>
                <h1>What Our User Say</h1>
              </div>
            </div>

            <div className="Plans-boxes gap-3 mt-[56px]">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                className="mySwiper"
                navigation={{
                  nextEl: ".aboutus_next",
                  prevEl: ".aboutus_prev",
                }}
                ref={swiperRef}
                pagination={false}
              >
                {
                  reviewsContainer?.map((items, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="bg-[#18181D] text-white p-6 rounded-[30px] shadow-lg text-left">
                          <div className="text-[#CDFF09] text-2xl mb-4">
                            <i className="fas fa-quote-left"></i>
                          </div>
                          <p className="text-lg font-medium mb-4">
                            {items.description}
                          </p>
                          <div className="flex items-center mb-4">
                            {[...Array(items.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-6 h-6 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.575-.955L10 .5l2.935 5.455 6.575.955-4.755 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <div className='flex gap-4'>
                            <div className='flex rounded h-[50px] w-[50px]'>
                              <Image
                                src={
                                  `data:image/png;base64,${items?.image}` || '/images/profile.png'
                                }
                                alt='Profile'
                                width={50}
                                height={50}
                                className='rounded-full object-cover'
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{items.name}</h3>
                              <p className="text-sm text-gray-400">{items.work}</p>
                              <p className="text-sm text-gray-400">{items.location}</p>
                            </div>
                          </div>

                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
            <div className="prenext-btn w-full dja mt-[30px]">
              <button className="btn-previous btn btn-default aboutus_prev" id='btn-previous' onClick={handlePreviousBtn} style={active ? { backgroundColor: "#cdff09" } : { backgroundColor: "transparent", border: '1px solid white' }}><i className="fa-solid fa-arrow-left" style={active ? { color: "black" } : { color: "white" }}></i></button>
              <button className="btn-next btn btn-default aboutus_next" id='btn-next' onClick={handleNextBtn} style={!active ? { backgroundColor: "#cdff09" } : { backgroundColor: "transparent", border: '1px solid white' }}><i className="fa-solid fa-arrow-right" style={!active ? { color: "black" } : { color: "white" }}></i></button>
            </div>
          </div>
          <div className='heading-btn add-review dja mt-[30px]'>
            <button onClick={() => {
              setOpen(true)
            }}>Add Review</button>
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
                  <h1 className='text-[30px] text-[#cdff09] text-center'>Add Your Review</h1>
                  <div className='text-start contact-form'>
                    <div>
                      <input
                        type='text'
                        className='form-control'
                        name='name'
                        placeholder='Full Name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {validations.name && (
                        <span className='error-message'>Full Name Required</span>
                      )}
                    </div>
                    <div>
                      <input
                        type='text'
                        className='form-control'
                        name='description'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {validations.description && (
                        <span className='error-message'>Description Required</span>
                      )}
                    </div>
                    <div>
                      <input
                        type='text'
                        className='form-control'
                        name='work'
                        placeholder='occupation'
                        value={formData.work}
                        onChange={handleChange}
                      />
                      {validations.work && (
                        <span className='error-message'>Work Required</span>
                      )}
                    </div>
                    <div>
                      <input
                        type='file'
                        id='img'
                        className='form-control'
                        name='img'
                        defaultValue={formData.img}
                        onChange={handleFileChange}
                      />
                      {validations.img && (
                        <span className='error-message'>Image Required</span>
                      )}
                    </div>
                    <div>
                      <input
                        type='text'
                        className='form-control'
                        name='location'
                        placeholder='Location'
                        value={formData.location}
                        onChange={handleChange}
                      />
                      {validations.location && (
                        <span className='error-message'>Location Required</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-6 h-6 cursor-pointer ${formData.rating >= index + 1 ? `text-yellow-400` : `text-transparent-400`} `}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={() => { handleRating(index) }}
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.575-.955L10 .5l2.935 5.455 6.575.955-4.755 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      {validations.rating && (
                        <span className='error-message'>Rating Required</span>
                      )}
                    </div>
                  </div>

                  <div className='w-full heading-btn dja mt-3'>
                    <button
                      className='review-btn w-full'
                      onClick={checkValidations}
                    >
                      Add
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>

        </div>
      </div>

    </div >
  )
}


