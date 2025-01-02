'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { EMAIL_REGEX, FULLNAME_REGEX, ROOT_URL } from '@/utils/constant'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
// import reviewsContainer from '../utils/reviewContainer.json'

function Review () {
  const [newIndex, setNewIndex] = useState(0)
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
    location: ''
  })

  const [validations, setValidations] = useState({
    name: false,
    description: false,
    work: false,
    email: false,
    img: false,
    location: false
  })

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
    console.log(e.target.files)
    setFormData(pre => ({
      ...pre,
      img: e.target.files[0]
    }))
    setValidations(pre => ({ ...pre, img: false }))
    console.log(formData.img)
  }

  const handleNextBtn = () => {
    setNewIndex(prev => prev + 1)
    setActive(false)
  }

  const handlePreviousBtn = () => {
    setNewIndex(prev => prev - 1)
    setActive(true)
  }

  const checkValidations = () => {
    const { name, description, work, email, img, location } = formData

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

    try {
      const res = await axios.post(`${ROOT_URL}/reviews`, bodyData)
      if (res?.data?.error) {
        toast.error(res?.data?.error)
        return
      }

      toast.success(res?.data?.message)
      setShowModal(false)
      setFormData(prev => ({
        ...prev,
        name: '',
        description: '',
        email: '',
        img: '',
        location: '',
        work: ''
      }))
      setAdd(true)
      return
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleClose = () => {
    setShowModal(false),
      setFormData(prev => ({
        ...prev,
        name: '',
        description: '',
        work: '',
        email: '',
        img: '',
        location: ''
      }))
  }

  return (
    <div className='About dja' id='about'>
      <div className='container dja About-containAll'>
        <div className='row align-items-center'>
          <div className='col-lg-6 col-md-12 About-heading'>
            <h1>
              What people say <br />
              <span className='text-[#c769ee]'>about Us.</span>
            </h1>
            <p>
              Our Users send us bunch of smilies with our services and we love
              them.
            </p>
            <div className='prenext-btn justify-content-center d-flex'>
              <button
                className='btn-previous'
                id='btn-previous'
                disabled={newIndex <= 0}
                style={
                  active
                    ? { backgroundColor: '#c769ee' }
                    : { backgroundColor: 'white' }
                }
                onClick={handlePreviousBtn}
              >
                <i className='fa-solid fa-arrow-left text-black'></i>
              </button>
              <button
                className='btn-next'
                id='btn-next'
                disabled={newIndex >= reviewsContainer?.length - 1}
                style={
                  !active
                    ? { backgroundColor: '#c769ee' }
                    : { backgroundColor: 'white' }
                }
                onClick={handleNextBtn}
              >
                <i className='fa-solid fa-arrow-right text-black'></i>
              </button>
            </div>
          </div>

          <div className='col-lg-6 col-md-12'>
            <div className='About-client1'>
              {reviewsContainer?.[newIndex]?.image && (
                <img src={reviewsContainer?.[newIndex]?.image} alt='profile' />
              )}
              <div className='About-review'>
                <div>
                  <p className='About-description'>
                    “{reviewsContainer?.[newIndex]?.description}”
                  </p>
                </div>
                <div>
                  <p className='username'>
                    {reviewsContainer?.[newIndex]?.name}
                  </p>
                  <p className='userlocation'>
                    {reviewsContainer?.[newIndex]?.location}
                  </p>
                </div>
              </div>
              {reviewsContainer?.length - 1 > newIndex && (
                <div className='About-client2'>
                  <p className='username'>
                    {reviewsContainer?.[newIndex + 1]?.name}
                  </p>
                  <p className='userdetail'>
                    {reviewsContainer?.[newIndex + 1]?.work}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='dja mt-5'>
          <button
            className='btn btn-default review-btn'
            id='btn-discover'
            onClick={() => {
              setShowModal(true)
            }}
          >
            Add Review
          </button>
        </div>

        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false)
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
                }}
              >
                <Image
                  src='/images/close.png'
                  height={30}
                  width={30}
                  alt='close'
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className='text-start'>
              <div>
                Name:
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
                {validations.name && (
                  <span className='error-message'>Name Required</span>
                )}
              </div>
              <div>
                Description:
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                />
                {validations.description && (
                  <span className='error-message'>Description Required</span>
                )}
              </div>
              <div>
                Work:
                <input
                  type='text'
                  className='form-control'
                  name='work'
                  value={formData.work}
                  onChange={handleChange}
                />
                {validations.work && (
                  <span className='error-message'>Work Required</span>
                )}
              </div>
              <div>
                Email:
                <input
                  type='email'
                  className='form-control'
                  name='email'
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
                Image:
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
                Location:
                <input
                  type='text'
                  className='form-control'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                />
                {validations.location && (
                  <span className='error-message'>Location Required</span>
                )}
              </div>
            </div>

            <div className='w-100 flex justify-center mt-3'>
              <button
                className='btn btn-default review-btn'
                onClick={checkValidations}
              >
                Add
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}

export default Review
