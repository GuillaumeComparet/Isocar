import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { User } from "@supabase/supabase-js";
import UserSvg from "./svg/UserSvg";

interface AuthButtonProps {
  user: User | null; 
  getNavLinkClass: (path: string) => string; // Supposons que getNavLinkClass renvoie une classe CSS en fonction du chemin
  handleChange: () => void
}

export default function AuthButton({ user, getNavLinkClass, handleChange }: AuthButtonProps) {

  return user ? (
    <div className="flex items-center gap-4">
      <li className='hover:scale-105'>
        <Link onClick={handleChange} href="/account" className={`text-xl font-bold flex items-center ${getNavLinkClass('/account')}`}>
        <UserSvg className={`pr-2 w-10 h-10 ${getNavLinkClass('/account')}`} />
        {user.user_metadata.first_name}
        </Link>
      </li>
    </div>
  ) : (
    <Link
      onClick={handleChange}
      href="/login"
      className="text-xl font-bold py-2 px-3 flex rounded-md no-underline bg-btn-background-hover hover:ring-2 ring-foreground"
    >
      Connexion
    </Link>
  );
}
