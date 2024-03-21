'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  // const session = useSession();

  const user = useAuth();
  return (
    <header>
      <div>
        {user.isSignedIn ? (
          <div className='  flex w-12 items-center justify-center rounded-lg bg-white p-2 hover:bg-gray-300'>
            <UserButton afterSignOutUrl='/' />
          </div>
        ) : (
          <div className='  flex gap-3 font-bold '>
            <Link href='/auth/signin/instant'>Login</Link>
            <Link href='/auth/signup/instant'>Sign Up</Link>
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
