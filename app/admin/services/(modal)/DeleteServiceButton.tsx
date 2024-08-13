"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import DeleteServiceModal from './DeleteServiceModal'
import { Service } from '@/utils/types/globals';

const DeleteServiceButton = ({service}: { service: Service }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-cancel">Supprimer</button>
        {showModal && createPortal(<DeleteServiceModal service={service} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default DeleteServiceButton