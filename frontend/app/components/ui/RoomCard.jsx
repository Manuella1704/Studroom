'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, HeartOff, Wifi, Bed, Droplet } from 'lucide-react'

export default function RoomCard({ room, isFavorite, toggleFavorite }) {
  const prixFormat = new Intl.NumberFormat('fr-FR').format(room.prix)

  console.log(room);
  

  

  return (
    <div className="relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden w-full h-full">
      {/* Badge */}
      <span className="absolute top-2 right-2 bg-[#34D399] text-white text-xs px-2 py-0.5 rounded shadow-sm z-10">
        Disponible
      </span>

      {/* Image */}
      {(room && room.images && room.images.length > 0) ? (
        <Image
          src={room.images[0].image}
          alt={`Image de ${room.titre}`}
          width={500}
          height={280}
          className="w-full h-[180px] object-cover"
        />
      ) : (
        <div className="w-full h-[180px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
          Aucune image disponible
        </div>
      )}

      {/* Contenu */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-1">{room.titre}</h3>
          <p className="text-xs text-gray-500">{room.quartier}, {room.ville}</p>
          <p className="text-slate-800 font-semibold text-sm mt-1">{prixFormat} FCFA/mois</p>

          {/* Étoiles fictives */}
          <div className="flex gap-1 mb-2 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-[#FBBF24]"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.448a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.538 1.118l-3.36-2.448a1 1 0 00-1.175 0l-3.36 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
            {room.wifi_disponible && (
              <div className="flex items-center gap-1"><Wifi size={14} /> WiFi</div>
            )}
            {room.est_meublee && (
              <div className="flex items-center gap-1"><Bed size={14} /> Meublé</div>
            )}
            {room.douche_interne && (
              <div className="flex items-center gap-1"><Droplet size={14} /> Douche</div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-100">
          <Link href={`/rooms/${room.id}`} className="text-xs text-slate-800 hover:underline">
            Voir plus
          </Link>
          <button
            onClick={() => toggleFavorite(room.id)}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500"
          >
            {isFavorite ? (
              <>
                <HeartOff size={16} className="text-red-500" />
                Retirer
              </>
            ) : (
              <>
                <Heart size={16} className="text-gray-400" />
                Favori
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}