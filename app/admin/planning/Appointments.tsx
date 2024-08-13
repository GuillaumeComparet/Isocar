"use client"
import React, { useState, useCallback} from 'react'
import Calendar from './Calendar';
import { AppointmentStatus } from '@prisma/client';
import handleStatusChange from '@/utils/appointments/handleStatusChange';
import { ExtendedAppointment, Planning, Appointment } from '@/utils/types/globals';
import { toast } from 'sonner';
import ShowButton from './(modal)/ShowButton';
import OnClickButton from '@/components/OnClickButton';


type Props = {
  appointmentsValidated: ExtendedAppointment[],
  appointmentsPending: ExtendedAppointment[],
  planningData: Planning[],
  limitShift: number
};

const Appointments = ({appointmentsValidated, appointmentsPending, planningData, limitShift}: Props) => {

  const [appointmentsPendingUpdated, setAppointmentsPendingUpdated] = useState<any>(appointmentsPending)
  const [appointmentsValidatedUpdated, setAppointmentsValidatedUpdated] = useState<any>(appointmentsValidated)

  const statusChange = useCallback(async (id_appointment: number, newStatus:AppointmentStatus) => {
  
    const update = await handleStatusChange(id_appointment, newStatus);
    if (update.error) {
      toast.error("Erreur lors la validation du rendez-vous.");
      return;
    } else {
      toast.success(`Statut du rendez-vous mis à jour.`);
    }

    setAppointmentsPendingUpdated((prevState: any[]) =>
      prevState.filter((appointment) => appointment.id_appointment !== id_appointment)
    );
  
    if (newStatus === "Validated") {
      setAppointmentsValidatedUpdated((prevState: any) =>
        [...prevState, appointmentsPendingUpdated.find((appointment: { id_appointment: number; }) => appointment.id_appointment === id_appointment)]
      );
    }
  }, [handleStatusChange]);

return (
  <div className='pt-8 pb-16 grid place-items-center gap-8'>
    {appointmentsPendingUpdated.length < 1 ? (
      <p>Aucun rendez-vous en attente pour le moment</p>
    ) : (
      <>
      <h1 className='title'>Les rendez-vous en attente de validation</h1>
      <table className='text-center'>
        <thead className='border bg-background-opacity'>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Voiture</th>
            <th>Date</th>
            <th>Services</th>
            <th>Message</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsPendingUpdated.map((appointment: Appointment) => (
            <tr className='even:bg-btn-background' key={appointment.id_appointment}>
              <td>{appointment.profile.first_name} {appointment.profile.last_name}</td>
              <td>{appointment.profile.email}</td>
              <td>{appointment.car.brand} {appointment.car.model} ({appointment.car.plate})</td>
              <td>{new Date(appointment.planning.daydate).toLocaleDateString()}</td>
              <td>
                <ul>
                  {appointment.services.map((service: any) => (
                    <li key={service.service.id_service}>{service.service.name}</li>
                  ))}
                </ul>
              </td>
              <td>{appointment.comment.length > 0 ? <ShowButton comment={appointment.comment} />: "Aucun"}</td>
              
              <td><OnClickButton handleSubmit={() => statusChange(appointment.id_appointment, "Refused")} buttonText="Rejeter" className="btn-cancel" /></td>
              
              <td><OnClickButton handleSubmit={() => statusChange(appointment.id_appointment, "Validated")} buttonText="Accepter" className="py-2 px-4 text-center rounded-md no-underline bg-green-600 hover:bg-green-500 text-lg font-semibold  hover:ring-2 ring-foreground" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      
    )}

    <Calendar appointmentsReserved={appointmentsValidatedUpdated} planningData={planningData} limitShift={limitShift} />

  </div>
  
);
};

export default Appointments