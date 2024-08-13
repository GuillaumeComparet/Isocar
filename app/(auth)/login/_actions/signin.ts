"use server"
import { getProfileByMail } from "@/data-access/profile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function signIn(formData: FormData){
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectUrl = formData.get("redirectUrl") as string;
    const supabase = createClient();

    const profile = await getProfileByMail(email)

    if (profile?.email_confirmed_at === null) {
      await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
              emailRedirectTo: 'https://www.garagecomparet.fr'
          }
      });
      return  {errorMessage : "Votre compte n'a pas été validé, un nouveau mail de confirmation vient de vous êtes envoyé"}
    }

    if (profile?.status === "Disable") {
      return redirect("/");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return  {errorMessage : "Logs incorrects"}
    }

    if(redirectUrl){
      redirect(`${redirectUrl}`)
    }else{
      return redirect("/");
    }
  
};