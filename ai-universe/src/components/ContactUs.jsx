import Image from 'next/image'
import React from 'react'

export default function ContactUs () {
  return (
    <div className='contact-main flex items-center justify-center'>
      <div className='flex justify-center items-center gap-[126px]'>
        <div>
          <div className='contact-heading'>
            <h1>Get in touch</h1>
            <p>We are here for you! How can we help?</p>
          </div>
          <div className='contact-form mt-5'>
            <div>
              <p>Name</p>
              <input type='text' name='name' />
            </div>
            <div>
              <p>Email</p>
              <input type='email' name='email' />
            </div>
            <div>
              <p>Message</p>
              <textarea
                id='message'
                name='message'
                rows='2'
                cols='50'
              ></textarea>
            </div>
            <div>
              <button className='contact-submit-btn'>Submit</button>
            </div>
          </div>
        </div>
        <div>
          <Image
            src='/images/contactus.svg'
            height={500}
            width={510}
            alt='contact-us'
          />
          <div>
            <div className='flex gap-2'>
              <Image
                src='/images/location.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>545 Mavis Island, IL 99191</p>
            </div>
            <div className='flex gap-2'>
              <Image
                src='/images/phone.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>+2034 4040 3030</p>
            </div>
            <div className='flex gap-2'>
              <Image
                src='/images/message.svg'
                height={15}
                width={15}
                alt='contact-us'
              />
              <p>hello@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
