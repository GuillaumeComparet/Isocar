import Link from "next/link";
import handleSignin from "./_actions/handleSignin";
import { SubmitButton } from "@/components/SubmitButton";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte',
};

interface LoginProps {
  searchParams: {
    redirecturl: string;
  };
}

export default function Login({ searchParams }: LoginProps) {

  const redirectUrl = searchParams.redirecturl
  

  return (
    <div className="flex flex-col h-full w-full px-8 py-16 sm:max-w-md justify-center gap-8">
      <form className="flex flex-col h-full w-full justify-center gap-4 text-foreground">
        <h2 className="title mb-16">Connexion</h2>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <input type="hidden" name="redirectUrl" value={redirectUrl} />

        <SubmitButton
          formAction={handleSignin}
          className="btn-submit">
          Connexion
        </SubmitButton>
      </form>
      <div className="flex flex-col gap-4">
        <Link href="/signup">
          <p  className="text-center text-sm text-foreground hover:text-hover">Créer un compte</p>
        </Link>
        <Link href="/send-reset-password">
          <p className="text-center text-sm text-foreground hover:text-hover">Mot de passe oublié</p>
        </Link>
      </div>
    </div>
  );
}
