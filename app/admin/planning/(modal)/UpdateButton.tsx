"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateModal from './UpdateModal'

const UpdateButton = ({date, maxShift}: { date: string, maxShift:number }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-submit">Modifier le nombre de créneau</button>
        {showModal && createPortal(<UpdateModal date={date} maxShift={maxShift} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateButton