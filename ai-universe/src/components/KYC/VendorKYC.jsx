"use client"

import { NUMBER_REGEX } from "@/utils/constant"
import { useEffect, useState } from "react"

export default function VendorKYC({ setKycType, vendorData, setVendorData, validations, setValidations }) {

    useEffect(() => {
        setKycType({ vendor: true })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == "aadharNumber" && !NUMBER_REGEX.test(value)) return
        setVendorData((prev) => ({ ...prev, [name]: value }))
        setValidations((prev) => ({ ...prev, [name]: false }))
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        if (files && files[0]) {
            setVendorData((prev) => ({ ...prev, [name]: files[0] }))
            setValidations((prev) => ({ ...prev, [name]: false }))
        }
    }

    return (
        <div>
            <h3 className="text-xl font-semibold text-[#cdff09] mb-5">Vendor KYC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p>Owner Name</p>
                    <input
                        id="ownerName"
                        name="ownerName"
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full "
                        value={vendorData.ownerName}
                        onChange={handleChange}
                    />
                    {
                        validations.ownerName && <span className='error-message'>Please Enter Owner Name</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>Company Name</p>
                    <input
                        id="companyName"
                        name="companyName"
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full "
                        value={vendorData.companyName}
                        onChange={handleChange}
                    />
                    {
                        validations.companyName && <span className='error-message'>Please Enter Company Name</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>Business Type</p>
                    <select
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full opacity-70"
                        name="businessType"
                        onChange={handleChange}
                    >
                        <option value="">Select business type</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="corporation">Corporation</option>
                        <option value="llc">Limited Liability Company</option>
                    </select>
                    {
                        validations.businessType && <span className='error-message'>Please Select Business Type</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>Business Address</p>
                    <input
                        id="businessAddress"
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full "
                        name="businessAddress"
                        value={vendorData.businessAddress}
                        onChange={handleChange}
                    />
                    {
                        validations.businessAddress && <span className='error-message'>Please Enter Business Address</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>PAN Number</p>
                    <input
                        id="panNumber"
                        name="panNumber"
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full "
                        value={vendorData.panNumber}
                        onChange={handleChange}
                    />
                    {
                        validations.panNumber && <span className='error-message'>Please Enter Pan Number</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>Aadhar Number</p>
                    <input
                        id="aadharNumber"
                        name="aadharNumber"
                        className="bg-[#393a36] p-2 rounded-md outline-none w-full "
                        value={vendorData.aadharNumber}
                        onChange={handleChange}
                    />
                    {
                        validations.aadharNumber && <span className='error-message'>Please Enter Aadhar Number</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>PAN Image</p>
                    <input
                        id="panImage"
                        name="panImage"
                        type="file"
                        onChange={handleFileChange}
                        className="bg-[#393a36] p-1 rounded-md outline-none 
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#f0f0f0] file:text-black"
                    /><br />
                    {
                        validations.panImage && <span className='error-message'>Please Enter Pan Image</span>
                    }
                </div>
                <div className="space-y-2">
                    <p>Aadhar Image</p>
                    <input
                        id="aadharImage"
                        name="aadharImage"
                        type="file"
                        onChange={handleFileChange}
                        className="bg-[#393a36] p-1 rounded-md outline-none
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#f0f0f0] file:text-black"
                    /><br />
                    {
                        validations.aadharImage && <span className='error-message'>Please Enter Aadhar Image</span>
                    }
                </div>
            </div>
        </div>
    )
}

