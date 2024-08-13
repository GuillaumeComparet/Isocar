"use server"
import { getAppointmentsByUser } from "@/data-access/appointment"
import isAuth from "@/utils/auth/isAuth";
import { User } from "@supabase/auth-js/dist/module/lib/types";

export default async function appointmentsByUser() {
    try {
      const user:User = await isAuth();      
      const appointments = await getAppointmentsByUser(user.id)
      return {appointments, error:false}
    } catch (error) {
      return {error:true}
    }
  }
