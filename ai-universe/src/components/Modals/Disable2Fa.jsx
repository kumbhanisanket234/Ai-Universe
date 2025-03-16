import React, { useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { PHONE_REGEX, ROOT_URL } from '@/utils/constant'
import Image from 'next/image'

export default function Disable2Fa({ twoFAOpen, setTwoFAOpen, email }) {

    let numberOfDigits = 6
    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''))
    const otpBoxReference = useRef([])
    const [loading, setLoading] = useState(false)
    const [otpValidation, setOtpValidation] = useState(false)

    function handleOTPChange(value, index) {
        if (!PHONE_REGEX.test(value)) {
            return
        }
        let newArr = [...otp]
        newArr[index] = value
        setOtp(newArr)
        setOtpValidation(false)
        if (value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus()
        }
    }

    function handleBackspaceAndEnter(e, index) {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus()
        }
        if (e.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus()
        }
    }

    const handelDisable2FA = async () => {
        if (loading) return
        const otpValue = otp.join('')
        if (!otpValue) {
            setOtpValidation(true)
            return
        }
        try {
            const res = await axios.post(`${ROOT_URL}/disable_2fa`, { otp: otpValue, email: email })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setTwoFAOpen(false)
                console.log("Enable 2FA---->", res)
                return
            }
            toast.error(res?.data?.error || 'Something went wrong')
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={twoFAOpen} onClose={setTwoFAOpen} className="relative z-10">
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
                        <div className='text-center'>
                            <div className='flex items-center'>
                                <h1 className='opacity-70 text-[20px] w-full'>Enter Authentication Code</h1>
                                <button onClick={() => { setTwoFAOpen(false) }}><i className="fa-solid fa-x text-[#cdff09]"></i></button>
                            </div>
                            <p className='opacity-40 text-sm'>2FA Verification Code</p>
                            <div className='dja w-full mt-3'>
                                <Image src="/images/verified.png" height={80} width={80} alt='verified' />
                            </div>

                        </div>
                        <div className='flex justify-center items-center gap-4 mt-4'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    value={digit}
                                    maxLength={1}
                                    onChange={e => handleOTPChange(e.target.value, index)}
                                    onKeyUp={e => handleBackspaceAndEnter(e, index)}
                                    ref={reference => (otpBoxReference.current[index] = reference)}
                                    className={`OTP-boxes rounded-md block appearance-none`}
                                />
                            ))}
                        </div>
                        {otpValidation && (
                            <div className='error-message flex justify-center w-100'>
                                OTP Required
                            </div>
                        )}
                        <div className='flex justify-center mt-2 w-100'>
                            <button className='otp-submit-btn' onClick={handelDisable2FA}>
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}
