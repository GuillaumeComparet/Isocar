import { SubmitButton } from '@/components/SubmitButton'
import { Metadata } from 'next';
import clientResetPassword from './_actions/clientResetPassword'

export const metadata: Metadata = {
  title: 'Réinitialisation de mot de passe',
  description: 'Réinitialisation de mot de passe',
};

const resetPassword = () => {
  return (
    <div className='py-8'>
      <form className='flex flex-col items-center gap-6'>
        <label className='px-8' htmlFor="email">Pour réinitialiser votre mot de passe, entrez votre adresse email : </label>
        <input className='rounded-md px-4 py-2 bg-inherit border' type="email" name="email" placeholder="Ex : jean@gmail.com" required />
        <SubmitButton formAction={clientResetPassword} className="btn-submit">Envoyer</SubmitButton>
      </form>
    </div>
  )
}

export default resetPassword