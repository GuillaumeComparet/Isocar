import "server-only"
import { createClient } from "@/utils/supabase/server";

export default async function getUser(){
  try {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw error;
  }
}