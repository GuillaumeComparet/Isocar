import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react'
import Link from "next/link";
import isAuth from "@/utils/auth/isAuth";
import { User } from "@supabase/auth-js/dist/module/lib/types";
import UpdateButton from "./UpdateButton";
import { Metadata } from 'next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faKey } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import rendezVous from '@/public/images/rendezVous.jpg'
import garage from '@/public/images/garage.jpg'


export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Page de gestion de compte',
};

export default async function Account(){

  const user:User = await isAuth();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };


  return (

    // User data & update button
  <div className="flex flex-col gap-16 items-center p-8 w-full">
    <div className="flex items-end text-lg">
      <div className="bg-background-opacity p-4 md:p-10 rounded-xl">
        <h3 className="text-highlight pr-2">Email : 
          <span className="text-foreground pl-2">{user.email}</span>
        </h3>
        <h3 className="text-highlight pr-2">Prénom :  
          <span className="text-foreground pl-2">{user.user_metadata.first_name}</span>
        </h3>
        <h3 className="text-highlight pr-2">Nom : 
          <span className="text-foreground pl-2">{user.user_metadata.last_name}</span>
        </h3>
        <h3 className="text-highlight pr-2">Téléphone :
          <span className="text-foreground pl-2">{user.user_metadata.phone_number}</span>
        </h3>
      </div> 
      <UpdateButton user={{first_name: user.user_metadata.first_name, last_name: user.user_metadata.last_name, phone_number: user.user_metadata.phone_number}} />
    </div>

      {/* Update password link */}
      <Link href="/account/reset-password" className="btn">{<FontAwesomeIcon className="pr-2" icon={faKey} />}Modifier mon mot de passe</Link>

      {/* Appointments & cars  */}
      <div className="flex flex-col md:flex-row gap-10">
        <Link href="/account/appointments" className='w-64 h-auto flex flex-col group hover:shadow-lg hover:shadow-hover rounded-lg'>
          <Image 
            src={rendezVous} 
            alt="Garage Comparet" 
            className="rounded-t-lg"
          />
          <p className="w-full p-3 text-center rounded-b-lg no-underline bg-btn-background group-hover:bg-btn-background-hover text-lg font-semibold">Mes rendez-vous</p>
        </Link>
        <Link href="/account/cars" className='w-64 h-auto flex flex-col group hover:shadow-lg hover:shadow-hover rounded-lg'>
          <Image 
            src={garage} 
            alt="Garage Comparet" 
            className="rounded-t-lg"
            />
          <p className="w-full p-3 text-center rounded-b-lg no-underline bg-btn-background group-hover:bg-btn-background-hover text-lg font-semibold">Mes véhicules</p>
        </Link>
      </div>
    
    {/* Log out Button */}
      <form action={signOut}>
          <button className="btn">
          <FontAwesomeIcon className='pr-2' icon={faArrowRightFromBracket} />  Se déconnecter 
          </button>
      </form>
    </div>
  )
}
