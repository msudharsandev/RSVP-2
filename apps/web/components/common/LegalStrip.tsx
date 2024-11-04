import Link from 'next/link';
import React from 'react';
import Container from './Container';

const LegalStrip = ({ authenticated }: { authenticated: boolean }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className={`${authenticated ? 'hidden' : 'block bg-primary text-black'} border-t lg:block`}
    >
      <Container className="flex flex-col items-center justify-between gap-y-6 py-6 md:flex-row">
        <div>
          <p>© {currentYear} Team Shiksha. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-x-8">
          <Link href="/privacy-policy">Terms of Service</Link>
          <Link href="/terms-and-conditions">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookies</Link>
        </div>
      </Container>
    </div>
  );
};

export default LegalStrip;
