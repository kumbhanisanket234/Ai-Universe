"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import VendorKYC from "./VendorKYC"
import DeviceKYC from "./DeviceKYC"

const steps = ["Vendor KYC", "Device KYC", "Review"]

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen gradient-bg p-8 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-4xl mx-auto card-hover">
          <div  className="mb-5">
            <h1 className="text-3xl font-bold text-center text-[#cdff09]">KYC Verification</h1>
            <p className="text-center text-gray-600">Complete your verification process</p>
          </div>
          <div>
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[#000] font-bold ${
                        index <= currentStep ? "bg-[#cdff09]" : "bg-gray-300"
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
              {currentStep === 0 && <VendorKYC />}
              {currentStep === 1 && <DeviceKYC />}
              {currentStep === 2 && <ReviewKYC />}
            </motion.div>

            <div className="mt-8 flex justify-between">
              <button className="dja border border-[#cdff09] p-2 px-5 rounded-lg hover:text-[#000] hover:bg-[#cdff09] transition-all duration-300 font-bold" onClick={prevStep} disabled={currentStep === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </button>
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

