"use server"

import { getSettings } from "@/data-access/settings";

export default async function getSettingsData() {
  try {
    return await getSettings();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des paramètres de l'application.");
  }
}

