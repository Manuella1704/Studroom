// app/dashboard/page.js
'use client';

import Link from "next/link";

export default function StudentDashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Bienvenue sur ton espace étudiant
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/favorite"
          className="block bg-blue-50 hover:bg-blue-100 transition border border-blue-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Voir mes favoris</h3>
          <p className="text-gray-600 text-sm">Consulte les chambres que tu as ajoutées en favori pour mieux comparer.</p>
        </Link>

        <Link
          href="/registeraroom"
          className="block bg-green-50 hover:bg-green-100 transition border border-green-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-green-700 mb-2">Publier une chambre</h3>
          <p className="text-gray-600 text-sm">Tu quittes ton logement ? Publie une chambre pour aider un autre étudiant.</p>
        </Link>

        <button
          onClick={() => alert("Fonction à implémenter…")}
          className="bg-red-50 hover:bg-red-100 transition border border-red-200 rounded-xl p-6 text-left shadow-sm"
        >
          <h3 className="text-xl font-semibold text-red-700 mb-2">Supprimer mon compte</h3>
          <p className="text-gray-600 text-sm">Attention : cette action est irréversible.</p>
        </button>

        <Link
          href="/"
          className="block bg-gray-50 hover:bg-gray-100 transition border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Retour à l'accueil</h3>
          <p className="text-gray-600 text-sm">Explorer d'autres annonces ou discuter avec l'assistant StudRoom.</p>
        </Link>
      </div>
    </div>
  );
}