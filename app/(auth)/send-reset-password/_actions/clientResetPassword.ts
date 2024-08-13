"use client"
import { toast } from "sonner"
import handleResetPassword from "./handleResetPassword"

export default async function clientResetPassword(formData: FormData){
    const email = formData.get("email") as string
      try {
        await handleResetPassword(email)
        toast.success("Un email de réinitialisation de mot de passe vous a été envoyé")
      } catch (error) {
        toast.error("Une erreur est survenue")
      }
  }