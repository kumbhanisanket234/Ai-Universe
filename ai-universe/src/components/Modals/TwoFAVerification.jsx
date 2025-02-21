"use client"

import { useState } from "react"
import { Copy, X } from "lucide-react"
import Image from "next/image"
import copy from "copy-to-clipboard"
import QRCode from "react-qr-code";


export default function TwoFAVarification({ setIsOnTwoFA }) {
    const [authCode, setAuthCode] = useState("")

    const backupCode = "FHFS DB23 42H3 W48F 5A85 HFF5 ADFV HGT3"

    const handle2FA = () => {
        setIsOnTwoFA(false)
    }
    return (
        <>
            <div>
                <div className="flex items-center justify-center">

                    <div className="w-full max-w-md transform overflow-hidden rounded-xl p-3 shadow-xl transition-all">
                        <p className="mt-2 text-sm text-gray-600">
                            Using an authenticator app Google Authenticator,
                            scan the QR code. It will generate a 6 digit code for you to enter below.
                        </p>

                        <div className="mt-4 flex justify-center">
                            <div className="p-2 rounded-lg">
                                <QRCode
                                    size={200}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value="hello"
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="auth-code" className="block text-sm font-medium text-gray-700">
                                Enter Authentication Code
                            </label>
                            <input
                                id="auth-code"
                                type="text"
                                className="mt-1 bg-[#393a36] p-2 rounded-md outline-none w-full border focus:border-[#cdff09]"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                placeholder="Enter 6-digit code"
                            />
                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                            * If your app asks for an account name, you can use "Code".
                        </p>

                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Scan not working? Copy this code key and enter it manually in your authentication app:
                            </p>
                            <div className="flex justify-between items-center gap-2 bg-[#393a36] p-2 rounded-md outline-none w-full">
                                <p className="text-[14px]">{backupCode}</p>
                                <button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => copy(backupCode)}
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button variant="outline" onClick={() => {setIsOnTwoFA(false)}}>
                                Cancel
                            </button>
                            <button
                                className="dja border border-[#cdff09] p-2 px-5 rounded-lg hover:text-[#000] hover:bg-[#cdff09] transition-all duration-300 font-bold"
                                onClick={handle2FA}
                            >
                                Set Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

