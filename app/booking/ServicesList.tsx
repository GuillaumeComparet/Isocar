"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Service, Car, PlanningDate, CategoryWithServices } from '@/utils/types/globals';
import { toast } from 'sonner';
import AppointmentOptions from './AppointmentOptions';

  type Props = {
    categories: CategoryWithServices[];
    auth: boolean;
    cars: Car[];
    planningDates: PlanningDate[];
  };

  const ServicesList = ({ categories, auth, planningDates, cars }: Props) => {

    const router = useRouter(); 

    const [servicesSelected, setServicesSelected] = useState<Service[]>([]);
    const [validServices, setValidServices] = useState(false)

    // Check services in localStorage
    useEffect(() => {
        const redirectData = localStorage.getItem('services')
        if(redirectData){
            setServicesSelected(JSON.parse(redirectData))
            setValidServices(true);
        }
    }, []);

    const handleCheckboxChange = (service: Service) => {
        setServicesSelected(prevSelected => {
          if (prevSelected.some(selected => selected.id_service === service.id_service)) {

            return prevSelected.filter(selected => selected.id_service !== service.id_service);
          } else {

            return [...prevSelected, service];
          }
        });
      };

      // Valid services selection
      function validAndSelectDate() {
        const serializedServices = JSON.stringify(servicesSelected);
        localStorage.setItem('services', serializedServices);
        if(servicesSelected.length >= 1){
          if (auth) {
            setValidServices(true);
          } else {
            router.push("/login?redirecturl=/booking");
            toast("Merci de vous connecter pour prendre rendez-vous")
          }
        }else {
          toast('Veuillez choisir au moins une prestation pour le rendez-vous')
        }
        
      }

  return (
    <div className='pt-8 pb-16 flex flex-col items-center gap-8 mb-16 w-11/12 lg:w-3/5'>
      {/* Checkbox to choose services */}
    {!validServices && (
      <div className='flex flex-col gap-8 p-8 lg:w-full w-full text-lg shadow-lg shadow-foreground'>
        <h2 className='title'>Sélectionnez les prestations pour votre véhicule</h2>
        <section className='grid grid-cols-1 gap-4 rounded-md p-6 bg-background-opacity'>
          {categories.map(category => (
            <div className='grid grid-cols-1 lg:grid-cols-3 rounded-md' key={category.id_category}>
              <div className='w-full p-4 text-center bg-highlight rounded-t-md lg:rounded-l lg:rounded-tr-none grid place-content-center'>
                <h2 className='lg:justify-self-end font-bold'>{category.name}</h2>
              </div>
              <div className='bg-background p-4 text-base lg:text-md rounded-b-md  lg:col-span-2 lg:rounded-r-md lg:rounded-bl-none'>
                <ul className='flex flex-col w-full col-span-2 gap-4'>
                  {category.services.map(service => (
                    <li key={service.id_service}>
                      <input
                        className='ml-4'
                        type="checkbox"
                        name={service.name}
                        id={service.name}
                        value={service.worktime}
                        onChange={() => handleCheckboxChange(service)}
                        checked={servicesSelected.some(selected => selected.id_service === service.id_service)}
                      />
                      <label className='pl-4' htmlFor={service.name}>{service.name}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Services selected */}
        {servicesSelected && servicesSelected.length >= 1 && (
          <section className='grid grid-cols-1 gap-4 rounded-md p-6 bg-background-opacity place-items-center'>
          <h2 className='title'>Services selectionnés:</h2>
          <ul>
            {servicesSelected.map((service) => (
              <li key={service.id_service} className='flex items-center justify-between mb-4'>
                {service.name}
              </li>
            ))}
          </ul>

          {/* Valid services */}
          <button className='btn-submit' onClick={() => validAndSelectDate()}>Valider mes services et choisir une date</button>
          <p className='text-sm'>Les rendez-vous ne sont pas chiffrés, pour toute de demande de devis, veuillez contacter le garage avant intervention.</p>
        </section>)}
      </div>
    )}
      {validServices && <AppointmentOptions servicesSelected={servicesSelected} planningDates={planningDates} cars={cars} setValidServices={setValidServices}/>}
    </div>
  )
}

export default ServicesList