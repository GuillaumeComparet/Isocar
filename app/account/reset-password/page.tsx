import handleSubmit from './_actions/handleSubmit';
import isAuth from '@/utils/auth/isAuth';
import { SubmitButton } from '@/components/SubmitButton';
import PasswordFields from '@/app/(auth)/signup/_inputs/PasswordFields';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changement de mot de passe',
  description: 'Page de changement de mot de passe',
};

const ClientPage = async () => {

  await isAuth();

  return (
    <div className="flex flex-col w-full h-full px-8 sm:max-w-md justify-center gap-8 py-8 ml-14">
      <form className="flex flex-col w-full justify-center gap-16 text-foreground">
        <PasswordFields />
        <SubmitButton formAction={handleSubmit} className='btn-submit w-4/5'>Modifier mon mot de passe</SubmitButton>
      </form>
    </div>
  );
};

export default ClientPage;
