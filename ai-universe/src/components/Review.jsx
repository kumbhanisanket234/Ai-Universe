'use client'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { EMAIL_REGEX, FULLNAME_REGEX, ROOT_URL } from '@/utils/constant'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';

export default function Review() {
  const [active, setActive] = useState(false)
  const [reviewsContainer, setReviewsContainer] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [add, setAdd] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    work: '',
    email: '',
    img: '',
    location: '',
    rating: null
  })

  const [validations, setValidations] = useState({
    name: false,
    description: false,
    work: false,
    email: false,
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

  useEffect(() => {
    axios
      .get(`${ROOT_URL}/reviews`)
      .then(res => setReviewsContainer(res.data.reviews))
      .catch(err => console.log(err))
  }, [add])

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
    const { name, description, work, email, img, location, rating } = formData

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
    if (!email.trim() || !EMAIL_REGEX.test(formData.email)) {
      setValidations(pre => ({ ...pre, email: true }))
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
    bodyData.append('email', formData?.email)
    bodyData.append('description', formData?.description)
    bodyData.append('image', formData?.img)
    bodyData.append('work', formData?.work)
    bodyData.append('location', formData?.location)
    // bodyData.append('rating', formData?.rating)


    try {
      const res = await axios.post(`${ROOT_URL}/reviews`, bodyData)
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setShowModal(false)
        setFormData(prev => ({
          ...prev,
          name: '',
          description: '',
          email: '',
          img: '',
          work: '',
          location: '',
          rating: 0
        }))
        setAdd(true)
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
                <button disabled>Customer Reviews</button>
              </div>
              <div className='contactus-heading dja mt-6'>
                <h1>What Our Client Say</h1>
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
                            {[...Array(5)].map((_, i) => (
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
                          <div className='dja'>
                            {/* <Image
                              src={
                                `data:image/png;base64,${data?.image}` || '/images/profile.png'
                              }
                              alt='Profile'
                              width={96}
                              height={96}
                              className='rounded-full object-cover cursor-pointer'
                            /> */}
                            <div>
                              <h3 className="text-lg font-semibold">{items.name}</h3>
                              <p className="text-sm text-gray-400">{items.work}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">{items.location}</p>

                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
            <div className="prenext-btn w-100 dja mt-[30px]">
              <button className="btn-previous btn btn-default aboutus_prev" id='btn-previous' onClick={handlePreviousBtn} style={active ? { backgroundColor: "#cdff09" } : { backgroundColor: "transparent", border: '1px solid white' }}><i className="fa-solid fa-arrow-left" style={active ? { color: "black" } : { color: "white" }}></i></button>
              <button className="btn-next btn btn-default aboutus_next" id='btn-next' onClick={handleNextBtn} style={!active ? { backgroundColor: "#cdff09" } : { backgroundColor: "transparent", border: '1px solid white' }}><i className="fa-solid fa-arrow-right" style={!active ? { color: "black" } : { color: "white" }}></i></button>
            </div>
          </div>
          <div className='heading-btn add-review dja mt-[30px]'>
            <button onClick={() => {
              setShowModal(true)
            }}>Add Review</button>
          </div>

          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false)
              setValidations({})
            }}
            centered
            className='otp-modal'
          >
            <Modal.Header>
              <div className='flex items-center justify-between w-100'>
                <h1 className='text-[20px]'>Add Reviews</h1>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setValidations({})
                  }}
                >
                  <i className="fa-solid fa-x close"></i>

                </button>
              </div>
            </Modal.Header>
            <Modal.Body>
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
                    placeholder='work'
                    value={formData.work}
                    onChange={handleChange}
                  />
                  {validations.work && (
                    <span className='error-message'>Work Required</span>
                  )}
                </div>
                <div>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {validations.email && (
                    <span className='error-message'>
                      {formData.email ? 'Invalid Email' : 'Email Required'}
                    </span>
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

              <div className='w-100 heading-btn dja mt-3'>
                <button
                  className='review-btn w-100'
                  onClick={checkValidations}
                >
                  Add
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>

    </div >
  )
}


