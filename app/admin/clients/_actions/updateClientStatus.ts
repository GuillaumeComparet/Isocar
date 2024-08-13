"use server"
import { updateClientStatus } from "@/data-access/profile";
import { Status } from "@prisma/client";

export default async function updateClientStatusFunction(id: string, status: Status) {
  try {
    await updateClientStatus(id, status);
  } catch (error) {
    throw new Error("Erreur lors du changement de status du client.");
  }
}