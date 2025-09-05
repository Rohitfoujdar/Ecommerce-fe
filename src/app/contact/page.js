import Title from '@/components/common/Title'
import Image from 'next/image'
import React from 'react'
import { assets } from '../../../public/assets/assets'
import NewsLetterBox from '@/components/home/NewsLetterBox'
import { TEXT_CAREERS, TEXT_CAREERS_DESC, TEXT_CONTACT, TEXT_OUR_STORE, TEXT_STORE_ADDRESS, TEXT_STORE_EMAIL, TEXT_STORE_TEL, TEXT_US_CONTACT } from '../../../text'

export default function page() {
  return (
    <div className='section-width'>
      <div className='text-center text-2xl pt-10 border-t border-gray-300'>
       <Title text1={TEXT_CONTACT} text2={TEXT_US_CONTACT}/>
      </div>
      <div className='my-10 flex flex-col justify-center sm:flex-row gap-10 mb-28'>
        <Image src={assets.contact_img} className='w-full md:max-w-[480px]' alt="contact" />
        <div className='flex flex-col justify-center items-start gap-10'>
          <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-xl font-semibold text-gray-600'>{TEXT_OUR_STORE}</p>
          <p className='text-gray-500'>{TEXT_STORE_ADDRESS}</p>
          <p className='text-gray-500'>{TEXT_STORE_TEL} <br/> {TEXT_STORE_EMAIL}</p>
        </div>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-xl font-semibold text-gray-600'>{TEXT_CAREERS}</p>
          <p className='text-gray-500'>{TEXT_CAREERS_DESC}</p>
          <button className='border border-black px-8 py-4 cursor-pointer text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}
