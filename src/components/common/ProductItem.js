import { ShopContext } from '@/context/ShopContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function ProductItem({id , image , name , price}) {
    const{currency} = useContext(ShopContext)

  return (
    <Link href={`/product/${id}`} className='text-gray-700 cursor-pointer'>
       <div className='overflow-hidden'>
        <Image src={image[0]} alt="Product image" className='hover:scale-110 transition ease-in-out' />
       </div>
       <p className='pt-3 pb-1 text-sm'>{name}</p>
       <p className='font-medium text-sm'>{currency}{price}</p>
    </Link>
  )
}
