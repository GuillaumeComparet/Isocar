import 'server-only'
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';
import { getProfileRole } from '@/data-access/profile';
import isAuth from './isAuth';

export async function isAdminRedirect(){
  
  const user = await isAuth();
  const role = await getProfileRole(user.id);

  if (role?.status === "Disable") {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  }
  
  if(!role || role?.role !== "admin"){
    return redirect('/not-found');
  }
}

export async function isAdmin(){
  
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();

  if(!user){
    return false;
  }

  const role = await getProfileRole(user.id);

  if (role?.status === "Disable") {
    const supabase = createClient();
    await supabase.auth.signOut();
    return false;
  }
  
  if(!role || role?.role !== "admin"){
    return false;
  }

  return true;
}
