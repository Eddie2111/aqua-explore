'use client';
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
          <ul className="flex">
            <li className="mt-2">
              <Link
                href="/"
                className="bg-white rounded-lg px-5 py-2 mx-2 hover:shadow-sm hover:shadow-blue-400 duration-300 font-semibold text-black mt-4"
              >
                Home
              </Link>
            </li>
            <li className="mt-2">
              {role && (
                <Link
                  href={`/${role?.toLocaleLowerCase()}/dashboard/`}
                  className="bg-white rounded-lg px-3 py-2 hover:shadow-sm hover:shadow-blue-400 duration-300 font-semibold text-black mx-2"
                >
                  Dashboard
                </Link>
              )}
            </li>
            <li className="mt-2">
              {user_id ? (
                <Link
                  href="/logout"
                  className="bg-white rounded-lg px-3 py-2 hover:shadow-sm hover:shadow-blue-400 duration-300 font-semibold text-black"
                >
                  Logout
                </Link>
              ) : (
                <div className="flex flex-row gap-2">
                  <Link
                    href="/signup"
                    className="bg-white rounded-lg px-3 py-2 hover:shadow-sm hover:shadow-blue-400 duration-300 font-semibold text-black"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="bg-white rounded-lg px-3 py-2 hover:shadow-sm hover:shadow-blue-400 duration-300 font-semibold text-black"
                  >
                    Login
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
