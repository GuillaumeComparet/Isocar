// utils/supabase/verifyOtp.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";

export async function verifyOtp(token_hash: string, type: EmailOtpType) {
  const supabase = createClient();
  

  const { error, data } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    return { error };
  }

  return { data } ;
}
