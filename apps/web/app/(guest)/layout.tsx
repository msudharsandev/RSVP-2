import Guest from '@/components/common/header/Guest';
import React, { Suspense } from 'react';
import LegalStrip from '@/components/common/LegalStrip';

const GuestLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense>
      <Guest />
      {children}
      <LegalStrip authenticated={false} className="mt-24" />
    </Suspense>
  );
};

export default GuestLayout;
