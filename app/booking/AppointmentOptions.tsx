import React, { useEffect, useState, useRef } from 'react';
import { Car, PlanningDate, Service } from '../../utils/types/globals';
import Calendar from './appointmentSteps/Calendar';
import handleGetWaitingAppointmentsCount from './_actions/getWaitingAppointmentsCount';
import { AppointmentShift } from '@prisma/client';
import SelectCar from './appointmentSteps/SelectCar';
import getShiftLabel from '@/utils/label/getShiftLabel';
import handleAddAppointment from './_actions/handleAddAppointment';
import { useRouter } from 'next/navigation';
import CarLoading from '@/components/carLoading/CarLoading';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolSvg from '@/components/svg/ToolSvg';
import { faCar } from '@fortawesome/free-solid-svg-icons';

type Props = {
    servicesSelected: Service[],
    planningDates: PlanningDate[],
    cars: Car[],
    setValidServices: (valid: boolean) => void
};

const AppointmentOptions = ({ servicesSelected, planningDates, cars, setValidServices }: Props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Count waiting appointments of user
  useEffect(() => {
    const fetchWaitingAppointmentsCount = async () => {
      try {
        const count = await handleGetWaitingAppointmentsCount();
        setWaitingAppointmentsCount(count || 0);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchWaitingAppointmentsCount();
  }, []);

  const [waitingAppointmentsCount, setWaitingAppointmentsCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShift, setSelectedShift] = useState<AppointmentShift | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [appointmentStep, setAppointmentStep] = useState(1)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await handleAddAppointment(formData, selectedCar, servicesSelected, selectedDate!, selectedShift!, setLoading, router);
    }
  };

  if (error) {
    return <div><h1>Erreur lors du chargement des données</h1></div>;
  }

  if (loading) {
    return (
<CarLoading />
    )
  }

  if (waitingAppointmentsCount >= 3) {
    return (
      <div className='py-8'>
        <h1 className='title'>Vous avez déjà 3 rendez-vous en attente</h1>
        <p>Merci d'attendre leur validation avant de pouvoir en prendre d'autre</p>
      </div>
    );
  }

  return (

    <div className='grid gap-4 text-lg w-full h-full'>
    {/* Summary Container */}
    <div className='flex flex-col md:flex-row flex-wrap items-center md:items-start justify-center gap-8 w-full'>

    {/* Services summary */}
    <div className='rounded-md p-6 flex flex-col items-center justify-between gap-2 bg-background-opacity w-full md:w-1/4'>
      <ToolSvg className='h-16 w-16 fill-hover' />
      <h2 className='title'>Les prestations que vous avez choisies :</h2>
      {servicesSelected.map((service) => (
        <p key={service.id_service}>{service.name}</p>
      ))}
      <button className='btn w-4/5  mt-4 md:w-full' onClick={() => setValidServices(false)}>Modifier</button>
      </div>

      {/* Car summary */}
      {(appointmentStep === 2 || appointmentStep === 3) && selectedCar && (
      <div className='rounded-md p-6 flex flex-col items-center  justify-between gap-2 bg-background-opacity w-full md:w-1/4'>
      <FontAwesomeIcon className='h-8 text-hover' icon={faCar} />
        <h2 className='title'>Voiture sélectionnée : </h2>
        <div className='bg-highlight rounded-md p-6 text-center mb-4'>
          <p>{selectedCar.brand}</p>
          <p>{selectedCar.model}</p>
          <p>{selectedCar.plate}</p>
        </div>
        <button className='btn w-4/5 md:w-full' onClick={() => setAppointmentStep(1)}>Modifier</button>
      </div>
      )}

      {/* date & shift summary */}
      {appointmentStep === 3 && selectedShift && selectedDate && selectedCar &&(
        <div className='rounded-md p-6 flex flex-col items-center  justify-between gap-2 bg-background-opacity w-full md:w-1/4'>
          <FontAwesomeIcon className='h-8 text-hover' icon={faCalendarDays} />
        <h2 className='title'>Date sélectionnée :</h2>
        <p>{selectedDate?.toLocaleDateString()}</p>
        {selectedShift && (<p>Créneau sélectionné : {getShiftLabel(selectedShift)}</p>)}
        <button className='btn w-4/5 md:w-full' onClick={() => setAppointmentStep(2)}>Modifier</button>
      </div>
      )}
    
    {/* summary container end */}
    </div>

      {/* Select steps container */}
      <div className='w-full md:w-1/2 justify-self-center'>

      {/* Select a car */}
      {appointmentStep === 1 && (
        <>   
          <SelectCar cars={cars} selectedCar={selectedCar} setSelectedCar={setSelectedCar} setAppointmentStep={setAppointmentStep}/>
        </>
      )}

      {/* Select date & shift */}
      {appointmentStep === 2 && (
        <div className='rounded-md p-6 flex flex-col items-center gap-2 bg-background-opacity w-full shadow-lg shadow-foreground'>
          <h2 className='title'>Choisissez une date</h2>
          <Calendar 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          planningDates={planningDates} 
          serviceSelected={servicesSelected} 
          selectedShift={selectedShift} 
          setSelectedShift={setSelectedShift}
        />
        {selectedDate && selectedShift && (
        <button className='btn-submit' onClick={() => setAppointmentStep(3)}>Valider la date et le créneau</button>
      )}
        </div>
      )} 

      {/* Optionnal comment & valid appointment */}
      {appointmentStep === 3 && selectedCar && selectedDate && selectedShift &&(
        <div className=''>
          <form className='rounded-md p-6 flex flex-col items-center gap-8 bg-background-opacity w-full shadow-lg shadow-foreground' ref={formRef} onSubmit={handleSubmit}>
            <label className="text-center" htmlFor="comment">Informations complémentaires</label>
            <textarea
              name="comment"
              id="comment"
              placeholder="Avez-vous des informations à nous communiquer ?"
              maxLength={500} rows={4}
              className='p-2 rounded-md w-3/4 text-background'
            />
            <button className='btn-submit' type='submit'>Valider mon rendez-vous</button>
          </form>
        </div>
      )}
      {/* Step container end */}
      </div>
    
    </div>
  );
};

export default AppointmentOptions;
