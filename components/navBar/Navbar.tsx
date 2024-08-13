import React from 'react'
import { isAdmin } from '@/utils/auth/isAdmin';
import getUser from '@/utils/auth/getUser';
import BurgerMenu from './BurgerMenu';

const Navbar = async () => {
  const adminRole = await isAdmin();
  const user = await getUser();

  return (
  <>
  < BurgerMenu user={user} adminRole={adminRole} />
  </>
  )
}

export default Navbar