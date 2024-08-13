import React, { useState } from 'react'
import { toast } from 'sonner';
import { ServiceSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { Category, Service } from '@/utils/types/globals';
import { patchServicesData } from '../_actions/data';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  service: Service,
  categories: Category[]
  closeModal: () => void
}

const UpdateServiceModal = ({service, categories, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(service)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUpdateForm((prevForm) => ({
        ...prevForm,
        [name]: name === 'worktime' || name === 'id_category' ? Number(value) : value,
      }));
    };

      const handleSubmit = async () => {
        try {
          const dataValid = testSchemaClient(ServiceSchema, updateForm)

          if(dataValid){
            await patchServicesData(updateForm.id_service, updateForm.name, updateForm.worktime, updateForm.id_category);
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
            <h2 className='title'>Modifier le service :</h2>
            <form className='flex flex-col justify-end'>
              <label htmlFor="name">Service :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.name} type="text" name="name" id='name'/>
              <br />
              <label htmlFor="worktime">Temps de travail :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.worktime} type="number" name="worktime" id='worktime'/> 
              <br />
              <label htmlFor="category">Catégorie :</label>
              <select className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.id_category} name="id_category" id='category'>
                <option value="" disabled>Choisissez une catégorie</option>
                {categories.map(category => (
                  <option key={category.id_category} value={category.id_category}>{category.name}</option>
                ))}
              </select>
              <SubmitButton formAction={handleSubmit} className="btn-submit my-8">Modifier</SubmitButton>             
              
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default UpdateServiceModal