"use server"
import { getWaitingAppointmentsCount } from "@/data-access/appointment";
import getUser from "@/utils/auth/getUser";
import { redirect } from "next/navigation";

export default async function handleGetWaitingAppointmentsCount() {
    const user = await getUser();
    if(!user){
      redirect("/login?redirecturl=/booking")
    }
    try {
      const count = await getWaitingAppointmentsCount(user.id);
      return count ?? 0;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to fetch waiting appointments count");
    }
  }