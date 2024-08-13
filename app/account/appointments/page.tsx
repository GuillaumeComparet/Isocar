import React from 'react'
import getAppointmentsByUser from "./_actions/getAppointmentsByUser";
import ManageAppointments from './ManageAppointments';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mes rendez-vous',
  description: 'Gérez vos rendez-vous',
};

const Page = async () => {
    const {appointments, error} = await getAppointmentsByUser();

    if(error){
        return <div>Une erreur s'est produite lors de la récupération des rendez-vous.</div>;
    }

    if(appointments){
        const transformedAppointments = appointments.map((appointment: any) => ({
        ...appointment,
        services: appointment.services.map((service: any) => service.service)
        }));

        return (
            <div>
            <ManageAppointments appointments={transformedAppointments} />
            </div>
        );
    }
}

export default Page;