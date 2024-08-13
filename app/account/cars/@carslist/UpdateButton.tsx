"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateModal from './UpdateModal'
import { Car } from '@/utils/types/globals'

type Props = {
  car: Car;
};

const UpdateButton = ({car}:Props) => {

    const [showModal, setShowModal] = useState(false)


  return (
    <div>
        <button className='btn-submit w-full' onClick={() => setShowModal(true)}>Modifier le véhicule</button>
        {showModal && createPortal(<UpdateModal car={car} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateButton