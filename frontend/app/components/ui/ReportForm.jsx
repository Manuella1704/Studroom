"use client";
import { useState } from "react";

export default function ReportForm({ chambreId, onClose }) {
  const [motif, setMotif] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Veuillez vous connecter.");
      return;
    }
    

    const res = await fetch("http://localhost:8000/signalements/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        chambre: chambreId,
        motif: `${motif} - ${message}`,
      }),
    });

    if (res.ok) {
      alert("Signalement envoyé.");
      onClose();
    } else {
      const err = await res.json();
      alert(err?.detail || "Erreur.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Signaler cette annonce
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motif *
            </label>
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ex: annonce frauduleuse"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Détails (optionnel)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Expliquez brièvement le problème..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
