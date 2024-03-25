'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { SignIn, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  // const session = useSession();

  const userID = useAuth();
  const { user } = useUser();
  return (
    <header className='bg-gray-100 dark:bg-gray-900 mx-auto'>
      <div className='items-center flex justify-between p-4 container'>
        {/* <h1>LOGO</h1> */}

        <Link
          href='/'
          className='flex gap-2 items-center text-xl hover:underline'
        >
          <Image
            src='/icon.png'
            width='60'
            height='60'
            alt='the application icon of a magnifying glass'
          />
          DevFinder
        </Link>

        <div className='items-center'>
          <div className='flex justify-between'>
            {userID.isSignedIn ? (
              <div className='flex justify-between items-center'>
                <div className='flex w-12 items-center justify-center rounded-lg bg-white p-2 hover:bg-gray-300'>
                  <UserButton afterSignOutUrl='/' />
                </div>
                <div className='ml-4'> Hi, {user?.firstName}</div>
              </div>
            ) : (
              <div className='flex gap-3 font-bold items-center'>
                <Button>
                  <Link href='/auth/signin/instant'>Login</Link>
                </Button>
                <Button>
                  <Link href='/auth/signup/instant'>Sign Up</Link>
                </Button>
              </div>
            )}
            <div className='ml-4'>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
