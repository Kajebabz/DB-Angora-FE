// src/components/header/pageHeader.tsx
'use client'
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/': 'Forside',
  '/rabbits/for-sale': 'Kaniner til salg',
  '/rabbits/for-breeding': 'Avlskaniner',
  '/rabbits/own': 'Mine kaniner',
  '/rabbits/profile': 'Kanin profil'
};

export default function PageHeader() {
  const pathname = usePathname();
  const baseRoute = '/' + pathname.split('/')[1];
  const title = pageTitles[pathname] || pageTitles[baseRoute] || 'DenBlå-Angora';

  return (
    <h1 className="text-2xl font-bold text-zinc-100">
      {title}
    </h1>
  );
}