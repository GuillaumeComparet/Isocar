"use server"
import { revalidatePath } from "next/cache";
import { updateMaxShiftOnDate } from "@/data-access/planning";
import { getPlanningDataByDate, createPlanningByDate } from "./getData";


export default async function handleShiftNumber(formData: FormData) {
  try {
    const shiftNumber = parseInt(formData.get("shiftNumber") as string)
    const date = formData.get("date") as string
    const formattedDate = new Date(date)

    const exist = await getPlanningDataByDate(formattedDate)
    if (!exist) {
      await createPlanningByDate(formattedDate, shiftNumber)
    } else {
      await updateMaxShiftOnDate(shiftNumber, formattedDate)
    }
  } catch (error) {
    throw new Error("Erreur lors de la modification du nombre de shift");
  }
  revalidatePath("/admin/booking/planning")
}
