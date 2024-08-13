"use server"
import { Car, NewCar } from "@/utils/types/globals";
import { createCar } from "@/data-access/car";
import { revalidatePath } from "next/cache";
import testSchemaServer from "@/utils/zodSchema/testSchemaServer"
import isAuth from "@/utils/auth/isAuth";
import { NewCarSchema } from "@/utils/zodSchema/globals";
import { redirect } from "next/navigation";

export default async function serverAddCar(newCarData: NewCar, redirectUrl: string): Promise<Car> {
    "use server";

    const user = await isAuth();

    testSchemaServer(NewCarSchema, newCarData);
    await createCar(newCarData, user.id);
    revalidatePath("/account/cars")
    if(redirectUrl){
        revalidatePath(`/${redirectUrl}`)
        redirect(`/${redirectUrl}`)
    }else {
        revalidatePath('/booking')
        redirect('/account/cars')
    }
}