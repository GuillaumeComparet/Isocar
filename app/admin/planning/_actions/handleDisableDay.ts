"use server"
import { getPlanningDataByDate } from "./getData";
import { updateMaxShiftById, createPlanning } from "@/data-access/planning";
import { revalidatePath } from "next/cache";

export default async function handleDisableDay(date:Date) {
  try {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    let planning = await getPlanningDataByDate(new Date(formattedDate));

    if (!planning) {
      await createPlanning(new Date(formattedDate), 0);
    } else {
      await updateMaxShiftById(planning.id_planning, 0);
    }
  } catch (error) {
    return { status: "error", message: "Erreur lors de la désactivation de la journée." };
  }
  revalidatePath("/admin/booking/planning")
  return { status: "success", message: "La journée a bien été désactivée." };
}