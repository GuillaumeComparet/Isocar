"use server"
import { getProfiles } from "@/data-access/profile";

export default async function getProfilesData() {
  try {
    return await getProfiles();
  } catch (error) {
    throw new Error("Erreur lors du chargement des profils");
  }
}
