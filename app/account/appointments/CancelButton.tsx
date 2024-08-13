"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import CancelModal from './CancelModal'
import { Appointment } from '@/utils/types/globals'

interface CancelButtonProps {
  appointment: Appointment;
}


const CancelButton: React.FC<CancelButtonProps> = ({ appointment }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
        <button className="btn-cancel" onClick={() => setShowModal(true)}>Annuler ce rendez-vous</button>
        {showModal && createPortal(<CancelModal appointment={appointment} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default CancelButton