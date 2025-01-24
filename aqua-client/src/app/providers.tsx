'use client';

import React, { useEffect, useState } from 'react';
import userApiModule from '@/components/shared/api/modules/auth';
import { useLocalStorage } from '@/utils/localStorage';
import { useQuery } from '@/components/shared/api';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLocalStorage } = useLocalStorage();
  const token = getLocalStorage('token');
  const [isInitialized, setIsInitialized] = useState(false);

  const publicRoutes = ['/', '/login', '/signup'];

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) {
        throw new Error(`Token not found. ${error}`);
      }
      return await userApiModule.getMe(token);
    },
    retry: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      if (!user && !publicRoutes.includes(pathname)) {
        router.push('/');
      }
    }
  }, [isInitialized, isLoading, user, pathname, router]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
