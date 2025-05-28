"use client";

import { useEffect, useState } from "react";
import RoomCard from "../components/ui/RoomCard";

export default function FavoritePage() {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoris = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/favoris/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setFavoris(data);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoris();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes favoris</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : favoris.length === 0 ? (
        <p className="text-gray-500">Aucune chambre dans vos favoris.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.map((favori) => (
            <RoomCard key={favori.id} room={favori.chambre} />
          ))}
        </div>
      )}
    </div>
  );
}
