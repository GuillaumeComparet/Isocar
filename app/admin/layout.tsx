import React from 'react';
import NavLinks from './NavLinks';
import { isAdminRedirect } from '@/utils/auth/isAdmin';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await isAdminRedirect();

  return (
    <>
      <NavLinks />
      {children}
    </>
  );
};

export default Layout;
