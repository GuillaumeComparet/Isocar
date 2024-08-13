import { createClient } from "@/utils/supabase/server";

export async function getSession() {
  const supabase = createClient();
  const { data: session, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session;
}
