"use server"

import { createClient } from "@/utils/supabase/server";

export default async function handleResetPassword(email: string) {
  const supabase = createClient()
  await supabase.auth.resetPasswordForEmail(email)
}


