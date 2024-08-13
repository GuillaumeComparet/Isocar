"use server"
import { updateClientRole } from "@/data-access/profile";

export default async function updateClientRoleFunction(id: string, role: string) {
  try {
    await updateClientRole(id, role);
  } catch (error) {
    throw new Error("Erreur lors du changement de status du client.");
  }
}