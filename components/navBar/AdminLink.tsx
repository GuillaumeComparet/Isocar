"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

type Props = {
  handleChange: () => void
}

const AdminLink = ({handleChange}: Props) => {

  const pathname = usePathname();
  const getNavLinkClass = (path: string) => {
    return pathname.startsWith(path) ? 'text-highlight' : '';
  };

  return (
    <li className='hover:scale-105'>
      <Link href="/admin/planning" onClick={handleChange} className={`text-xl font-bold ${getNavLinkClass("/admin/planning")}`}>Admin</Link>
    </li>
  )
}

export default AdminLink