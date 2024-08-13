import { getCarsByUserId } from "@/data-access/car";
import { getServicesByCategory } from "@/data-access/category";
import { getPlanningByDayDateGTE } from "@/data-access/planning";
import { getServices } from "@/data-access/service";
import getUser from "@/utils/auth/getUser";

export async function getBookingData() {

  try{
    const today = new Date();
    const user = await getUser();
    const userCars = user 
      ? await getCarsByUserId(user.id)
      : [];

      const planningDates = await getPlanningByDayDateGTE(today);

      const categories = await getServicesByCategory();

      return {user, userCars, categories, planningDates, error:false };
  }catch(error){
    return {error: true}
  }
}