import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Mentions légales'
  };

export default async function AboutPage() {
  
  return (
    <div className="flex flex-col p-8 gap-8 text-center text-xl font-bold">
      <div>
        <h2 className="title">Conception, développement et charte graphique :</h2>
        <p>
          <Link href="https://github.com/GuillaumeComparet" target="_blank" className="hover:text-highlight"> Guillaume</Link> &
          <Link href="https://fllefe.github.io/Portfolio/" target="_blank" className="hover:text-highlight"> Florian</Link>
        </p>
      </div>
      <div>
        <h2 className="title">Mentions légales</h2>
        <p>Garage Comparet SAS au capital de 5000€</p>
        <p>27 rue Denis Papin 38800 Le Pont de Claix</p>
        <p>04 76 99 86 16</p>
        <p>Siret: 83454777000018</p>
        <p>Numéro TVA Intracommunautaire : FR87834547770</p>
      </div>
      <div>
        <h2 className="title">Hébergement :</h2>
        <p>
          <Link href="https://vercel.com/" target="_blank" className="hover:text-highlight">Vercel</Link>
        </p>
      </div>
      <div>
        <h2 className="title">Stockage des données :</h2>
        <p>
          <Link href="https://supabase.com/" target="_blank" className="hover:text-highlight">Supabase</Link>
        </p>
      </div>
      <div>
        <h2 className="title">Contact :</h2>
        <p className="my-4">garage.comparet@gmail.com</p>
        <a href="mailto:garage.comparet@gmail.com" className="btn">Nous écrire</a>
      </div>
    </div>
  );
}
