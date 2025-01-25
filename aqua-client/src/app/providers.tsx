'use client';
import React, { useEffect, useState } from 'react';
import userApiModule from '@/components/shared/api/modules/auth';
import { useLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@/components/shared/api';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/layouts/navbar';

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLocalStorage } = useLocalStorage();
  const token = getLocalStorage('auth_token');
  const [isInitialized, setIsInitialized] = useState(false);
  const publicRoutes = ['/', '/login', '/signup', '/onboarding', '/auth/verify'];

  const {
    data: user,
    error,
    isSuccess,
    isPending,
    mutate
  } = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error(`Token not found. ${error}`);
      }
      return await userApiModule.getMe({authToken: token});
    },
  });
  
  useEffect(() => {
    if (token) {
      mutate();
    }
  }, [token]);
  
  useEffect(() => {
    if (!isPending) {
      setIsInitialized(true);
    }
  }, [isPending]);
  
  useEffect(() => {
    if (isInitialized && !isPending) {
      if (!user && !publicRoutes.includes(pathname)) {
        router.push('/');
      }
    }
  }, [isInitialized, isPending, user, pathname, router]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <><Navbar /> <div>{children}</div></>;
}