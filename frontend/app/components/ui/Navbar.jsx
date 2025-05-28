'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Écoute les changements dans le localStorage
    const checkAuth = () => {
      const token = localStorage.getItem('access');
      setIsAuthenticated(!!token);
    };

    checkAuth(); // au chargement
    window.addEventListener('storage', checkAuth); // quand localStorage change

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Roomia Logo" width={36} height={36} />
          <Link href="/" className="text-xl font-bold text-[#2C4A8A]">Roomia</Link>
        </div>

        <div className="flex gap-6 items-center text-sm font-medium text-[#374151]">
          <Link href="/">Accueil</Link>
          <Link href="/rooms">Chambres</Link>
          <Link href="/favorites">Favoris</Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('access');
                  localStorage.removeItem('refresh');
                  window.location.href = '/';
                }}
                className="text-red-600 hover:underline"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link href="/login" className="text-[#2C4A8A] hover:underline">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
}