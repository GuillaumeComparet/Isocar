import "server-only"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function isAuth(){

  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  } else {
    return user;
  }
}