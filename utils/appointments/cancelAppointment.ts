"use server"
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { Appointment } from "@prisma/client";

export default async function cancelAppointments(appointment: Appointment){

  revalidatePath("/booking")
  revalidatePath("/admin/booking/planning")

  const shiftLower = appointment.shift.toLowerCase()
  if(shiftLower === "morning" || shiftLower === "afternoon"){
    await prisma.planning.update({
      data: {
        [shiftLower]: {
          decrement: 1,
        },
      },
      where: {
        id_planning: appointment.id_planning,
      }
    })
  } else if (shiftLower === "fullday") {
    await prisma.planning.update({
      data: {
        morning: {
          decrement: 1,
        },
        afternoon: {
          decrement: 1,
        },
      },
      where: {
        id_planning: appointment.id_planning,
      }
    })
  }
}