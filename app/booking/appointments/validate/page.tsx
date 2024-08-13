import React from 'react'
import Link from 'next/link'

type Props = {
  searchParams: {
    carbrand: string,
    carmodel: string,
    carplate: string,
    services: string,
    date: string,
    shift: string
  }
}

function validateAppointment({searchParams}: Props) {

  const getShiftLabel = (shift:string) => {
    switch (shift) {
      case 'Morning':
        return 'Matin';
      case 'Afternoon':
        return 'Après-midi';
      case 'Fullday':
        return 'Toute la journée';
      default:
        return '';
    }
  };

  const {carbrand, carmodel, carplate, services, date, shift} = searchParams

  // Update date to string
  const decodedDate = decodeURIComponent(date);
  const dateObject = new Date(decodedDate);
  const localDateString = dateObject.toLocaleDateString('fr-FR');

  // Décoder la chaîne de services
  const decodedServices = decodeURIComponent(services);

  // Séparer les services en utilisant la virgule comme séparateur
  const servicesArray = decodedServices.split(',').map(service => service.trim());

  return (
    <div className='py-8 px-4 grid place-items-center gap-8 '>
      <h2 className='title'>Votre rendez vous a bien été enregistré</h2>
      <div className='p-10 text-lg md:w-1/2 rounded-md bg-background-opacity w-4/5 grid gap-4'>
        <p><span className='font-bold text-highlight'>Date du rendez-vous :</span> {localDateString}</p>
        <p className='font-bold text-highlight'>Véhicule sélectionné :</p>
        <ul>
            <li>Immatriculation : {carplate}</li>
            <li>Marque : {carbrand}</li>
            <li>Modèle : {carmodel}</li>
          </ul>
        <p><span className='font-bold text-highlight'>Créneau selectionné :</span> {getShiftLabel(shift)}</p>
        
        <p className='font-bold text-highlight'>Les opérations programmées :</p>
        <ul>
          {servicesArray.map((service, index) => (
          <li key={index}>{service}</li>
          ))}
        </ul>
        <p className='font-bold text-justify'>Le garage validera prochainement votre rendez-vous par email, ou vous contactera en cas de problème.</p>
      </div>
      <Link href="/account/appointments" className="btn">Accéder à ma liste de rendez-vous</Link>
    </div>
  )
}

export default validateAppointment