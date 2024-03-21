// 'use client';

import { ThemeProvider } from '@/components/theme-provider';
// import { SessionProvider } from 'next-auth/react'; add clerk here
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      {/* // <SessionProvider> */}
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      {/* // </SessionProvider> */}
    </ClerkProvider>
  );
}
