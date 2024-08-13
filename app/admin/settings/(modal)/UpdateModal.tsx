import React, { useState } from 'react'
import { toast } from 'sonner';
import { defaultSettingsSchema } from '@/utils/zodSchema/globals';
import testSchemaClient from '@/utils/zodSchema/testSchemaClient';
import { Settings } from '@/utils/types/globals';
import { updateSettingsData } from '../_actions/getData';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  settings: Settings,
  closeModal: () => void
}

const UpdateModal = ({settings, closeModal}: Props) => {

    const [updateForm, setUpdateForm] = useState(settings)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: name === 'limitShift' ? Number(value) : value
        }));
    };

      const handleSubmit = async () => {

        try {
          const dataValid = testSchemaClient(defaultSettingsSchema, updateForm)

          if(dataValid){
            await updateSettingsData(updateForm);
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
          <div className='flex flex-col justify-center items-center gap-4 overflow-auto'> 
            <h2 className='title'>Modifier les settings</h2>
            <form className='grid gap-4'>
              <h3 className='title'>Horaires</h3>
              <div>
                <label htmlFor='monday'>Lundi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.monday || ""} type="text" name='monday' id='monday' />
              </div>
              <div>
                <label htmlFor='tuesday'>Mardi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.tuesday || ""} type="text" name='tuesday' id='tuesday' />
              </div>
              <div>
                <label htmlFor='wednesday'>Mercredi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.wednesday || ""} type="text" name='wednesday' id='wednesday' />
              </div>
              <div>
                <label htmlFor='thursday'>Jeudi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.thursday || ""} type="text" name='thursday' id='thursday' />
              </div>
              <div>
                <label htmlFor='friday'>Vendredi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.friday || ""} type="text" name='friday' id='friday' />
              </div>
              <div>
                <label htmlFor='saturday'>Samedi : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.saturday || ""} type="text" name='saturday' id='saturday' />
              </div>
              <div>
                <label htmlFor='sunday'>Dimanche : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.sunday || ""} type="text" name='sunday' id='sunday' />
              </div>
              <h3 className='title'>Adresse</h3>
              <div>
                <label htmlFor='garage_name'>Nom du garage : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.garage_name || ""} type="text" name='garage_name' id='garage_name' />
              </div>
              <div>
                <label htmlFor='address'>Adresse (rue)</label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.address || ""} type="text" name='address' id='address' />
              </div>
              <div>
                <label htmlFor='zip_code'>Code postal : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.zip_code || ""} type="text" name='zip_code' id='zip_code' />
              </div>
              <div>
                <label htmlFor='city'>Ville : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.city || ""} type="text" name='city' id='city' />
              </div>
              <div>
                <label htmlFor='coordonate_x'>Coordonnées sur X (pour le GPS): </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.coordonate_x || ""} type="text" name='coordonate_x' id='coordonate_x' />
              </div>
              <div>
                <label htmlFor='coordonate_y'>Coordonnées sur Y (pour le GPS): </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.coordonate_y || ""} type="text" name='coordonate_y' id='coordonate_y' />
              </div>
              <h3 className='title'>Numéro de téléphone</h3>
              <div>
                <label htmlFor='landline_phone'>Téléphone fixe : </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.landline_phone || ""} type="text" name='landline_phone' id='landline_phone' />
              </div>
              <div>
                <label htmlFor='cell_phone'>Téléphone portable :  </label>
                <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.cell_phone || ""} type="text" name='cell_phone' id='cell_phone' />
              </div>
              <h3 className='title'>Paramètres de l'application : </h3>
              <label htmlFor="email">Email : </label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.email || ""} type="email" name="email" id="email" />
              <label htmlFor="limitShift">Nombre de créneau par demi-journée par défaut : </label>
              <input className="rounded-md px-4 py-2 bg-inherit border" onChange={handleChange} value={updateForm.limitShift} type="number" name="limitShift" id='limitShift' />
              <SubmitButton formAction={handleSubmit} className="btn-submit">Modifier</SubmitButton>
              <button className="btn-cancel" onClick={closeModal}>Annuler</button>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

export default UpdateModal