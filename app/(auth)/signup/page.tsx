import Link from "next/link";
import PasswordFields from "./_inputs/PasswordFields";
import handleSignUp from "./_actions/handleSignUp";
import GenericField from "./_inputs/GenericField";
import CguCheckBox from "./_inputs/CguCheckBox";
import { SubmitButton } from "@/components/SubmitButton";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription',
  description: 'Inscrivez-vous pour accéder à votre espace personnel',
};


export default function Login() {

  return (
    <div className="flex flex-col w-full p-8 sm:max-w-md justify-center gap-2 ml-14">
        <h2 className="title -ml-16">Inscription</h2>
      <form className="flex flex-col w-full justify-center gap-4 text-foreground">
        <GenericField label="Email" name="email" placeholder="Ex : jean@gmail.com" regex="^[^\s@]+@[^\s@]+\.[^\s@]+$" />
        <PasswordFields />
        <GenericField label="Nom" name="lastname" placeholder="Ex : Dupont" regex="^[a-zA-ZÀ-ÿ' -]{2,30}$"/>
        <GenericField label="Prénom" name="firstname" placeholder="Ex : Jean" regex="^[a-zA-ZÀ-ÿ' -]{2,30}$" />
        <GenericField label="Numéro de téléphone" name="phoneNumber" placeholder="Ex : 0706050403" regex="^\d{10}$"/>
        <CguCheckBox />
        <SubmitButton formAction={handleSignUp} className='btn-submit w-4/5'>Valider mon inscription</SubmitButton>
      </form>
      <Link href="/login">
        <p className="text-center text-sm text-foreground mt-4 w-4/5  hover:text-hover">J'ai déjà un compte</p>
      </Link>
    </div>
  );
}
