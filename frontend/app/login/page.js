'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        alert("Connexion réussie !");
        // Redirige vers l’accueil ou le tableau de bord étudiant
        router.push('/');
        router.refresh();
      } else {
        alert("Erreur de connexion : " + (data.detail || "identifiants invalides"));
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
    }
  };
  const router= useRouter();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#e2f3ff] to-[#ffffff] transition-all duration-700 ease-in-out">
        <Image
          src="/A_2D_digital_illustration_depicts_a_registration_p.png"
          alt="Illustration"
          width={500}
          height={500}
          className="object-contain animate-fade-in-up"
        />
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Bienvenue sur Roomia</h2>
        <p className="text-sm text-gray-600 px-8 text-center">Connecte-toi pour trouver ta chambre idéale près de l’université.</p>
      </div>

      {/* Right Side Login Form */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md space-y-6 animate-slide-in-right">
          <h2 className="text-3xl font-bold text-[#2C4A8A] text-center">Connexion</h2>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Se connecter avec Google</span>
          </button>

          <div className="relative text-center">
            <span className="text-gray-400 px-2 bg-white z-10 relative">ou avec e-mail</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-b border-gray-300 w-full"></div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button
              type="submit"
              className="w-full py-3 bg-[#2C4A8A] text-white rounded-md hover:bg-[#2C4A8A] transition font-medium"
            >
              Se connecter
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#2C4A8A] hover:underline">S’inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}