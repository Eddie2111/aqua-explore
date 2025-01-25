'use client';
import React, { useEffect, useState, useCallback } from 'react';
import userApiModule from '@/components/shared/api/modules/auth';
import { useLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@/components/shared/api';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/layouts/navbar';
import { ROLE_PERMISSIONS, UserRole } from '@/utils/permissions';

function isValidRole(role: string): role is UserRole {
  return ['ADMIN', 'USER', 'GUEST'].includes(role);
}

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLocalStorage } = useLocalStorage();
  const user_id = getLocalStorage('id');
  const token = getLocalStorage('auth_token');
  const role = isValidRole(getLocalStorage('role') || '') 
    ? getLocalStorage('role') 
    : 'GUEST';

  const [isInitialized, setIsInitialized] = useState(false);

  const { error, isPending, mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error(`Token not found. ${error}`);
      }
      return await userApiModule.getMe({ authToken: token });
    },
  });

  const checkRouteAccess = useCallback(
    (currentRole: UserRole, currentPathname: string) => {
      const permissions = ROLE_PERMISSIONS[currentRole];
      
      if (permissions.restrictedRoutes.some((route) => currentPathname.startsWith(route))) {
        router.push('/');
        return false;
      }

      if (!permissions.allowedRoutes.some((route) => currentPathname.startsWith(route))) {
        router.push('/');
        return false;
      }

      return true;
    },
    [router]
  );

  useEffect(() => {
    if (token) {
      mutate();
    }
  }, [token, mutate]);

  useEffect(() => {
    if (!isPending) {
      setIsInitialized(true);
    }
  }, [isPending]);

  useEffect(() => {
    if (isInitialized && !isPending) {
      if (!user_id && !ROLE_PERMISSIONS.GUEST.allowedRoutes.includes(pathname)) {
        router.push('/');
        return;
      }

      checkRouteAccess(role as UserRole, pathname);
    }
  }, [isInitialized, isPending, pathname, role, router, checkRouteAccess, user_id]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
