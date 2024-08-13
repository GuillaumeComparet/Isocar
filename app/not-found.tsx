import React from 'react'
import Image from 'next/image'
import image404 from '@/public/images/img404.png'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page 404',
  description: 'Page not found',
};

export default async function notFound() {
  return (
    <div className='flex h-full justify-center items-center'>
      <Image 
      src={image404}
      alt="404"
      width={351}
      height={351} />
    </div>
  )
}