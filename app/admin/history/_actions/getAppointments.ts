import { getAppointments } from "@/data-access/appointment";

export async function getAppointmentsData() {
  try {
    return await getAppointments();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des rendez-vous pour l'historique.");
  }
}