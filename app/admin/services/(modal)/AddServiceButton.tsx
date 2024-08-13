"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import AddServiceModal from './AddServiceModal'
import { Category } from '@/utils/types/globals'

type Props={
  categories: Category[]
}

const AddButton = ({categories}:Props) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-submit">Ajouter un service</button>
        {showModal && createPortal(<AddServiceModal categories={categories} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default AddButton