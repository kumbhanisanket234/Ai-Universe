"use client"

import { NUMBER_REGEX } from "@/utils/constant"
import { useEffect, useState } from "react"

export default function DeviceKYC({ setKycType, deviceData, setDeviceData, validations, setValidations }) {


  useEffect(() => {
    setKycType({ deviceData: true })
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "modelNumber" && !NUMBER_REGEX.test(value)) return
    setDeviceData((prev) => ({ ...prev, [name]: value }))
    setValidations((prev) => ({ ...prev, [name]: false }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setDeviceData((prev) => ({ ...prev, [name]: files[0] }))
      setValidations((prev) => ({ ...prev, [name]: false }))
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#cdff09]">Device KYC</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p>Owner Name</p>
          <input
            id="deviceOwnerName"
            className="bg-[#393a36] p-2 rounded-md outline-none w-full"
            name="ownerName"
            value={deviceData.ownerName}
            onChange={handleChange}
          />
          {
            validations.ownerName && <span className='error-message'>Please Enter Owner Name</span>
          }
        </div>
        <div className="space-y-2">
          <p>Device Name</p>
          <input
            id="deviceName"
            className="bg-[#393a36] p-2 rounded-md outline-none w-full"
            name="deviceName"
            value={deviceData.deviceName}
            onChange={handleChange}
          />
          {
            validations.deviceName && <span className='error-message'>Please Enter Device Name</span>
          }
        </div>
        <div className="space-y-2">
          <p>Model Number</p>
          <input
            id="modelNumber"
            className="bg-[#393a36] p-2 rounded-md outline-none w-full"
            name="modelNumber"
            value={deviceData.modelNumber}
            onChange={handleChange}
          />
          {
            validations.modelNumber && <span className='error-message'>Please Enter Model Number</span>
          }
        </div>
        <div className="space-y-2">
          <p>Manufacturer</p>
          <input
            id="manufacturer"
            className="bg-[#393a36] p-2 rounded-md outline-none w-full"
            name="manufacturer"
            value={deviceData.manufacturer}
            onChange={handleChange}
          />
          {
            validations.manufacturer && <span className='error-message'>Please Enter Manufacturer Name</span>
          }
        </div>
        <div className="space-y-2">
          <p>Device Image</p>
          <input
            id="deviceImage"
            name="deviceImage"
            type="file"
            onChange={handleFileChange}
            className="bg-[#393a36] p-1 rounded-md outline-none 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#f0f0f0] file:text-black"
          /><br />
          {
            validations.deviceImage && <span className='error-message'>Please Enter Device Image</span>
          }
        </div>
        <div className="space-y-2">
          <p htmlFor="ownership">Ownership</p>
          <select
            className="bg-[#393a36] p-2 rounded-md outline-none w-full opacity-70"
            onChange={handleChange}
            name="ownership"
          >
            <option value="">Select ownership type</option>
            <option value="owned">Owned</option>
            <option value="leased">Leased</option>
            <option value="rented">Rented</option>
          </select>
          {
            validations.ownership && <span className='error-message'>Please Select Ownership Type</span>
          }
        </div>
        <div className="space-y-2">
          <p htmlFor="manufacturerCertificate">Manufacturer Certificate</p>
          <input
            id="manufacturerCertificate"
            name="manufacturerCertificate"
            type="file"
            onChange={handleFileChange}
            className="bg-[#393a36] p-1 rounded-md outline-none 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#f0f0f0] file:text-black"
          /><br />
          {
            validations.manufacturerCertificate && <span className='error-message'>Please Insert Manufacturer Certificate</span>
          }
        </div>
      </div>
    </div>
  )
}

