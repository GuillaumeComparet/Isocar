import React from 'react'
import { toast } from 'sonner';
import { Appointment } from '@/utils/types/globals';
import getShiftLabel from '@/utils/label/getShiftLabel';
import handleStatusChange from '@/utils/appointments/handleStatusChange';
import OnClickButton from '@/components/OnClickButton';

type Props = {
  appointment: Appointment,
  closeModal: () => void
}

const CancelModal = ({appointment, closeModal}: Props) => {
  const handleCancel = async () => {
    try {
      const success = await handleStatusChange(appointment.id_appointment, 'Canceled');
      if(success){
          toast.success("Rendez vous annulé avec succès");
          closeModal(); 
      }
    }catch (error) {
        toast.error("Erreur lors de l'annulation du rendez-vous");
    }
  }

  return (
    <>
      <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>

      <div className='show-modal'>
        <button className='close-modal-btn' onClick={closeModal}>X</button>
        <div className="grid gap-2 place-items-center">
          <h1 className='title'>Voulez-vous vraiment annuler ce rendez-vous ?</h1>
          <p><span className='font-bold text-highlight'>Date : </span>{new Date(appointment.planning.daydate).toLocaleDateString()}</p>
          <p><span className='font-bold text-highlight'>Créneau : </span>{getShiftLabel(appointment.shift)}</p>
          <p><span className='font-bold text-highlight'>Voiture : </span>{appointment.car.plate} {appointment.car.brand} {appointment.car.model} </p>
          <p><span className='font-bold text-highlight'>Operations programmées : </span></p>
          <ul>
            {appointment.services.map((service, index: number) => (
            <li key={index}>{service.name}</li>
              ))}
          </ul>
        </div>
        <div className='flex flex-col items-center gap-8 mt-8'>
          <OnClickButton
          handleSubmit={handleCancel}
          buttonText="Confirmer l'annulation"
          className="btn-submit" />
          <button className='btn-cancel' onClick={closeModal}>Retour</button>
        </div>
      </div>
    </>
  )
}

export default CancelModal