import React from 'react'

export default function Aicard() {
    return (
        <div>
            <div className="bg-gray-900 flex justify-center items-center min-h-screen">
                <div className="grid grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="bg-gray-800 rounded-xl p-4 relative">
                        <div className="bg-yellow-200 rounded-t-xl flex justify-center items-center h-48 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-900 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                            <img src="https://via.placeholder.com/100" alt="Digital Dolly" className="h-32" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-white text-lg font-semibold">Digital Dolly</h2>
                            <p className="text-gray-400 text-sm">#543</p>
                            <div className="flex items-center mt-4">
                                <img src="https://via.placeholder.com/32" alt="Creator" className="rounded-full" />
                                <div className="ml-2">
                                    <p className="text-white text-sm">Court Henry</p>
                                    <p className="text-gray-400 text-xs">Creator</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-green-400 font-semibold">4.015 ETH</p>
                                <button className="bg-green-600 text-white text-sm px-4 py-2 rounded">Bid</button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <p className="text-gray-400 text-xs">31 ♥</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-800 rounded-xl p-4 relative">
                        <div className="bg-purple-200 rounded-t-xl flex justify-center items-center h-48 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-900 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                            <img src="https://via.placeholder.com/100" alt="Bit Blossom" className="h-32" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-white text-lg font-semibold">Bit Blossom</h2>
                            <p className="text-gray-400 text-sm">#123</p>
                            <div className="flex items-center mt-4">
                                <img src="https://via.placeholder.com/32" alt="Creator" className="rounded-full" />
                                <div className="ml-2">
                                    <p className="text-white text-sm">David Malan</p>
                                    <p className="text-gray-400 text-xs">Creator</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-green-400 font-semibold">1.015 ETH</p>
                                <button className="bg-green-600 text-white text-sm px-4 py-2 rounded">Bid</button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <p className="text-gray-400 text-xs">11 ♥</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
