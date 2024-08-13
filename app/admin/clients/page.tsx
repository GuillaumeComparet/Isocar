import getProfilesData from './_actions/getData';
import Clients from './Clients';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Clients',
  description: 'Gérer les clients',
};

export default async function Page () {

  const dataProfiles = await getProfilesData();

  return (
    <Clients dataProfiles={dataProfiles}/>
  )
};

