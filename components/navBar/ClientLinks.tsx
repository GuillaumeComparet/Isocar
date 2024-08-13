"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import AuthButton from '../AuthButton';
import { User } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import CalendarSvg from '../svg/CalendarSvg';
import TimeSvg from '../svg/TimeSvg';
import SimpleToolSvg from '../svg/SimpleToolSvg';
import CalendarNavBarSvg from '../svg/CalendarNavBarSvg';

type Props = {user:User | null, handleChange: () => void}

const ClientLinks = ({user, handleChange}:Props) => {

    const pathname = usePathname();

  const getNavLinkClass = (path: string) => {
    return pathname === path ? 'text-highlight' : '';
  };

  return (
    <>
        <li className='hover:scale-105'>
          <Link onClick={handleChange} href="/services" className={`text-xl font-bold flex gap-2 items-center ${getNavLinkClass('/services')}`}>
          <SimpleToolSvg className={`w-8 h-8 ${getNavLinkClass('/services')}`}/> Prestations</Link>
        </li>
        <li className='hover:scale-105'>
          <Link onClick={handleChange} href="/hourly" className={`text-xl font-bold flex gap-2 items-center ${getNavLinkClass('/hourly')}`}>
          <TimeSvg className={`w-8 h-8 ${getNavLinkClass('/hourly')}`}/> Horaires & Contact</Link>
        </li>
        <li className='hover:scale-105'>
          <Link onClick={handleChange} href="/booking" className={`text-xl font-bold flex gap-2 items-center ${getNavLinkClass('/booking')}`}>
          <CalendarNavBarSvg className={`w-8 h-8 ${getNavLinkClass('/booking')}`}/> Prendre rendez-vous</Link>
        </li>
        <AuthButton handleChange={handleChange} user={user} getNavLinkClass={getNavLinkClass}/>
    </>
  )
}

export default ClientLinks