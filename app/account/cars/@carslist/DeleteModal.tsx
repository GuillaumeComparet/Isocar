import React, { useState } from 'react'
import { toast } from 'sonner';
import handleDeleteCar from '../_actions/handleDeleteCar';
import { Car } from '@/utils/types/globals';
import OnClickButton from '@/components/OnClickButton';

type Props = {
  car: Car,
  closeModal: () => void;
}

const DeleteModal = ({car, closeModal}: Props) => {

  const handleDelete = async () => {
    try {
      await handleDeleteCar(car);
      toast.success("Suppression validée")
      closeModal();
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  };

  return (
    <>
      <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
        <div className='show-modal'>
        <button className='close-modal-btn' onClick={closeModal}>X</button>
        <div className='grid gap-8'>
          <h2 className='title'>Voulez vous vraiment supprimer ce véhicule ?</h2>
          <OnClickButton
            handleSubmit={handleDelete}
            buttonText="Supprimer"
            className="btn-submit w-full" />
          <button onClick={closeModal} className='btn-cancel'>Annuler</button>
        </div>
      </div>
    </>
  )
}

export default DeleteModal