import React, { useState } from 'react'
import { toast } from 'sonner';
import { getPlanningDataByDate, createPlanningByDate, updateShiftNumberOnDate } from '../_actions/getData';
import { SubmitButton } from '@/components/SubmitButton';

type Props = {
  date: string,
  maxShift: number,
  closeModal: () => void
}

const UpdateModal = ({date, maxShift, closeModal}: Props) => {
    const formattedDate = new Date(date)
    const [updateForm, setUpdateForm] = useState({date:formattedDate, maxShift})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: name === 'maxShift' ? Number(value) : value
        }));
    };

      const handleSubmit = async () => {
        try {
          const planning = await getPlanningDataByDate(updateForm.date)
          if (!planning) {
            await createPlanningByDate(updateForm.date, updateForm.maxShift)
          } else {
            await updateShiftNumberOnDate(updateForm.maxShift, updateForm.date)
          }
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
          <h2 className='title'>Modifier le nombre de créneaux par demi-journées</h2>
          <form className='flex flex-col justify-end gap-4'>
            <p><span className='text-bold text-highlight'>Date :</span> {date}</p>
            <p><span className='text-bold text-highlight'>Ancien nombre :</span> {maxShift}</p>
            <div>
              <label className='text-bold text-highlight mr-4' htmlFor="maxShift">Nouveau nombre :</label>
              <input className="rounded-md px-4 py-2 bg-inherit border w-24" onChange={handleChange} value={updateForm.maxShift} type="number" name="maxShift" id='maxShift'/>
            </div>          
              <SubmitButton formAction={handleSubmit} className="btn">Modifier</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default UpdateModal