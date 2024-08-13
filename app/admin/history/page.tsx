import { getAppointmentsData } from './_actions/getAppointments';
import History from './History';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Historique',
  description: 'Historique des rendez-vous',
};

export default async function Page(){

  const apppointments = await getAppointmentsData();

  return (
    <History appointments={apppointments} />
  )
};


