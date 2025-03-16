"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import VendorKYC from "./VendorKYC"
import DeviceKYC from "./DeviceKYC"
import toast from "react-hot-toast"
import axios from "axios"
import { ROOT_URL } from "@/utils/constant"
import { getCookie } from "@/utils/cookies"

const steps = ["Vendor KYC", "Device KYC", "Review"]

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [kycType, setKycType] = useState({
    vendor: false,
    device: false
  })

  const [vendorData, setVendorData] = useState({
    ownerName: "",
    companyName: "",
    businessType: "",
    businessAddress: "",
    panNumber: "",
    aadharNumber: "",
    panImage: "",
    aadharImage: "",
  })

  const [deviceData, setDeviceData] = useState({
    ownerName: "",
    deviceName: "",
    modelNumber: "",
    manufacturer: "",
    deviceImage: "",
    ownership: "",
    manufacturerCertificate: "",
  })

  const [validations, setValidations] = useState({
    ownerName: false,
    companyName: false,
    businessType: false,
    businessAddress: false,
    panNumber: false,
    aadharNumber: false,
    panImage: false,
    aadharImage: false,
    deviceName: false,
    modelNumber: false,
    manufacturer: false,
    deviceImage: false,
    ownership: false,
    manufacturerCertificate: false,
  })

  const submitVendorKyc = async () => {
    const vendorFormData = new FormData()
    vendorFormData.append('ownerName', vendorData?.ownerName)
    vendorFormData.append('companyName', vendorData?.companyName)
    vendorFormData.append('businessType', vendorData?.businessType)
    vendorFormData.append('businessAddress', vendorData?.businessAddress)
    vendorFormData.append('panNumber', vendorData?.panNumber)
    vendorFormData.append('aadharNumber', vendorData?.aadharNumber)
    vendorFormData.append('panImage', vendorData?.panImage)
    vendorFormData.append('aadharImage', vendorData?.aadharImage)

    try {
      const res = await axios.post(`${ROOT_URL}/kyc_owner`, vendorFormData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`
        }
      })
      console.log("vendor KYC----->", res)
      if (res?.data?.success) {
        // toast.success(res?.data?.message)
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    }
    catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const submitDeviceKyc = async () => {
    const deviceFormData = new FormData()
    deviceFormData.append('ownerName', deviceData?.ownerName)
    deviceFormData.append('deviceName', deviceData?.deviceName)
    deviceFormData.append('modelNumber', deviceData?.modelNumber)
    deviceFormData.append('manufacturer', deviceData?.manufacturer)
    deviceFormData.append('deviceImage', deviceData?.deviceImage)
    deviceFormData.append('ownership', deviceData?.ownership)
    deviceFormData.append('manufacturerCertificate', deviceData?.manufacturerCertificate)

    try {
      const res = await axios.post(`${ROOT_URL}/kyc_device`, deviceFormData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`
        }
      })
      console.log("device KYC----->", res)
      if (res?.data?.success) {
        // toast.success(res?.data?.message)
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        return
      }
      toast.error(res?.data?.error || 'Something went wrong')
    }
    catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }
  const checkVendorValidations = () => {
    if (!vendorData.ownerName) {
      setValidations((prev) => ({ ...prev, ownerName: true }))
      return
    }
    if (!vendorData.companyName) {
      setValidations((prev) => ({ ...prev, companyName: true }))
      return
    }
    if (!vendorData.businessType) {
      setValidations((prev) => ({ ...prev, businessType: true }))
      return
    }
    if (!vendorData.businessAddress) {
      setValidations((prev) => ({ ...prev, businessAddress: true }))
      return
    }
    if (!vendorData.panNumber) {
      setValidations((prev) => ({ ...prev, panNumber: true }))
      return
    }
    if (!vendorData.aadharNumber) {
      setValidations((prev) => ({ ...prev, aadharNumber: true }))
      return
    }
    if (!vendorData.panImage) {
      setValidations((prev) => ({ ...prev, panImage: true }))
      return
    }
    if (!vendorData.aadharImage) {
      setValidations((prev) => ({ ...prev, aadharImage: true }))
      return
    }
    submitVendorKyc()
  }

  const checkDeviceValidations = () => {
    if (!deviceData.ownerName) {
      setValidations((prev) => ({ ...prev, ownerName: true }))
      return
    }
    if (!deviceData.deviceName) {
      setValidations((prev) => ({ ...prev, deviceName: true }))
      return
    }
    if (!deviceData.modelNumber) {
      setValidations((prev) => ({ ...prev, modelNumber: true }))
      return
    }
    if (!deviceData.manufacturer) {
      setValidations((prev) => ({ ...prev, manufacturer: true }))
      return
    }
    if (!deviceData.deviceImage) {
      setValidations((prev) => ({ ...prev, deviceImage: true }))
      return
    }
    if (!deviceData.ownership) {
      setValidations((prev) => ({ ...prev, ownership: true }))
      return
    }
    if (!deviceData.manufacturerCertificate) {
      setValidations((prev) => ({ ...prev, manufacturerCertificate: true }))
      return
    }
    submitDeviceKyc()
  }

  const nextStep = () => {
    if (kycType.vendor) {
      checkVendorValidations()
    }
    if (kycType.device) {
      checkDeviceValidations()
    }
  }

  // const prevStep = () => {
  //   setCurrentStep((prev) => Math.max(prev - 1, 0))
  // }

  return (
    <div className="min-h-screen gradient-bg p-8 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
        <div className="max-w-4xl mx-auto card-hover">
          <div className="mb-5">
            <h1 className="text-3xl font-bold text-center text-[#cdff09]">KYC Verification</h1>
            <p className="text-center text-gray-600">Complete your verification process</p>
          </div>
          <div>
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[#000] font-bold ${index <= currentStep ? "bg-[#cdff09]" : "bg-gray-300"
                        }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="mt-2 text-sm">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-[#cdff09] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 &&
                <VendorKYC
                  setKycType={setKycType}
                  vendorData={vendorData}
                  setVendorData={setVendorData}
                  validations={validations}
                  setValidations={setValidations}
                />
              }
              {currentStep === 1 &&
                <DeviceKYC
                  setKycType={setKycType}
                  deviceData={deviceData}
                  setDeviceData={setDeviceData}
                  validations={validations}
                  setValidations={setValidations}
                />}
              {currentStep === 2 && <ReviewKYC />}
            </motion.div>

            <div className="mt-8 flex justify-end">
              {/* <button className="dja border border-[#cdff09] p-2 px-5 rounded-lg hover:text-[#000] hover:bg-[#cdff09] transition-all duration-300 font-bold" onClick={prevStep} disabled={currentStep === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </button> */}
              <button className="dja border border-[#cdff09] p-2 px-5 rounded-lg hover:text-[#000] hover:bg-[#cdff09] transition-all duration-300 font-bold" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                {currentStep === steps.length - 1 ? "Submit" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ReviewKYC() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#cdff09]">Review Your Information</h3>
      <p className="text-gray-600">Please review the information you've provided for both Vendor and Device KYC.</p>
    </div>
  )
}

