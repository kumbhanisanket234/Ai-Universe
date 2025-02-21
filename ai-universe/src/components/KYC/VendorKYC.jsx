"use client"

import { useState } from "react"

export default function VendorKYC() {
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setVendorData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        if (files && files[0]) {
            setVendorData((prev) => ({ ...prev, [name]: files[0] }))
        }
    }

    return (
        <div>
            <h3 className="text-xl font-semibold text-[#cdff09] mb-5">Vendor KYC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p>Owner Name</p>
                    <input id="ownerName" name="ownerName" className="bg-[#393a36] p-2 rounded-md outline-none w-full " value={vendorData.ownerName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <p>Company Name</p>
                    <input id="companyName" name="companyName" className="bg-[#393a36] p-2 rounded-md outline-none w-full " value={vendorData.companyName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <p>Business Type</p>
                    <select className="bg-[#393a36] p-2 rounded-md outline-none w-full opacity-70" onChange={(value) => setVendorData((prev) => ({ ...prev, businessType: value }))}>
                        <option value="">Select business type</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="corporation">Corporation</option>
                        <option value="llc">Limited Liability Company</option>
                    </select>
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
                </div>
                <div className="space-y-2">
                    <p>PAN Number</p>
                    <input id="panNumber" name="panNumber" className="bg-[#393a36] p-2 rounded-md outline-none w-full " value={vendorData.panNumber} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <p>Aadhar Number</p>
                    <input id="aadharNumber" name="aadharNumber" className="bg-[#393a36] p-2 rounded-md outline-none w-full " value={vendorData.aadharNumber} onChange={handleChange} />
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
                    />
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
                    />
                </div>
            </div>
        </div>
    )
}

