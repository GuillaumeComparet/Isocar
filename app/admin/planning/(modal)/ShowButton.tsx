"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import ShowModal from './ShowModal'

const ShowButton = ({comment}: { comment: string }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn bg-btn-background-hover">Afficher</button>
        {showModal && createPortal(<ShowModal comment={comment} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default ShowButton