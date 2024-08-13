"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import BanUpdateModal from './BanUpdateModal'
import { Client } from '@/utils/types/globals';
import { Status } from "@prisma/client";


type BanUpdateButtonProps = {
  client: Client;
  changeStatus: (id: string, newStatus: Status) => void;
};

const BanUpdateButton = ({client, changeStatus}: BanUpdateButtonProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn-cancel w-full">{client.status === 'Enable' ? 'Bannir' : 'Débannir'}</button>
        {showModal && createPortal(<BanUpdateModal client={client} changeStatus={changeStatus} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default BanUpdateButton