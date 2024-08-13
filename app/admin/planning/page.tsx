import React from "react";
import Appointments from "./Appointments";
import { getAppointmentsData, getPlanningData, getLimitShift } from "./_actions/getData";
import { Metadata } from 'next';
import "./style.css";

export const metadata: Metadata = {
  title: 'Admin | Planning',
  description: 'Gérer les rendez-vous de vos clients',
};

export default async function Booking() {
  const appointmentsData = await getAppointmentsData();
  const planningData = await getPlanningData();
  const limitShift = await getLimitShift();

  const appointmentsValidated = appointmentsData.filter(
    (appointment) => appointment.status === "Validated"
  );
  const appointmentsPending = appointmentsData.filter(
    (appointment) => appointment.status === "Waiting"
  );

  return (
    <>
      <Appointments
        appointmentsValidated={appointmentsValidated}
        appointmentsPending={appointmentsPending}
        planningData={planningData}
        limitShift={limitShift!}
      />
    </>
  );
}
