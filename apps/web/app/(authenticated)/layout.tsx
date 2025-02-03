import React from 'react';
import Autheticated from '@/components/common/header/Autheticated';

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-dvh flex-col pb-12 md:pb-0">
      <Autheticated />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
