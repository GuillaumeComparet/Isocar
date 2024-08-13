import React from 'react'
import FormContent from './FormContent'
import clientAddCar from '../_actions/clientAddCar';
import { SubmitButton } from '@/components/SubmitButton';
import { getUserCarCount } from '../_actions/getUserCarCount';

interface AddCarProps {
  redirectUrl: string;
}

const AddCar: React.FC<AddCarProps> = async ({ redirectUrl }) => {

  const carsCount = await getUserCarCount();
  
  if(carsCount >= 20){
    return (
      <div className='py-8'>
        <h1 className='title'>Vous avez atteint la limite maximale de 20 voitures</h1>
        <p>Vous devez supprimer certain de vos véhicules pour pouvoir en ajouter à nouveau</p>
      </div>
    )
  }

  return (
    <div className='py-8 text-lg flex flex-col items-center'>
      <h2 className='title'>Ajouter votre véhicule</h2>
      <form className='grid rounded-md p-6 gap-12 bg-background-opacity w-4/5'>
        <FormContent />
        <input type="hidden" name="redirectUrl" value={redirectUrl} />
        <SubmitButton
          formAction={clientAddCar}
          className="btn-submit">
          Enregistrer mon véhicule
        </SubmitButton>
      </form>
    </div>
  )
}

export default AddCar