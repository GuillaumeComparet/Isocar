import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "../components/navBar/Navbar";
import { Toaster } from 'sonner';
import ThemeProvider from "@/components/ThemeProvider";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: '%s',
    default: 'Garage Comparet',
  },
  description: 'Garage Comparet vous permet de réserver en ligne vos rendez-vous pour l\'entretien et les réparations de votre véhicule. Profitez de notre expertise pour assurer la longévité et la performance de votre voiture. Prise de rendez-vous simple et rapide pour toutes vos interventions automobiles.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="fr" className={`${GeistSans.className}`}>
      <ThemeProvider />
      <body className="bg-background text-foreground h-screen flex flex-col">
        <header className="lg:h-16 flex-shrink-0">
          <Navbar />
        </header>
        <main className="flex-grow flex flex-col items-center relative top-0 text-md overflow-y-auto">
          {children}
          <Toaster />
        </main>
        <footer className="hidden lg:flex w-full border-t border-t-foreground/10 p-5 h-4 lg:justify-center lg:items-center text-center text-xs bg-btn-background sticky bottom-0">
          <p>
            @ Copyright {currentYear} - Garage Comparet. Tous droits réservés. |  
            <Link href="/about" className="hover:text-highlight"> Mentions légales</Link>
          </p>
        </footer>
        <div id="modal"></div>
      </body>
    </html>
  );
}
