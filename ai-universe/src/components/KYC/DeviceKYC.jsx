"use client"

import { useState } from "react"

export default function DeviceKYC() {
  const [deviceData, setDeviceData] = useState({
    ownerName: "",
    deviceName: "",
    modelNumber: "",
    manufacturer: "",
    deviceImage: "",
    ownership: "",
    manufacturerCertificate: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDeviceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setDeviceData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#cdff09]">Device KYC</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p>Owner Name</p>
          <input id="deviceOwnerName" className="bg-[#393a36] p-2 rounded-md outline-none w-full" name="ownerName" value={deviceData.ownerName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <p>Device Name</p>
          <input id="deviceName" className="bg-[#393a36] p-2 rounded-md outline-none w-full" name="deviceName" value={deviceData.deviceName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <p>Model Number</p>
          <input id="modelNumber" className="bg-[#393a36] p-2 rounded-md outline-none w-full" name="modelNumber" value={deviceData.modelNumber} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <p>Manufacturer</p>
          <input id="manufacturer" className="bg-[#393a36] p-2 rounded-md outline-none w-full" name="manufacturer" value={deviceData.manufacturer} onChange={handleChange} />
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
          />
        </div>
        <div className="space-y-2">
          <p htmlFor="ownership">Ownership</p>
          <select className="bg-[#393a36] p-2 rounded-md outline-none w-full opacity-70" onChange={(value) => setDeviceData((prev) => ({ ...prev, ownership: value }))}>
              <option value="">Select ownership type</option>
              <option value="owned">Owned</option>
              <option value="leased">Leased</option>
              <option value="rented">Rented</option>
          </select>
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
          />
        </div>
      </div>
    </div>
  )
}

