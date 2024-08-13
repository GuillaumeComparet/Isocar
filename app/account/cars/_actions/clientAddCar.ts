"use client"
import { NewCarSchema } from "@/utils/zodSchema/globals";
import testSchemaClient from "@/utils/zodSchema/testSchemaClient";
import { toast } from "sonner";
import serverAddCar from "./serverAddCar";

export default async function clientAddCar(formData: FormData){

    const plate = formData.get('plate') as string;
    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const redirectUrl = formData.get('redirectUrl') as string;

    const newCar = {plate: plate, brand: brand, model: model}

    try{
        const carValid = testSchemaClient(NewCarSchema, newCar)

        if(carValid){
            await serverAddCar(newCar, redirectUrl);
            toast.success("Véhicule ajouté avec succès");
          }
    }catch(error){
        toast.error("Erreur lors de l'ajout du véhicule'");
    }


}