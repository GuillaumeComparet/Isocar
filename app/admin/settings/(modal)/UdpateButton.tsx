"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateModal from './UpdateModal'
import { Settings } from '@/utils/types/globals';

const UpdateButton = ({settings}: {settings:Settings}) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-submit">Modifier</button>
        {showModal && createPortal(<UpdateModal settings={settings} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateButton