"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import DeleteModal from './DeleteModal'
import { Car } from '@/utils/types/globals'

type Props = {
  car: Car
}

const DeleteButton = ({car}: Props) => {

    const [showModal, setShowModal] = useState(false)

  return (
    <div>
        <button className='btn-cancel' onClick={() => setShowModal(true)}>Supprimer le véhicule</button>
        {showModal && createPortal(<DeleteModal car={car} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default DeleteButton