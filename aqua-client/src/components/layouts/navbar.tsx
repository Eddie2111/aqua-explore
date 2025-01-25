"use client";
import Link from 'next/link';

import { useLocalStorage } from '@/utils/localStorage';

export default function Header() {
  const { getLocalStorage } = useLocalStorage();
  const user_id = getLocalStorage('id');
  const role = getLocalStorage('role');
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AquaExplore
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link href={`/${role?.toLocaleLowerCase()}/dashboard/`} className="hover:text-blue-200">
                Dashboard
              </Link>
            </li>
            <li>
              {
                user_id ? (
                  <Link href="/logout" className="hover:text-blue-200">
                    Logout
                  </Link>
                ) :
                  <div className="flex flex-row gap-2">
                    <Link href="/signup" className="hover:text-blue-200">
                      Register
                    </Link>
                    <Link href="/login" className="hover:text-blue-200">
                      Login
                    </Link>
                  </div>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
