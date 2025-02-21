import React from 'react'

export default function ProductMoreDetails({setOpenMoreDetails,data}) {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300 scale-95 hover:scale-100">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <h2 className="text-3xl font-bold text-gray-800">{data.modelName}</h2>
                            <button onClick={()=>{setOpenMoreDetails(false)}} className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Model Type</p>
                                <p className="text-lg text-gray-800">{data.modelType}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Manufacturer</p>
                                <p className="text-lg text-gray-800">{data.manufacturerName}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Company</p>
                                <p className="text-lg text-gray-800">{data.company}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Manufacturing Date</p>
                                <p className="text-lg text-gray-800">{data.dateOfManufacturing}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Features</h3>
                            <p className="text-lg text-gray-800">{data.feature}</p>
                            {/* <ul className="mt-2 list-disc list-inside space-y-1">
                                {data.features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">
                                        {feature}
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
                            <p className="mt-2 text-gray-600">{data.summary}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Contact for Purchase</h3>
                            <p className="mt-2 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                                {data.contactForBuy}
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                        <button
                            onClick={()=>{setOpenMoreDetails(false)}}
                            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
