"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import logo from '@/public/images/logo.jpg'
import Link from 'next/link'
import ThemeSwitcher from '../ThemeSwitcher';
import ClientLinks from './ClientLinks'
import AdminLink from './AdminLink';
import { User } from '@supabase/supabase-js';

type Props = {
  user:User | null, 
  adminRole:boolean
}

export default function BurgerMenu ({user, adminRole}:Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 100);
  }

  return (
  <div className='h-full'>
  <button
    className="lg:hidden z-30 fixed right-4 bottom-4 text-foreground focus:outline-none"
    onClick={() => setIsOpen(!isOpen)}
  >
    <div className='bg-background-opacity rounded-md'>
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        )}
      </svg>
    </div>
    </button>
    <nav className={`fixed w-full lg:flex h-full bg-btn-background overflow:hidden lg:h-16 flex-col lg:flex-row justify-between p-6 z-20 items-center lg:border-b lg:border-b-foreground/10 ${isOpen ?  'flex' : 'hidden'}`}>
        <Link href="/" className="flex items-center justify-center lg:pl-8" onClick={handleClose}>
          <Image 
            src={logo} 
            alt="Garage Comparet" 
            className='w-28 h-16 lg:h-12 mt-8 lg:mt-0 rounded-sm hover:scale-105'
            />
        </Link>
      <ul className={`w-full flex flex-col justify-around items-center gap-4 lg:flex-row`}>
        <ClientLinks user={user} handleChange={handleClose}/>
        {adminRole && 
          <AdminLink handleChange={handleClose}/>
        }
      </ul>
      <div className='flex flex-col items-center gap-4'>
      {isOpen && (
          <Link href="/about">Mentions légales</Link>
        )}
        <ThemeSwitcher/>
      </div>
      
    </nav>
  </div> 
  )
}

