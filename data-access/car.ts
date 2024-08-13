import prisma from "@/utils/prisma";
import { NewCar, Car } from "@/utils/types/globals";

export async function getCarsByUserId(userId:string) {
  return await prisma.car.findMany({
    where: {
      id_profile: userId,
    },
    orderBy: {
      brand: 'asc',
    }
  });
}

export async function createCar(newCar: NewCar, userId:string) {
  return await prisma.car.create({
    data: {
        ...newCar,
        id_profile: userId
    }
});
}

export async function updateCar(data: Car){
  return await prisma.car.update({
    where: {
        id_car: Number(data.id_car)
    },
    data: {
        plate: data.plate,
        brand: data.brand,
        model: data.model
    }
});
}

export async function updateCarToArchive(carId: number){
  const firstProfile = await prisma.profiles.findFirst({
    where: { role: 'admin' },
  });

  if (!firstProfile) {
    throw new Error('No profiles found in the database');
  }

  return await prisma.car.update({
    where: { id_car: carId },
    data: {
      id_profile: firstProfile.id,
    },
  });
}

export async function deleteCar(carId: number) {
  return await prisma.car.delete({
    where: {
      id_car: carId
    }
  });
}

export async function getCarCountByUser(userId: string): Promise<number> {
  const carCount = await prisma.car.count({
    where: {
      id_profile: userId,
    },
  });
  return carCount;
}