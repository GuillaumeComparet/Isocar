import prisma from "@/utils/prisma";
import { Status } from "@prisma/client";

export async function getProfiles() {
  return await prisma.profiles.findMany(
    {
      orderBy: {
        first_name: 'desc',
      }
    }
  );
}

export async function getProfileRole(userId: string) {
  return await prisma.profiles.findUnique({
    where: {
      id: userId
    }
  })
}

export async function getProfileByMail(userMail: string){
  return await prisma.profiles.findUnique({
    where: {
      email: userMail
    }
  })
}

export async function updateClientStatus(id: string, status: Status) {
  return await prisma.profiles.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
}

export async function updateClientRole(id: string, role: string) {
  return await prisma.profiles.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });
}