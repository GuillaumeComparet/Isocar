"use server"
import { Car } from "@/utils/types/globals";
import { updateCar } from "@/data-access/car";
import { revalidatePath } from "next/cache";
import testSchemaServer from "@/utils/zodSchema/testSchemaServer"
import isAuth from "@/utils/auth/isAuth";
import { CarSchema } from "@/utils/zodSchema/globals";
import { redirect } from "next/navigation";

export default async function handleUpdateCar(car: Car): Promise<Car> {
    "use server";

    const user = await isAuth();

    testSchemaServer(CarSchema, car);

    if(user.id === car.id_profile){
        const updatedCar = await updateCar(car);
        revalidatePath("/account/cars")
        return updatedCar
    }else {
        redirect('/')
    }
    
    
}