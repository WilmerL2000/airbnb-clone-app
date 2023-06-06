'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MobileLogo() {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      className="cursor-pointer"
      src="/images/airbnlogo-mobile.png"
      height="42"
      width="42"
      alt="Logo"
    />
  );
}
