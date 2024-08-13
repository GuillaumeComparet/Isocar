import React, { useState } from 'react'
import { toast } from 'sonner';
import { UpdateUserSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import updateUser from './_actions/updateUser';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  user: updateUser,
  closeModal: () => void
}

const UpdateModal = ({user, closeModal}: Props) => {
    const [updateForm, setUpdateForm] = useState(user)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

      const handleSubmit = async () => {
  
        try {
        
          const dataValid = testSchemaClient(UpdateUserSchema, updateForm)

          if(dataValid){
           await updateUser(updateForm);

            toast.success("Modification enregistrée");
            closeModal();  
          }          
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
            <h2 className='title'>Modifier votre profil :</h2>
            <form className='flex flex-col justify-end'>
              <label htmlFor="last_name">Nom :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.last_name} type="text" name="last_name" id='last_name'/>
              <br />
              <label htmlFor="first_name">Prénom :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.first_name} type="text" name="first_name" id='first-name'/>
              <br />
              <label htmlFor="phone_number">Téléphone :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.phone_number} type="text" maxLength={10} name="phone_number" id='phone_number'/>
              <SubmitButton formAction={handleSubmit} className="btn-submit mt-8">Modifier</SubmitButton>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default UpdateModal