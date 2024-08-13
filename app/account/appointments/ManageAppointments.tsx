"use client"
import React, { useEffect, useState } from 'react'
import { Appointment } from '@/utils/types/globals'
import CancelButton from './CancelButton';
import getStatusLabel from '@/utils/label/getStatusLabel';
import Link from 'next/link';
import getShiftLabel from '@/utils/label/getShiftLabel';

interface ManageAppointmentsProps {
  appointments: Appointment[];
}

const ManageAppointments: React.FC<ManageAppointmentsProps> = ({appointments}) => {
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [selectApppointments, setSelectAppointments] = useState<string>("future");

  useEffect(() => {
    const now = new Date();
    const future: Appointment[] = [];
    const past: Appointment[] = [];

    appointments.forEach(appointment => {
      const appointmentDate = new Date(appointment.planning.daydate);
      if (appointmentDate >= now) {
        future.push(appointment);
      } else {
        past.push(appointment);
      }
    });

    setFutureAppointments(future);
    setPastAppointments(past);
  }, [appointments]);
  
  if(appointments.length <1){
    return <div className='py-8'>
      <h2>Vous n'avez encore aucun rendez-vous</h2>
    </div>
  }

  const displayedAppointments = selectApppointments === "future" ? futureAppointments : pastAppointments;

  return (
    <div className='pt-8 pb-16 px-4 grid place-items-center'>
      <h1 className='title'>Mes rendez-vous :</h1>
      <div className='flex gap-4'>
      <button className='btn mb-8 min-w-2/5' onClick={() => setSelectAppointments("future")}>
      Voir mes rendez-vous à venir
      </button>
      <button className='btn mb-8 min-w-2/5' onClick={() => setSelectAppointments("past")}>
        Voir mes rendez-vous passés
      </button>
      </div>
      
      <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {displayedAppointments.length === 0 ? <p className='col-span-3 p-8'>Aucun rendez-vous</p> : displayedAppointments.map((appointment: Appointment, index) => (
            <li className='rounded-md p-6 flex flex-col gap-4 bg-background-opacity' key={index}>
            <p><span className='font-bold text-highlight'>Date :</span> {new Date(appointment.planning.daydate).toLocaleDateString()}</p>
            <p><span className='font-bold text-highlight'>Créneau :</span> {getShiftLabel(appointment.shift)}</p>
            <p><span className='font-bold text-highlight'>Voiture :</span> {appointment.car.brand} - {appointment.car.model} | {appointment.car.plate}</p>
            <p><span className='font-bold text-highlight'>Operations programmées :</span></p>
            <ul>
              {appointment.services.map((service, index: number) => (
              <li key={index}>{service.name}</li>
                ))}
            </ul>
            <p className={appointment.status === "Validated" 
              ? "text-green-700" 
              : appointment.status === "Waiting" 
              ? "text-yellow-700" 
              : (appointment.status === "Refused" || appointment.status === "Canceled") 
              ? "text-red-700" 
              : ""}>
              <span className='font-bold text-highlight'>Statut :</span> {getStatusLabel(appointment.status)}
            </p>
            {appointment.status !== 'Canceled' && appointment.status !== 'Refused' && (
            <div className="flex justify-center">
              <CancelButton appointment={appointment}/>
            </div>
            )}
          </li>
        ))}
      </ul>
      <Link className="btn mt-4" href="/account/">Retour</Link>

    </div>
  )
}

export default ManageAppointments