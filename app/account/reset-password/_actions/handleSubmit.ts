"use client"
import { toast } from "sonner";
import { resetPassword } from "./resetPassword";
import testSchemaClient from "@/utils/zodSchema/testSchemaClient";
import { passwordSchema } from "@/utils/zodSchema/globals";

export default async function handleSubmit(formData: FormData) {
    
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if(password !== confirmPassword){
    return toast.error("Les mots de passe ne correspondent pas")
  }

  try {
    const dataValid = testSchemaClient(passwordSchema, password)
    if(dataValid){
      await resetPassword(password);
      toast.success('Votre mot de passe a bien été modifié');
    }   
  } catch (error) {
    toast.error('Une erreur est survenue');
  }
};