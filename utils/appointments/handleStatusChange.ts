"use server"
import { AppointmentStatus, AppointmentShift } from "@prisma/client";
import { getAppointmentById, updateAppointment } from "@/data-access/appointment";
import cancelAppointments from "@/utils/appointments/cancelAppointment";
import mailStatusChange from "./mailStatusChange";

export default async function handleStatusChange(id_appointment: number, status: AppointmentStatus) {
  try {
    if (status === "Refused" || status === "Canceled") {
      const appointment = await getAppointmentById(id_appointment);
  
      if (!appointment) {
        throw new Error("Appointment not found");
      }
  
      const appointmentData = {
        id_appointment: appointment.id_appointment,
        id_planning: appointment.id_planning,
        id_profile: appointment.car.id_profile,
        id_car: appointment.car.id_car,
        status: appointment.status as AppointmentStatus,
        shift: appointment.shift as AppointmentShift,
        comment: appointment.comment,
        createdAt: appointment.planning.createdAt,
        updatedAt: appointment.planning.updatedAt
      };
  
      await cancelAppointments(appointmentData);
    }
  
    const updatedAppointment = await updateAppointment(id_appointment, status);
    mailStatusChange(updatedAppointment)
    return { success:true };
  } catch (error) {
    return { error:true };
  }
  
}