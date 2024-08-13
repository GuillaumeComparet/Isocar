import React, { useState } from 'react'
import handleUpdateCar from '../_actions/handleUpdateCar';
import { toast } from 'sonner';
import { Car } from '@/utils/types/globals';
import { CarSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  car: Car,
  closeModal: any
}

const UpdateModal = ({car, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(car)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

      const handleSubmit = async () => {
        // e.preventDefault();
        try {
          // Validation avec Zod
          const dataValid = testSchemaClient(CarSchema, updateForm)

          if(dataValid){
            await handleUpdateCar(updateForm);
            toast.success("Modification enregistrée");
            closeModal();
          }          
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
        }
      }

  return (
    <div>
      <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
        <div className='show-modal'>
        <button className='close-modal-btn' onClick={closeModal}>X</button>
        <h2 className='title mb-8'>Modifier votre véhicule</h2>
        <form className='flex flex-col justify-center items-center gap-4'>
          <div>
            <label className='p-16' htmlFor="plate">Immatriculation</label>
            <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.plate} type="text" name="plate"/>
          </div>
          <div>
            <label className='p-16' htmlFor="plate">Marque</label>
            <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.brand} type="text" name="brand"/>
          </div>
          <div>
            <label className='p-16' htmlFor="plate">Modèle</label>
            <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.model} type="text" name="model"/>
          </div>
          <SubmitButton
          formAction={handleSubmit}
          className="btn-submit mt-8">
          Valider les modifications
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}

export default UpdateModal