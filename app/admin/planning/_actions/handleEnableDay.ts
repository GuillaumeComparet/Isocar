"use server";
import { getPlanningDataByDate } from "./getData";
import { updateMaxShiftById } from "@/data-access/planning";
import { revalidatePath } from "next/cache";

export default async function handleEnableDay(date:Date, limitShift: number) {
  try {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const planning = await getPlanningDataByDate(new Date(formattedDate));
  if (planning) {
    await updateMaxShiftById(planning.id_planning, limitShift);
  }
  } catch (error) {
    return { status: "error", message: "Erreur lors de la mise à disposition de la journée." };
  }
  revalidatePath("/admin/booking/planning");
  return { status: "success", message: "La journée a bien été rendue disponible." };
}
