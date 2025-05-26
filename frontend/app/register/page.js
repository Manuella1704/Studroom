'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ville, setVille] = useState('');
  const [universite, setUniversite] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          ville,
          universite,
          role: "etudiant",
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Inscription réussie !");
        window.location.href = "/login";
      } else {
        alert("Erreur : " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Illustration à gauche */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#e2f3ff] to-[#ffffff] transition-all duration-700 ease-in-out">
        <Image
          src="/A_2D_digital_illustration_depicts_a_registration_p.png"
          alt="Illustration"
          width={500}
          height={500}
          className="object-contain animate-fade-in-up"
        />
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Rejoins Roomia</h2>
        <p className="text-sm text-gray-600 px-8 text-center">Inscris-toi et trouve une chambre idéale près de ton campus.</p>
      </div>

      {/* Formulaire d’inscription */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md space-y-6 animate-slide-in-right">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Créer un compte</h2>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>S’inscrire avec Google</span>
          </button>

          <div className="relative text-center">
            <span className="text-gray-400 px-2 bg-white z-10 relative">ou avec e-mail</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-b border-gray-300 w-full"></div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="text"
              placeholder="Ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Université"
              value={universite}
              onChange={(e) => setUniversite(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#2C4A8A] text-white rounded-md hover:bg-[#2C4A8A] transition font-medium"
            >
              Créer le compte
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-[#2C4A8A] hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}