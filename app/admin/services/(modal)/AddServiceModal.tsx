import React, { useState } from 'react'
import { toast } from 'sonner';
import { AddServiceSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { postServicesData } from '../_actions/data';
import { SubmitButton } from '@/components/SubmitButton';
import { Category } from '@/utils/types/globals';

type Props = {
  closeModal: () => void,
  categories: Category[],
}

const AddServiceModal = ({closeModal, categories}: Props) => {

    const [updateForm, setUpdateForm] = useState({name:"", worktime:0, id_category:0})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUpdateForm((prevForm) => ({
        ...prevForm,
        [name]: name === 'worktime' || name === 'id_category' ? Number(value) : value,
      }));
    };

      const handleSubmit = async () => {

        try {
          // Validation avec Zod
          const dataValid = testSchemaClient(AddServiceSchema, updateForm)

          if(dataValid){
           await postServicesData(updateForm.name, updateForm.worktime, updateForm.id_category);

            toast.success("Nouveau service enregistré");
            closeModal();  
          }          
        } catch (error) {
            toast.error("Erreur lors d'ajout du service");
        }
      }

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
    <div>
    
        <div className='show-modal'>
          <button className='close-modal-btn' onClick={closeModal}>X</button>
          <div className='flex flex-col justify-center items-center gap-4'> 
            <h2 className='title'>Ajouter un service :</h2>
            <form className='flex flex-col justify-end'>
              <label htmlFor="name">Nom du service :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.name} type="text" name="name" id='name'/>
              <br />
              <label htmlFor="worktime">Temps de travail :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.worktime} type="number" name="worktime" id='worktime'/> 
              <br />
              <label htmlFor="category">Catégorie :</label>
              <select className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.id_category} name="id_category" id='category'>
                <option value="" >Choisissez une catégorie</option>
                {categories.map(category => (
                  <option key={category.id_category} value={category.id_category}>{category.name}</option>
                ))}
              </select>
              <SubmitButton formAction={handleSubmit} className="btn-submit my-8">Ajouter</SubmitButton>            
              
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default AddServiceModal