'use client';
import { useLocalStorage } from '@/utils/localStorage';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { clearLocalStorage } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    clearLocalStorage();
    router.push('/');
  }, [router, clearLocalStorage]);

  return <LoadingSpinner />;
}
