"use server"
import { Car } from "@/utils/types/globals";
import { updateCarToArchive } from "@/data-access/car";
import isAuth from "@/utils/auth/isAuth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function handleDeleteCar(car: Car): Promise<Car> {
    "use server";

    const user = await isAuth();

    if(user.id === car.id_profile){
    const updatedCar = await updateCarToArchive(car.id_car);
    revalidatePath("/account/cars")
    return updatedCar
    }else{
        redirect("/")
    }
}