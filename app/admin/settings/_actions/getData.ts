"use server"
import { getSettings } from "@/data-access/settings";
import { Settings } from "@/utils/types/globals";
import { patchServicesData } from "@/data-access/settings";
import { revalidatePath } from "next/cache";

export default async function getSettingsData() {
  try {
    return await getSettings();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des paramètres de l'application.");
  }
}

export async function updateSettingsData(updateForm:Settings) {
  try {
    await patchServicesData(updateForm)
    revalidatePath("/admin/settings")
    revalidatePath("/hourly")
    return 
  } catch (error) {
    throw new Error("Erreur lors de la modification des settings");
  }
}