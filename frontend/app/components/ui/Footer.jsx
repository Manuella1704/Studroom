'use client';

export default function Footer() {
  return (
    <footer className="bg-[#2C4A8A] text-white text-sm mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold text-base mb-2">Roomia</h4>
          <p>La plateforme de logement étudiant sécurisé au Cameroun.</p>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-2">Navigation</h4>
          <ul className="space-y-1">
            <li><a href="/">Accueil</a></li>
            <li><a href="/rooms">Chambres</a></li>
            <li><a href="/favorite">Favoris</a></li>
            <li><a href="/login">Connexion</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-2">À propos</h4>
          <ul className="space-y-1">
            <li><a href="#">Qui sommes-nous ?</a></li>
            <li><a href="#">Notre mission</a></li>
            <li><a href="#">Sécurité</a></li>
            <li><a href="#">Témoignages</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base mb-2">Assistance</h4>
          <ul className="space-y-1">
            <li><a href="#">Centre d’aide</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Signaler un problème</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-4 text-xs">
        © 2025 Roomia. Tous droits réservés.
      </div>
    </footer>
  );
}