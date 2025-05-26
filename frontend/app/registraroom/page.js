'use client';
import { useState } from 'react';

export default function RegisterRoomPage() {
  const [form, setForm] = useState({
    titre: '',
    ville: '',
    quartier: '',
    prix: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Fonction de publication à venir !");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Publier une chambre</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          name="titre"
          placeholder="Titre de l'annonce"
          value={form.titre}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="ville"
          placeholder="Ville"
          value={form.ville}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="quartier"
          placeholder="Quartier"
          value={form.quartier}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="prix"
          placeholder="Loyer mensuel"
          value={form.prix}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description détaillée"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Publier
        </button>
      </form>
    </div>
  );
}