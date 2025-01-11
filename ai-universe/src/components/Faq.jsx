'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Faq() {

    const [openIndex, setOpenIndex] = useState(null);
    const handleFaq = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    }

    const FAQ = [
        { que: 'What is Ai Universe?', ans: "Aidy is an AI-powered chatbot designed to help you achieve your goals and improve your productivity. It offers personalized information, reminders, and encouragement tailored to your specific needs." },
        { que: 'How does Ai Universe work?', ans: "Aidy uses advanced AI to understand your tasks, set reminders, and give you advice based on your goals and productivity patterns." },
        { que: 'Can I integrate Ai Universe with other tools?', ans: "Yes, Ai Universe is designed to integrate with various productivity tools and apps to streamline your tasks." },
        { que: 'Is Ai Universe free to use?', ans: "Aidy offers both free and premium plans depending on the level of features and support you need." },
        { que: 'How do I get started with Ai Universe?', ans: "Simply sign up on the website, connect your preferred tools, and start setting up your tasks and goals." },
    ]

    return (
        <div className='faq-main dja'>
            <div className='flex justify-between gap-[75px]'>
                <div className='faq-heading flex flex-col justify-between'>
                    <div>
                        <div className='dja'>
                            <Image src='/images/que-icon.svg' height={87} width={83} alt='peoples' />
                        </div>
                        <div className='heading-btn dja mt-[40px]'>
                            <button disabled>FAQs</button>
                        </div>
                    </div>
                    <div>
                        <h1 className='mt-[16px]'>Frequently Asked Questions</h1>
                        <p className='mt-[32px]'>Your quick guide to common inquiries and solutions.</p>
                    </div>
                </div>
                <div className='questions'>
                    {
                        FAQ.map((items, index) => {
                            const isSelected = openIndex === index;
                            return (
                                <div className={`cursor-pointer que flex gap-1 ${isSelected && `bg-[#cdff09] text-[#000]`}`}
                                    onClick={() => { handleFaq(index) }}
                                    key={index}>
                                    <div>
                                        <h1 className={`${isSelected ? `text-[#000]` : `text-[#a0a4ad]`}`}>{index + 1}.&nbsp;</h1>
                                    </div>
                                    <div className='w-100'>
                                        <div className='flex justify-between gap-[10px] w-100'>
                                            <h1 className={`${isSelected ? `text-[#000]` : `text-[#a0a4ad]`}`}>{items.que}</h1>
                                            <Image src={`${isSelected ? `/images/minus-icon.svg` : `/images/plus-icon.svg`}`} height={26} width={26} alt='plus' />
                                        </div>
                                        {
                                            isSelected && (
                                                <p>{items.ans}</p>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
