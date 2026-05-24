import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatPanel from './components/ChatPanel';
import CyberBackground from './components/CyberBackground';
import { chatService } from './services/chatService';

export default function App() {
  const [model, setModel] = useState('gemini-2.0-flash');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial greeting
    setMessages([
      { role: 'bot', text: "Bienvenido a Stock Atelier. Soy tu agente ERP inteligente. Puedes pedirme que gestione productos, proveedores, pedidos, desechos o estadísticas." }
    ]);
  }, []);

  const handleNewChat = () => {
    setMessages([
      { role: 'bot', text: "Conexión reiniciada. ¿En qué te ayudo ahora?" }
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatService.sendMessage(userMsg, model);
      setMessages(prev => [...prev, { role: 'bot', text: result.answer }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Error de red: No he podido enlazar con el Core del ERP."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-slate-200">
      <CyberBackground />
      <Header model={model} setModel={setModel} onNewChat={handleNewChat} />

      <div className="flex-1 flex flex-col overflow-hidden relative z-0">
        <div className="w-full max-w-5xl mx-auto h-full shadow-2xl">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
