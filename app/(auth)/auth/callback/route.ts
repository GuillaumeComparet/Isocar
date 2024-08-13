import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getProfileByMail } from "@/data-access/profile";
import getUser from "@/utils/auth/getUser";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const recovery = requestUrl.searchParams.get("recovery");
  const origin = requestUrl.origin;
  try {
    
    const supabase = createClient();

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    const user = await getUser();

    if (user?.email) {
      const email = user.email;
      const profile = await getProfileByMail(email);
      
      if (profile?.status === "Disable") {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/`);
      }
    }

    if (recovery) {
      return NextResponse.redirect(`${origin}/account/reset-password`);
    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    return NextResponse.redirect(`${origin}/error`);
  }
}
