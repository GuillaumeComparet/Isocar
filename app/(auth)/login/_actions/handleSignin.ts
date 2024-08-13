"use client"
import { toast } from "sonner"
import signIn from "./signin"

export default async function handleSignin(formData: FormData){
    
    const {errorMessage } = await signIn(formData)
        if(errorMessage){
            toast.error(errorMessage)
        }
}