"use server"
import prisma from "@/utils/prisma";
import { Settings } from "@/utils/types/globals";

export default async function getDefaultShift(){
  return await prisma.defaultSettings.findFirst({
      select: {
        limitShift: true,
      },
  });
}

export async function getSettings(){
  return await prisma.defaultSettings.findFirst();
}

export async function patchServicesData(updateForm: Settings) {
  const { id_defaultSettings, createdAt, updatedAt, ...data } = updateForm;
  return await prisma.defaultSettings.update({
    where: { id_defaultSettings },
    data,
  });
}

export async function getGarageMail(){
  return await prisma.defaultSettings.findFirst({
      select: {
        email: true,
      },
  });
   
}