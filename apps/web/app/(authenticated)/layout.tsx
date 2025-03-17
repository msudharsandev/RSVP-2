import AutheticatedHeader from '@/components/common/header/AutheticatedHeader.tsx';
import Footer from '@/components/common/Footer';
import React from 'react';

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-dvh flex-col pb-12 md:pb-0">
      <AutheticatedHeader />
      {children}
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
