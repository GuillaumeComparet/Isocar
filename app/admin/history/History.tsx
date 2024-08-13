"use client"
import React, { useState } from 'react'
import { ExtendedAppointment } from '@/utils/types/globals';
import getShiftLabel from '@/utils/label/getShiftLabel';
import getStatusLabel from '@/utils/label/getStatusLabel';

type Props = {
  appointments: ExtendedAppointment[]
}

const History = ({appointments}: Props) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredAppointments = appointments.filter((appointment) =>
        appointment.profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.profile.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.car.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.planning.daydate.toLocaleDateString().includes(searchTerm)
      );

  return (
    <div className='pt-8 pb-16 grid place-items-center gap-8'>
      <input
        type="text"
        className="rounded-md px-4 py-2 bg-inherit border w-4/5"
        placeholder="Rechercher par nom ou marque de voiture..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredAppointments.length < 1 ? (
        <p>Aucun historique disponible</p>
      ) : (
        <div>
          <h2 className='title'>Historique des rendez-vous</h2>
          <table className='text-center'>
            <thead className='border bg-background-opacity'>
              <tr>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Voiture</th>
                <th>Date</th>
                <th>Créneau</th>
                <th>Services</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment: any) => (
                <tr className='even:bg-btn-background-hover' key={appointment.id_appointment}>
                  <td>{appointment.profile.first_name} {appointment.profile.last_name}</td>
                  <td>{appointment.profile.phone_number}</td>
                  <td>{appointment.profile.email}</td>
                  <td>{appointment.car.brand} {appointment.car.model} ({appointment.car.plate})</td>
                  <td>{new Date(appointment.planning.daydate).toLocaleDateString()}</td>
                  <td>{getShiftLabel(appointment.shift)}</td>
                  <td>
                    <ul>
                      {appointment.services.map((service: any) => (
                        <li key={service.service.id_service}>{service.service.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{getStatusLabel(appointment.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History