"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import CguText from './CguText'

const CguButton = () => {

    const [showModal, setShowModal] = useState(false)

  return (
    <div>
        <button type='button' className='text-blue-700 pl-1' onClick={() => setShowModal(true)}> CGU</button>
        {showModal && createPortal(<CguText closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default CguButton