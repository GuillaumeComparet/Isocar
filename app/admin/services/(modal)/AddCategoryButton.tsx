"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import AddCategoryModal from './AddCategoryModal'

const AddCategoryButton = () => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-submit">Ajouter une catégorie</button>
        {showModal && createPortal(<AddCategoryModal closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default AddCategoryButton