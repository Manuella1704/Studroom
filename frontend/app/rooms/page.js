'use client'

import { useEffect, useState } from 'react'
import RoomCard from '../components/ui/RoomCard'
import { Wifi, Bed } from 'lucide-react'

export default function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [ville, setVille] = useState('')
  const [quartier, setQuartier] = useState('')
  const [wifi, setWifi] = useState(false)
  const [meuble, setMeuble] = useState(false)
  const [prixMax, setPrixMax] = useState(0)
  const [prixMaxLimite, setPrixMaxLimite] = useState(10000)
  const [villes, setVilles] = useState([])
  const [quartiers, setQuartiers] = useState([])
  const [favoris, setFavoris]= useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/chambres/')
      .then(res => res.json())
      .then(data => {
        const uniqueVilles = [...new Set(data.map(r => r.ville))];
        const uniqueQuartiers = [...new Set(data.map(r => r.quartier))];
        const maxPrix = Math.max(...data.map(r => r.prix))
        const fetchFavoris = async () => {
          const token = localStorage.getItem('access');
          if (!token) return;
        
          try {
            const res = await fetch('http://localhost:8000/favoris/', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await res.json();
            const ids = data.map(f => f.chambre.id);
            setFavoris(ids);
          } catch (err) {
            console.error('Erreur fetch favoris', err);
          }
        };
  
        setVilles(uniqueVilles);
        setQuartiers(uniqueQuartiers);
        setPrixMaxLimite(maxPrix)
        setPrixMax(maxPrix) // valeur initiale
        setRooms(data);
        fetchFavoris(); 
      })
      .catch(err => console.error("Erreur lors du chargement", err));
  }, []);

  const handleFilter = async () => {
    const params = new URLSearchParams()
    if (ville) params.append('ville', ville)
    if (quartier) params.append('quartier', quartier)
    if (wifi) params.append('wifi', 'true')
    if (meuble) params.append('meuble', 'true')
    params.append('prix_max', prixMax)

    const res = await fetch(`http://localhost:8000/chambres/?${params.toString()}`)
    const data = await res.json()
    setRooms(data)
  }

  const toggleFavorite = async (chambreId) => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('Vous devez être connecté pour ajouter en favoris.');
      return;
    }
  
  const isFav = favoris.includes(chambreId);
    try {
      const res = await fetch(`http://localhost:8000/favoris/${isFav ? chambreId + '/' : ''}`, {
        method: isFav ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: isFav ? null : JSON.stringify({ chambre: chambreId }),
      });
  
      if (res.ok) {
        setFavoris(prev =>
          isFav ? prev.filter(id => id !== chambreId) : [...prev, chambreId]
        );
      }
    } catch (error) {
      console.error('Erreur toggle favoris', error);
    }
  };

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      {/* Bloc d’intro + filtres (juste sous le header) */}
      <section className="w-full px-6 lg:px-24 pt-20 pb-10 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#2C4A8A]">Explorez nos chambres étudiantes disponibles au Cameroun</h1>
        <p className="text-center text-[#2C4A8A] mb-6">Des logements vérifiés et sécurisés à proximité des campus universitaires</p>

        <div className="grid grid-cols-6 gap-4 items-end w-full">
          <div className="w-full">
            <label className="text-base text-[#2C4A8A] mb-2 block">Ville</label>
            <select
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 w-full"
            >
              <option value="">Toutes les villes</option>
              {villes.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="w-full">
            <label className="text-base text-[#2C4A8A] mb-2 block">Quartier</label>
            <select
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 w-full"
            >
              <option value="">Tous les quartiers</option>
              {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            {/* Checkbox WiFi */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="wifi" checked={wifi} onChange={() => setWifi(!wifi)} />
              <label htmlFor="wifi" className="text-base text-[#2C4A8A] flex items-center gap-1">
                <Wifi size={16} /> WiFi
              </label>
            </div>

            {/* Checkbox Meublé */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="meuble" checked={meuble} onChange={() => setMeuble(!meuble)} />
              <label htmlFor="meuble" className="text-base text-[#2C4A8A] flex items-center gap-1">
                <Bed size={16} /> Meublé
              </label>
            </div>
          </div>

          <div className="flex items-end gap-20">
            <div className="flex flex-col">
              <label className="text-base text-[#2C4A8A] mb-1">Prix Max: {prixMax} FCFA</label>
              <input
                type="range"
                min={10000}
                max={prixMaxLimite}
                value={prixMax}
                onChange={(e) => setPrixMax(parseInt(e.target.value))}
                className="w-[600px] accent-[#2C4A8A]"
              />
            </div>

            <button
              onClick={handleFilter}
              className="bg-[#2C4A8A] text-white px-6 py-2 rounded-md hover:bg-slate-700"
            >
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="w-full px-6 lg:px-24 py-8">
        <p className="text-lg font-semibold text-gray-800 mb-4">{rooms.length} chambres trouvées</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              isFavorite={favoris.includes(room.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  )
}