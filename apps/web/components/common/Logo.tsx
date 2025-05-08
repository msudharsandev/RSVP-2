import Image from 'next/image';

const Logo = ({ className }: PropsWithClassName) => {
  return (
    <Image
      priority
      src="/images/logo.svg"
      width={108}
      height={40}
      className={className}
      alt="Logo"
    />
  );
};

export default Logo;
