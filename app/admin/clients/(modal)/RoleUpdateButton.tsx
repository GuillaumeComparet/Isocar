"use client"
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import RoleUpdateModal from './RoleUpdateModal'
import { Client } from '@/utils/types/globals';

type BanUpdateButtonProps = {
  client: Client;
  changeRole: (id: string, newRole: string) => void;
};

const RoleUpdateButton = ({client, changeRole}: BanUpdateButtonProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => setShowModal(true)} className="btn w-full">{client.role === "admin" ? "Administrateur" : "Utilisateur"}</button>
        {showModal && createPortal(<RoleUpdateModal client={client} changeRole={changeRole} closeModal={() => setShowModal(false)}/>,document.querySelector("#modal")!)}
    </div>
  )
}

export default RoleUpdateButton