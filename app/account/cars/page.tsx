import React from 'react'
import Link from "next/link";
import Addcar from "./@addcar/page";
import CarsList from "./@carslist/page";
import isAuth from '@/utils/auth/isAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mes voitures',
  description: 'Gérez vos voitures',
};

type Props = {
  searchParams: {
    redirecturl: string;
    addcar: string;
  };
}

const Cars: React.FC<Props> = async ({ searchParams }) => {

  // SearchParams for addCar
  const addCarUrl = searchParams.addcar;
  const redirectUrl = searchParams.redirecturl;
  await isAuth();

  return (
    <div className='pt-8 pb-16'>
      {!addCarUrl && (
        <div className='flex flex-col gap-8'>
          <h2 className='title'>Vos véhicules</h2>
          <CarsList />
          <Link className="btn" href="/account/cars?addcar=true">Ajouter un véhicule</Link>
          <Link className="btn" href="/account/">Retour</Link>
        </div>
      )}

      {addCarUrl && <Addcar redirectUrl={redirectUrl} />}

    </div>
  );
}

export default Cars;