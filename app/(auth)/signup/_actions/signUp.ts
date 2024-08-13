"use server"
import { NewUser } from "@/utils/types/globals";
import { NewUserSchema } from "@/utils/zodSchema/globals";
import testSchemaServer from "@/utils/zodSchema/testSchemaServer";
import { getProfileByMail } from "@/data-access/profile";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signUp(newUser: NewUser){
"use server"

const origin = headers().get("origin");
const supabase = createClient();
const {email, password, first_name, last_name, phone_number} = newUser
const checkEmail = await getProfileByMail(email)

if (checkEmail?.email_confirmed_at === null) {
  await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
          emailRedirectTo: 'https://www.garagecomparet.fr'
      }
  });
  return "resend";
}

if (checkEmail) {
  return "exists";
}
  const validNewUser = testSchemaServer(NewUserSchema, newUser)
        
  if(validNewUser){
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          first_name,
          last_name,
          phone_number,
        }
      },
            
    });
      
    return redirect("/login");
  }
};