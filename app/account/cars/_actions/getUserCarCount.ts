import { getCarCountByUser } from "@/data-access/car";
import isAuth from "@/utils/auth/isAuth";


export async function getUserCarCount(): Promise<number> {

    const user = await isAuth();
  try {
    const carCount = await getCarCountByUser(user.id);
    return carCount;
  } catch (error) {
    throw new Error('Impossible de récupérer le nombre de voitures.');
  }
}