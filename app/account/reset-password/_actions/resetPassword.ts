"use server";

import { createClient } from "@/utils/supabase/server";
import { passwordSchema } from "@/utils/zodSchema/globals";
import testSchemaServer from "@/utils/zodSchema/testSchemaClient";
import { redirect } from "next/navigation";

export const resetPassword = async (password: string) => {
  const dataValid = testSchemaServer(passwordSchema, password)
  try{
    if (dataValid) {
      const supabase = createClient();
      await supabase.auth.updateUser({ password });
    }
  } catch (error) {
    throw new Error("Erreur lors de la réinitialisation du mot de passe.");
  }
  redirect('/account')
};
