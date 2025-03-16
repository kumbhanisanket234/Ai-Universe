import React from 'react'

export default function ProductMoreDetails({ setOpenMoreDetails, moreDetails }) {
    console.log("Premium moreDetails------>", moreDetails)
    return (
        <div>
            <div>
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-bold text-[#cdff09]">{moreDetails?.modelName}</h2>
                    <button onClick={() => { setOpenMoreDetails(false) }} className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Model Type</p>
                        <p className="text-lg text-gray-600">{moreDetails?.modelType}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Manufacturer</p>
                        <p className="text-lg text-gray-600">{moreDetails?.manufactureName}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Model Height</p>
                        <p className="text-lg text-gray-600">{moreDetails?.modelHeight} cm</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Model Weight</p>
                        <p className="text-lg text-gray-600">{moreDetails?.modelWeight} kg</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Company</p>
                        <p className="text-lg text-gray-600">{moreDetails?.company}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Manufacturing Date</p>
                        <p className="text-lg text-gray-600">{moreDetails?.dateOfManufacturing}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-sm">Features</p>
                    <p className="text-lg text-gray-600">{moreDetails?.feature}</p>
                    {/* <ul className="mt-2 list-disc list-inside space-y-1">
                                {moreDetails?.features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">
                                        {feature}
                                    </li>
                                ))}
                            </ul> */}
                </div>
                <div className="mt-6">
                    <p className="text-sm">Summary</p>
                    <p className="mt-2 text-gray-600">{moreDetails?.summary}</p>
                </div>
                <div className="mt-6">
                    <p className="text-sm">Contact for Purchase</p>
                    <p className="mt-2 text-gray-600">{moreDetails?.contactForBuy}</p>
                </div>
            </div>

            <div className=' mt-3 bg-[#242b0b] border border-[#cdff09] rounded-md'>
                <div className='dja w-full'>
                    <button className='gap-2 text-[14px] p-2 rounded-md w-full font-semibold'
                        onClick={() => { setOpenMoreDetails(false) }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
