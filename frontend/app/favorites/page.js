"use client";

import { useEffect, useState } from "react";
import RoomCard from "../components/ui/RoomCard";
import refresh_token, { getAccesToken } from "app/utils/refresh_token";

export default function FavoritePage() {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoris = async () => {
      const token = await getAccesToken();
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

  const toggleFavorite = async (chambreId) => {
    const token = await getAccesToken();
    if (!token) {
      alert("Veuillez vous connecter pour ajouter une chambre en favori.");
      return;
    }

    const isAlreadyFavorite = true;
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
            ? prev.filter((fav) => fav.chambre.id !== chambreId)
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
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes favoris</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : favoris.length === 0 ? (
        <p className="text-gray-500">Aucune chambre dans vos favoris.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris &&
            favoris.map((favori) => (
              <RoomCard
                key={favori.id}
                room={favori.chambre}
                toggleFavorite={toggleFavorite}
                isFavorite={favoris.includes(favori)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
