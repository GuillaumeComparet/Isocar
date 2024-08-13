import { getCarsByUserId } from "@/data-access/car";
import isAuth from "@/utils/auth/isAuth";

export default async function getUserCars(){
    try{
        const user = await isAuth()
        const cars = await getCarsByUserId(user.id)
        return {cars, error: false}
    }catch(error){
        return {error : true}
    }
}