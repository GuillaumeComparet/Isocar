"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateServiceModal from './UpdateServiceModal'
import { Category } from '@/utils/types/globals';
import UpdateCategoryModal from './UpdateCategoryModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const UpdateCategoryButton = ({category}: { category: Category }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="py-2 px-4 text-center no-underline bg-btn-background hover:bg-btn-background-hover text-lg font-semibold hover:border-hover hover:border-foreground border-hover rounded-full border-2">
          <FontAwesomeIcon icon={faPen} className='group-hover:text-hover'/>
        </button>
        {showModal && createPortal(<UpdateCategoryModal category={category} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateCategoryButton