import React, { useState } from 'react'
import { toast } from 'sonner';
import { AddCategorySchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { postCategoryData } from '../_actions/data';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  closeModal: () => void,
}

const AddCategoryModal = ({closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState({name:""})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUpdateForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

      const handleSubmit = async () => {

        try {
          // Validation avec Zod
          const dataValid = testSchemaClient(AddCategorySchema, updateForm)

          if(dataValid){
           await postCategoryData(updateForm.name);

            toast.success("Nouvelle catégorie enregistrée");
            closeModal();  
          }          
        } catch (error) {
            toast.error("Erreur lors d'ajout de la catégorie");
        }
      }

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
      <div className='show-modal'>
        <button className='close-modal-btn' onClick={closeModal}>X</button>
        <div className='flex flex-col justify-center items-center gap-4'> 
          <h2 className='title'>Ajouter une catégorie</h2>
          <form className='flex flex-col justify-end'>
            <label htmlFor="name">Nom de la catégorie :</label>
            <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.name} type="text" name="name" id='name'/>
            <SubmitButton formAction={handleSubmit} className="btn-submit my-8">Ajouter</SubmitButton>            
          </form>
        </div>
      </div>
  </>
  )
}

export default AddCategoryModal