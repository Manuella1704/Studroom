'use client';

import { useState } from 'react';
import { MessageCircle, X, Home, HelpCircle, MessageSquare } from 'lucide-react';

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Je suis l’assistant Roomia. Comment puis-je vous aider ?' }
  ]);
  const sendToAssistant = async (question) => {
    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Erreur lors de l’envoi au chatbot :', error);
      return "Désolé, une erreur est survenue.";
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
  
    const userMessage = message;
    setMessages([...messages, { from: 'user', text: userMessage }]);
    setMessage('');
  
    const botReply = await sendToAssistant(userMessage);
  
    setMessages((prev) => [
      ...prev,
      { from: 'bot', text: botReply }
    ]);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col h-full p-5 text-sm text-gray-700 bg-white bg-opacity-100 justify-between">
            {/* En-tête de bienvenue */}
            <div>
              <h2 className="text-xl font-semibold text-[#2C4A8A] mb-2">Poser une question</h2>
              <p className="text-gray-600 text-base mb-4">Notre bot et notre équipe peuvent vous aider</p>
              <hr className="my-2 border-gray-300" />
              <h3 className="text-md font-semibold text-gray-800 mb-2">Trouver une réponse</h3>
              <ul className="text-gray-600 space-y-2 pl-4 list-disc">
                <li>Comment contacter Roomia ?</li>
                <li>Tout savoir sur les logements vérifiés</li>
                <li>Support disponible 24/7</li>
              </ul>
            </div>
      
            {/* Footer visuel */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-400">Roomia • Assistance intelligente</p>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            {/* Zone de messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.from === 'bot'
                      ? 'bg-gray-100 text-gray-800 self-start'
                      : 'bg-blue-100 text-blue-900 self-end'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
        
            {/* Zone de saisie */}
            <div className="flex items-center border-t p-3">
              <input
                type="text"
                placeholder="Tapez votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-[#2C4A8A] text-white px-4 py-2 rounded-r-md hover:bg-[#1e3a6a] transition"
              >
                Envoyer
              </button>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="p-4 text-sm text-gray-700 space-y-3">
            <p className="font-semibold">Collections d’aide</p>
            <ul className="list-disc pl-4 text-gray-600 space-y-1">
              <li>Réserver une chambre</li>
              <li>Créer un compte Roomia</li>
              <li>Problèmes fréquents</li>
              <li>Garantie logement</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-5">
     {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="relative w-14 h-14 bg-white shadow-md border border-gray-200 rounded-full flex items-center justify-center transition hover:scale-110"
        >
          {/* Animation pulsée */}
          <span className="absolute w-full h-full animate-ping-siri rounded-full bg-[#f0f0f0]"></span>
          <span className="absolute w-9 h-9 animate-pulse-siri rounded-full bg-white"></span>

          {/* Icône assistant */}
          <MessageCircle className="w-6 h-6 text-[#2C4A8A]" />
        </button>
      ) : (
        <div className="w-[400px] h-[520px] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 flex flex-col z-[9999]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#2C4A8A] text-white p-4">
            <h3 className="font-semibold text-lg">Assistant Roomia</h3>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">{renderTabContent()}</div>

          {/* Footer navigation */}
          <div className="flex justify-around border-t p-2 text-xs text-gray-600">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center \${activeTab === 'home' ? 'text-[#2C4A8A]' : ''}`}>
              <Home size={16} />
              Accueil
            </button>
            <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center \${activeTab === 'chat' ? 'text-[#2C4A8A]' : ''} `}>
              <MessageSquare size={16} />
              Conversations
            </button>
            <button onClick={() => setActiveTab('help')} className={`flex flex-col items-center \${activeTab === 'help' ? 'text-[#2C4A8A]' : ''}`}>
              <HelpCircle size={16} />
              Aide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}