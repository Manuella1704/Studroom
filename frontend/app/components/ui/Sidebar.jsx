// components/ui/Sidebar.jsx
"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600">StudRoom</h1>
      <nav className="flex flex-col gap-3 text-gray-700">
        <Link href="/dashboard" className="hover:text-indigo-500">Accueil</Link>
        <Link href="/dashboard/mes-chambres" className="hover:text-indigo-500">Mes chambres</Link>
        <Link href="/dashboard/ajouter" className="hover:text-indigo-500">Ajouter une chambre</Link>
        <Link href="/dashboard/annonces" className="hover:text-indigo-500">Mes annonces</Link>
        <Link href="/dashboard/favoris" className="hover:text-indigo-500">Favoris</Link>
        <Link href="/dashboard/profil" className="hover:text-indigo-500">Mon profil</Link>
        <button className="text-red-600 hover:underline text-left">Déconnexion</button>
      </nav>
    </aside>
  );
}