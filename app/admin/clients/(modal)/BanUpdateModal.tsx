import React, { useState } from 'react'
import { toast } from 'sonner';
import { Client } from '@/utils/types/globals';
import updateClientStatusFunction from '../_actions/updateClientStatus';
import { Status } from "@prisma/client";
import OnClickButton from '@/components/OnClickButton';

type Props = {
  client: Client,
  changeStatus: (clientId: string, newStatus: Status) => void,
  closeModal: () => void
}

const BanUpdateModal = ({client,changeStatus, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(client);

    const handleSubmit = async () => {
      try {
        const newStatus = client.status === 'Enable' ? 'Disable' : 'Enable';
        setUpdateForm({ ...updateForm, status: newStatus });

        await updateClientStatusFunction(updateForm.id, newStatus);
        changeStatus(updateForm.id, newStatus);
        toast.success("Modification enregistrée");
        closeModal();  
      } catch (error) {
          toast.error("Erreur lors de la mise à jour");
      }
    }

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
    <div>
    
        <div className='show-modal'>
          <button className='close-modal-btn' onClick={closeModal}>X</button>
          <div className='flex flex-col justify-center items-center gap-4'> 
            <h2 className='title'>Etes-vous sûr de vouloir {client.status === 'Enable' ? 'bannir' : 'débannir'} {client.email} ?</h2>
            <OnClickButton handleSubmit={handleSubmit} buttonText='Valider' className="btn-submit"/>
            <button onClick={closeModal} className="btn-cancel" >Annuler</button>
          </div>
        </div>
      </div>
      </>
  )
}

export default BanUpdateModal