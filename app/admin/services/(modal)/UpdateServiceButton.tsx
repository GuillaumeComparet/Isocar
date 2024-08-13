"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateServiceModal from './UpdateServiceModal'
import { Category, Service } from '@/utils/types/globals';

const UpdateServiceButton = ({service, categories}: { service: Service, categories: Category[] }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn">Modifier</button>
        {showModal && createPortal(<UpdateServiceModal categories={categories} service={service} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateServiceButton