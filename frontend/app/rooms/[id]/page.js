'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import ReportForm from "../../components/ui/ReportForm";


export default function RoomDetailPage() {
  const [room, setRoom] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);


  useEffect(() => {
    setRoom({
      id: 1,
      title: 'Studio moderne meublé à Molyko, Buea',
      location: 'Molyko, Buea, Sud-Ouest',
      price: 45000,
      area: '20 m²',
      type: 'Studio',
      distance: '10 min à pied',
      caution: '2 mois',
      isAvailable: true,
      description: `Ce studio moderne et confortable est idéalement situé dans le quartier étudiant de Molyko...`,
      images: [
        '/api/placeholder/1200/600',
        '/api/placeholder/300/200',
        '/api/placeholder/300/200',
        '/api/placeholder/300/200',
        '/api/placeholder/300/200'
      ],
      rating: 4.5,
      reviews: 42,
      bailleur: {
        nom: "Agence ImmoStar",
        telephone: "+237 6 99 99 99 99",
        email: "contact@immostar.cm",
      }
    });
  }, []);

  if (!room) return <div className="p-8">Chargement...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4 text-sm text-gray-500">
        <a href="/" className="hover:text-blue-800">Accueil</a> &gt; 
        <a href="#" className="hover:text-blue-800">Buea</a> &gt; 
        <span className="text-gray-700">{room.title}</span>
      </div>

      {/* Image principale */}
      <div className="rounded-xl overflow-hidden relative mb-4">
        <img src={room.images[0]} alt="Chambre" className="w-full h-[300px] md:h-[500px] object-cover" />
        <button className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100">
          <i className="far fa-heart text-blue-800 text-xl"></i>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto mb-6">
        {room.images.slice(1).map((img, i) => (
          <img key={i} src={img} alt={`thumb-${i}`} className="w-24 h-24 rounded-lg object-cover border hover:border-blue-800" />
        ))}
      </div>

      {/* Détails */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{room.title}</h1>
          <div className="text-gray-600 flex items-center space-x-3">
            <i className="fas fa-map-marker-alt text-blue-800"></i>
            <span>{room.location}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, idx) => (
                <i key={idx} className={`fas fa-star ${idx < Math.floor(room.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
              ))}
              <span className="ml-1 text-sm">({room.reviews} avis)</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Prix mensuel</p>
          <p className="text-2xl font-bold text-blue-800">{room.price.toLocaleString()} FCFA</p>
          <Link
            href="/favorites"
            className="bg-blue-800 hover:bg-blue-900 mt-3 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center"
          >
            <i className="far fa-heart mr-2"></i>
            Voir mes favoris
          </Link>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-600">{room.description}</p>
      </div>

      {/* Infos du bailleur */}
      <div className="mt-6 p-4 border rounded bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Contact du bailleur</h3>
        <p className="text-sm text-gray-700">Nom : {room.bailleur.nom}</p>
        <p className="text-sm text-gray-700">Téléphone : {room.bailleur.telephone}</p>
        <p className="text-sm text-gray-700">Email : {room.bailleur.email}</p>
      </div>

      {/* Boutons d'action */}
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => alert("Fonction de contact en développement...")}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Contacter le publieur
        </button>
        <button
          onClick={() => setShowReportForm(true)}
          className="w-full sm:w-auto bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
        >
          Signaler cette annonce
        </button>


      </div>


    {/* ICI : en bas du return mais toujours à l’intérieur du parent */}
    {showReportForm && (
      <ReportForm
        chambreId={room.id}
        onClose={() => setShowReportForm(false)}
      />
    )}
    </div>
  );
  
}