"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const UserInfo = () => {
const {data:session} = authClient.useSession()
const user = session?.user


    return (
        <div className='flex justify-center mt-5 gap-4 p-2 '>
            {user ? (
                <div className='flex gap-2 items-center'>
                  <Link href="/profile" className="flex gap-2 items-center">
  <div className="avatar">
    <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
      <img alt="Avatar" referrerPolicy="no-referrer" src={user?.image} />
    </div>kothai sign
  </div>
  <span>{user?.name}</span>
</Link>
                    <button className="btn-error" onClick={() => authClient.signOut()}>
                        Sign out
                    </button>
                </div>
            ) : (
                <>
                    <Link href={'/signin'}><button className='btn'>Sign In</button></Link>
                    <Link href={'/signup'}>
  <button className='btn bg-green-700 hover:bg-green-800 border-green-700 hover:border-green-800 text-white'>
    Sign Up
  </button>
</Link>
                </>
            )}
        </div>
    );
};

export default UserInfo;