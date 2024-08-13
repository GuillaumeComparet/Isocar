"use server"
import { getAppointmentsDataOnDayDate } from "@/data-access/appointment";
import { getPlanningByDayDateGTE, getPlanningByDayDate, createPlanning, updateMaxShiftOnDate } from "@/data-access/planning";
import limitShift from "@/data-access/settings";
import { revalidatePath } from "next/cache";

export async function getAppointmentsData() {
  try {
    const today = new Date();
    return await getAppointmentsDataOnDayDate(today);
  } catch (error) {
    throw new Error("Erreur lors du chargement des données des rendez-vous.");
  }
}

export async function getPlanningData() {
  try {
    const today = new Date();
    return getPlanningByDayDateGTE(today);
  } catch (error) {
    throw new Error("Erreur lors du chargement des planning.");
  }
}

export async function getPlanningDataByDate(date: Date) {
  try {
    return getPlanningByDayDate(date);
  } catch (error) {
    throw new Error("Erreur lors du chargement des planning par date.");
  }
}

export async function getLimitShift() {
  try {
    const limit = await limitShift();
    return limit?.limitShift  
  } catch (error) {
    throw new Error("Erreur lors du chargement du shift limit.");
  }
}

export async function createPlanningByDate(daydate: Date, maxShift: number) {
  try {
    await createPlanning(daydate, maxShift);
    revalidatePath("/admin/booking/planning");
    return
  } catch (error) {
    throw new Error("Erreur lors de la création du planning.");
  }
}

export async function updateShiftNumberOnDate(maxShift: number, daydate: Date) {
  try {
    await updateMaxShiftOnDate(maxShift, daydate);
    revalidatePath("/admin/booking/planning");
    return
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour du nombre de shift.");
  }
}
