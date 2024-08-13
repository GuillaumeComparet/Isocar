"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const ClientLinks = () => {

    const pathname = usePathname();

  const getNavLinkClass = (path: string) => {
    return pathname.startsWith(path) ? 'text-highlight' : '';
  };

  return (
    <nav className="w-full flex bg-background-opacity items-center border-b border-b-foreground/10">
      <ul className="w-full flex justify-around items-center h-12">
        <li className='hover:scale-105'><Link href="/admin/planning" className={`text-2xl font-bold ${getNavLinkClass('/admin/planning')}`}>Planning</Link></li>
        <li className='hover:scale-105'><Link href="/admin/services" className={`text-2xl font-bold ${getNavLinkClass("/admin/services")}`}>Services</Link></li>
        <li className='hover:scale-105'><Link href="/admin/clients" className={`text-2xl font-bold ${getNavLinkClass("/admin/clients")}`}>Clients</Link></li>
        <li className='hover:scale-105'><Link href="/admin/history" className={`text-2xl font-bold ${getNavLinkClass("/admin/history")}`}>Historique</Link></li>
        <li className='hover:scale-105'><Link href="/admin/settings" className={`text-2xl font-bold ${getNavLinkClass("/admin/settings")}`}>Réglages</Link></li>
      </ul>
    </nav>
  )
}

export default ClientLinks