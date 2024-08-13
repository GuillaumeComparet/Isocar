"use client"
import { NewUserSchema } from "@/utils/zodSchema/globals";
import testSchemaClient from "@/utils/zodSchema/testSchemaClient";
import { toast } from "sonner";
import signUp from "./signUp";

export default async function handleSignUp(formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const first_name = formData.get("firstname") as string;
    const last_name = formData.get("lastname") as string;
    const phone_number = formData.get("phoneNumber") as string;
    const cguAccepted = formData.get("cgu") === "on";
    
    if (!cguAccepted) {
      toast.error("Merci d'accepter les conditions générales d'utilisation")
      return;
    }
    if(password !== confirmPassword){
        return toast.error("Les mots de passe ne correspondent pas")
      }

    const newUser = {email, password, first_name, last_name, phone_number}

    try {
        const dataValid = testSchemaClient(NewUserSchema, newUser);
        if (dataValid) {
            const signUpResult = await signUp(newUser);
            if (signUpResult === "exists") {
                toast.error('Adresse mail déjà utilisée');
            } else if (signUpResult === "resend") {
                toast.success("Vous avez déjà un compte, un nouveau mail de confirmation vient de vous êtes envoyé");
            } else {
                toast.success("Vérifiez votre boîte mail pour valider votre inscription");
            }
        }
    } catch (error) {
        toast.error("Erreur générée lors de l'inscription");
    }
}