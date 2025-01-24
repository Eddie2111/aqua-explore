import Link from 'next/link';

export default function Header() {
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
              <Link href="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-200">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
