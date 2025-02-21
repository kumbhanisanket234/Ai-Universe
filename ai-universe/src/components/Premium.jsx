"use client"
import { ROOT_URL } from '@/utils/constant'
import { getCookie, setCookie } from '@/utils/cookies'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Clock } from "lucide-react"

export default function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const token = getCookie("token")
  const [premiumUser, setPremiumUser] = useState(false)
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "5",
      duration: 1,
      description: "Ideal for sporadic learning",
      features: [
        { name: "+50 Cutting-edge AI Models", included: true },
        { name: "Cognitive Assistant", included: true },
        { name: "1200 AI Credits / month", included: true },
        { name: "Cutting-edge image generation", included: true },
        { name: "A/B Testing", included: true },
        { name: "DALL·E 3", included: true },
        { name: "Chat Folders", included: true },
      ],
    },
    {
      id: "premium",
      name: "Premium Pack",
      price: "10",
      duration: 3,
      description: "Ideal for those with minor to moderate use",
      popular: true,
      features: [
        { name: "+50 Cutting-edge AI Models", included: true },
        { name: "Cognitive Assistant", included: true },
        { name: "1500 AI Credits / month", included: true },
        { name: "Cutting-edge image generation", included: true },
        { name: "A/B Testing", included: true },
        { name: "DALL·E 3", included: true },
        { name: "Chat Folders", included: true },
      ],
    },
    {
      id: "group",
      name: "Group",
      price: "15",
      duration: 6,
      description: "Tailored for swift exploration",
      features: [
        { name: "+100 Cutting-edge AI Models", included: true },
        { name: "Cognitive Assistant", included: true },
        { name: "2500 AI Credits / month", included: true },
        { name: "Cutting-edge image generation", included: true },
        { name: "A/B Testing", included: true },
        { name: "DALL·E 3", included: true },
        { name: "Chat Folders", included: true },
      ],
    },
  ]

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const premiumTimer = (expiryDate) => {

    const expirationDate = new Date(expiryDate).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = expirationDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)
    return () => clearInterval(timer)
  }

  const [loading, setLoading] = useState({
    getPremium: false,
    postPremium: false
  })

  const fetchPremiumUser = async () => {
    try {
      setLoading((prev) => ({ ...prev, getPremium: true }))
      const res = await axios.get(`${ROOT_URL}/premium_user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res?.data?.success) {
        premiumTimer(res?.data?.expiryDate);
        setPremiumUser(true)
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading((prev) => ({ ...prev, getPremium: false }))
    }
  }

  useEffect(() => {
    fetchPremiumUser()
  }, [])

  const handlePremium = async (plan) => {
    try {
      setLoading((prev) => ({ ...prev, postPremium: true }))
      const res = await axios.post(`${ROOT_URL}/premium_user`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            days: plan.duration * 30
          }
        }
      )
      if (res?.data?.success) {
        console.log(res)
        fetchPremiumUser()
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading((prev) => ({ ...prev, postPremium: false }))
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 p-6 ">
      <h1 className='text-center text-[40px] font-semibold text-[#cdff09]'>{premiumUser ? "My Premium" : "Get Your Premium Now"}</h1>
      {!premiumUser ?

        <div className='dja relative'>
          <div className="grid lg:grid-cols-3 gap-5 max-w-7xl w-full relative mt-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card relative rounded-2xl p-0.5 cursor-pointer transition-all duration-500
              ${selectedPlan === plan.id ? "scale-105 z-10" : "hover:scale-[1.02]"}
              ${plan.popular ? "bg-gradient-to-b from-[#c1ff2e] via-[#c1ff2e40] to-transparent" : "bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent"}`}
                onClick={() => setSelectedPlan(plan.id)}
              >

                <div
                  className={`h-full rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 relative backdrop-blur-xl
                ${selectedPlan === plan.id ? "border border-[#c1ff2e40]" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c1ff2e] text-black px-4 py-1 rounded-full text-sm font-medium shadow-[0_0_20px_rgba(193,255,46,0.4)]">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-zinc-400 ml-2">/ {plan.duration} month</span>
                    </div>
                    <p className="text-sm text-zinc-400">{plan.description}</p>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h4 className="text-white font-medium">What&apos;s included?</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm gap-3"
                        >
                          {feature.included ? (
                            <div><Image src="/images/check-icon.svg" height={17} width={17} alt='check' /></div>
                          ) : (
                            <div><Image src="/images/notcheck-icon.svg" height={17} width={17} alt='check' /></div>
                          )}
                          <span className={feature.included ? "text-zinc-300" : "text-zinc-500"}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`mt-8 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
                  ${selectedPlan === plan.id
                        ? "bg-[#c1ff2e] text-black"
                        : plan.popular
                          ? "bg-[#c1ff2e] text-black font-bold hover:bg-[#b3ee29]"
                          : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                    onClick={() => { handlePremium(plan) }}
                  >
                    {selectedPlan === plan.id && loading.postPremium ? "Loading..." : "Request Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        :
        <div className='dja w-full'>
          <div className="bg-[#cdff09] mt-10 rounded-3xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 max-w-md w-full">
            <div className="bg-black p-6 rounded-t-3xl">
              <h1 className="text-[#cdff09] text-3xl font-bold mb-2 text-center">Time Remaining</h1>
              <p className="text-[#cdff09] text-center mb-4">Until the Expiry!</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-black rounded-lg p-3 text-center">
                    <div className="text-[#cdff09] text-3xl font-bold">{value}</div>
                    <div className="text-[#cdff09] text-xs uppercase">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black text-[#cdff09] p-4 flex items-center justify-center">
              <Clock className="mr-2" />
              <span>Countdown in progress...</span>
            </div>
          </div>
        </div>
      }
    </div>

  )
}

