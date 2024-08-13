"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateModal from './UpdateModal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

type updateUser = {
    first_name: string,
    last_name: string,
    phone_number: string
}

const UpdateButton = ({user}: { user: updateUser }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center relative'>
        <button onClick={() => setShowModal(true)} className="py-2 px-4 text-center no-underline bg-btn-background hover:bg-btn-background-hover text-lg font-semibold hover:border-hover hover:border-foreground border-hover rounded-full border-2 absolute right-1/5 group">
          <FontAwesomeIcon icon={faPen} className='group-hover:text-hover'/>
        </button>
        {showModal && createPortal(<UpdateModal user={user} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default UpdateButton