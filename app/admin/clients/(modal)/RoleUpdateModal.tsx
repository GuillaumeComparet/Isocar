import React, { useState } from 'react'
import { toast } from 'sonner';
import { Client } from '@/utils/types/globals';
import updateClientRoleFunction from '../_actions/updateClientRole';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  client: Client,
  changeRole: (clientId: string, newRole: string) => void,
  closeModal: () => void
}

const BanUpdateModal = ({client, changeRole, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(client);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: name === 'worktime' ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
      try {
        const newRole = client.role === 'admin' ? 'user' : 'admin';
        setUpdateForm({ ...updateForm, role: newRole });

        await updateClientRoleFunction(updateForm.id, newRole);
        changeRole(updateForm.id, newRole);
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
            <h2><span className='font-bold text-highlight'>Role actuel :</span> {client.role === "admin" ? "Administrateur" : "Utilisateur"}</h2>
            <form className='flex flex-col justify-end'>
              <label htmlFor="clientRole">Nouveau rôle :</label>
              <select className="rounded-md px-4 py-2 bg-inherit border" id='clientRole' name='role' onChange={handleChange}>
                <option value='admin'>Administrateur</option>
                <option value='user'>Utilisateur</option>
              </select>
              <SubmitButton formAction={handleSubmit} className="btn-submit my-8">Modifier</SubmitButton>
              <button onClick={closeModal} className="btn-cancel" type="submit">Annuler</button>
            </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default BanUpdateModal