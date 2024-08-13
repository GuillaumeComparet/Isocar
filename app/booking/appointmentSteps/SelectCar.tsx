import { Car } from '@/utils/types/globals'
import Link from 'next/link'
import React from 'react'

type Props = {
    cars: Car[],
    selectedCar: Car | null,
    setSelectedCar: React.Dispatch<React.SetStateAction<Car | null>>,
    setAppointmentStep: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCar = ({cars, selectedCar, setSelectedCar, setAppointmentStep}: Props) => {
  return (
    <div className='grid grid-cols-1 gap-4 rounded-md p-6 bg-background-opacity w-full shadow-lg shadow-foreground'>
      <h2 className='title'>{cars.length > 0 ? "Sélectionnez le véhicule pour le rendez-vous": "Vous n'avez aucun véhicule enregistré" }</h2>
        <ul className='grid grid-cols-2 gap-4 justify-center items-center'>
        {cars.map((car) => (
          <li key={car.id_car} onClick={() => setSelectedCar(car)} className={`bg-btn-background-hover hover:shadow-lg hover:shadow-foreground hover:bg-highlight ${selectedCar && selectedCar.id_car === car.id_car ? 'bg-highlight rounded-md p-6' : 'rounded-md p-6 bg-background-opacity'} flex flex-col gap-2 cursor-pointer items-center`}
          >
            <p>{car.brand}</p>
            <p>{car.model}</p>
            <p>{car.plate}</p>
          </li>
        ))}
      </ul>
      {selectedCar && <button className='btn-submit mt-4' onClick={() => setAppointmentStep(2)}>Valider ce véhicule</button>}
      <Link className='btn my-4 w-full' href="/account/cars?addcar=true&redirecturl=booking">Ajouter un véhicule</Link>
    </div>
  )
}

export default SelectCar