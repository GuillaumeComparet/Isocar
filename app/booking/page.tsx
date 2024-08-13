import ServicesList from "./ServicesList";
import { getBookingData } from './_actions/getBookingData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rendez-vous',
  description: 'Prenez rendez-vous pour l\'entretien de votre véhicule.'
};

const Booking = async () => {

  const { user, userCars, categories, planningDates, error } = await getBookingData();

  if(error){
    return <div>Une erreur est survenue</div>
  }

  return (
    <ServicesList categories={categories ?? []} auth={!!user} planningDates={planningDates ?? []} cars={userCars ?? []}/>
  );
}

export default Booking