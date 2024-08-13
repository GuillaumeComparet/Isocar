import React, { useState } from 'react'
import { toast } from 'sonner';
import { CategorySchema, ServiceSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { Category } from '@/utils/types/globals';
import { patchCategoryData, patchServicesData } from '../_actions/data';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  category: Category
  closeModal: () => void
}

const UpdateCategoryModal = ({category, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(category)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUpdateForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

      const handleSubmit = async () => {
        try {
          const dataValid = testSchemaClient(CategorySchema, updateForm)

          if(dataValid){
            await patchCategoryData(updateForm. id_category, updateForm.name);
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
            <h2 className='title'>Modifier la catégorie :</h2>
            <form className='flex flex-col justify-end'>
              <label htmlFor="name">Nom :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.name} type="text" name="name" id='name'/>
              <br />
              
              <SubmitButton formAction={handleSubmit} className="btn-submit my-8">Modifier</SubmitButton>             
              
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default UpdateCategoryModal