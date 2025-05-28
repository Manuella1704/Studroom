"use client";

import { useEffect, useState } from "react";
import RoomCard from "./components/ui/RoomCard";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { HeartHandshake } from "lucide-react";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAccesToken } from "./utils/refresh_token";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [villes, setVilles] = useState([]);
  const [search, setSearch] = useState("");
  const [ville, setVille] = useState("");
  const [favoris, setFavoris] = useState([]);
  const router = useRouter();

  async function fetchFavoris() {
    const token = await getAccesToken();
    if (!token) return;

    console.log("Token:", token);

    try {
      const res = await fetch("http://localhost:8000/favoris/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Erreur Favoris:", error.detail);
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Données inattendues:", data);
        return;
      }

      if (data.length === 0) {
        console.log("Aucun favori trouve");
        return;
      }

      const ids = data.map((f) => f.chambre.id);
      setFavoris(ids);
    } catch (error) {
      console.error("Erreur chargement favoris:", error);
    }
  }

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("http://localhost:8000/chambres/");
        const data = await res.json();
        setRooms(data);

        const uniqueVilles = [...new Set(data.map((r) => r.ville))];
        setVilles(uniqueVilles.slice(0, 4)); // max 4 villes populaires
      } catch (error) {
        console.error("Erreur chargement chambres", error);
      }
    }

    fetchRooms();
    fetchFavoris();
  }, []);

  const toggleFavorite = async (chambreId) => {
    const token = await getAccesToken();
    if (!token) {
      alert("Veuillez vous connecter pour ajouter une chambre en favori.");
      return;
    }

    const isAlreadyFavorite = favoris.includes(chambreId);
    const url = "http://localhost:8000/favoris/";
    try {
      const res = await fetch(url, {
        method: isAlreadyFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chambre: chambreId }),
      });

      if (res.ok) {
        setFavoris((prev) =>
          isAlreadyFavorite
            ? prev.filter((id) => id !== chambreId)
            : [...prev, chambreId]
        );
      } else {
        const err = await res.json();
        alert(err?.detail || "Erreur lors du traitement.");
      }
    } catch (error) {
      console.error("Erreur favoris :", error);
    }
  };

  return (
    <main className="w-full bg-[#F3F4F6]">
      {/* Bloc Héro */}
      <section className="w-full bg-[#F3F4F6] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
          {/* Texte à gauche */}
          <div className="lg:w-1/2 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-[#2C4A8A]">
              Un clic, un toit. <br /> Une année universitaire réussie.
            </h1>
            <p className="mb-6 text-[#374151] text-base leading-relaxed">
              Découvrez des logements vérifiés par nos agents certifiés autour
              des universités au Cameroun.
            </p>

            {/* Champs de recherche */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Ville (ex: Buea)"
                className="px-4 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-1/2"
              />
              <input
                type="text"
                placeholder="Quartier, université..."
                className="px-4 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-1/2"
              />
              <button className="bg-[#2C4A8A] text-white px-6 py-2 rounded-md text-sm hover:bg-[#1e3a6a] transition">
                Rechercher
              </button>
            </div>

            <p className="text-[#34D399] text-sm font-medium underline cursor-pointer">
              Trouver une chambre avec l’assistant
            </p>
          </div>

          {/* Image nuage à droite */}
          <div className="lg:w-1/2 w-full max-w-xl mx-auto">
            <svg viewBox="0 0 500 500" className="w-full h-auto scale-[1.35]">
              <defs>
                <clipPath id="cloud-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0.6,0.1 C0.8,0.1,0.9,0.2,1,0.4 C1,0.5,0.95,0.65,0.8,0.7 C0.85,0.85,0.7,1,0.5,0.95 C0.35,1,0.15,0.9,0.1,0.75 C0,0.6,0.1,0.4,0.3,0.35 C0.2,0.2,0.3,0.1,0.6,0.1 Z" />
                </clipPath>
              </defs>
              <image
                href="/student-room.jpg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#cloud-clip)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Villes populaires */}
      <section className="py-12 px-6 lg:px-20 text-center">
        <h2 className="text-2xl font-semibold text-[#2C4A8A] mb-8">
          Villes populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {villes.map((ville, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <p className="font-semibold text-[#2C4A8A]">{ville}</p>
              <p className="text-sm text-gray-500">
                {rooms.filter((r) => r.ville === ville).length} logements
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Annonces populaires */}
      <section className="py-12 px-6 lg:px-20 bg-[#F3F4F6]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2C4A8A]">
            Annonces populaires
          </h2>
          <Link
            href="/rooms"
            className="text-[#2C4A8A] text-sm hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.slice(0, 3).map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isFavorite={favoris.includes(room.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-[#F3F4F6]">
        <h2 className="text-center text-2xl font-semibold text-[#2C4A8A] mb-12">
          Comment ça marche
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <Search size={48} className="text-[#2C4A8A]" />
            <h3 className="text-lg font-semibold text-[#374151]">Recherchez</h3>
            <p className="text-sm text-gray-600">
              Parcourez notre catalogue de chambres vérifiées autour de votre
              université.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <HeartHandshake size={48} className="text-[#2C4A8A]" />
            <h3 className="text-lg font-semibold text-[#374151]">Favoris</h3>
            <p className="text-sm text-gray-600">
              Choisissez votre logement idéal et réservez en quelques clics.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Package size={48} className="text-[#2C4A8A]" />
            <h3 className="text-lg font-semibold text-[#374151]">Emménagez</h3>
            <p className="text-sm text-gray-600">
              Installez-vous sereinement dans votre nouveau logement étudiant
              certifié.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-[#EFF6FF] py-16 px-6 lg:px-20">
        <h2 className="text-2xl font-semibold text-[#2C4A8A] mb-6">
          Notre engagement pour votre sécurité
        </h2>
        <p className="text-gray-600 mb-6">
          Chez Roomia, nous vérifions chaque logement avec des agents certifiés
          pour garantir la qualité et la sécurité des chambres proposées.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li>Chambres inspectées par nos agents</li>
          <li>Photos vérifiées et récentes</li>
          <li>Support 24/7 pour les étudiants</li>
        </ul>
      </section>

      {/* Call to action */}
      <section className="bg-[#2C4A8A] text-white text-center py-16">
        <h2 className="text-2xl font-bold mb-4">
          Prêt à trouver votre chambre étudiante idéale ?
        </h2>
        <p className="mb-6">
          Rejoignez Roomia et trouvez un logement sécurisé pour votre année
          universitaire
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-white text-[#2C4A8A] px-6 py-2 rounded hover:bg-gray-100"
          >
            S'inscrire gratuitement
          </Link>
          <Link
            href="/rooms"
            className="bg-[#34D399] text-white px-6 py-2 rounded hover:bg-[#2bb183]"
          >
            Parler à l’assistant
          </Link>
        </div>
      </section>
    </main>
  );
}
