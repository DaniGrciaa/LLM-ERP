import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatPanel from './components/ChatPanel';
import CyberBackground from './components/CyberBackground';
import StatsCharts from './components/StatsCharts';
import { chatService } from './services/chatService';

export default function App() {
  const [model, setModel] = useState('gemini-2.0-flash');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/dashboard`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch(err) {
      console.error("Error fetching dashboard", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
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
      fetchDashboard();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-slate-200">
      <CyberBackground />
      <Header model={model} setModel={setModel} onNewChat={handleNewChat} />

      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden relative z-0 p-4 gap-4 max-w-[1600px] w-full mx-auto">
        <div className="w-full xl:w-1/2 h-full shadow-2xl flex flex-col">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            onSendMessage={handleSendMessage}
          />
        </div>

        <div className="w-full xl:w-1/2 h-full shadow-2xl flex flex-col overflow-y-auto pr-2 pb-10">
          <div className="bg-black/40 border border-slate-800 rounded-lg p-6 backdrop-blur-md mb-4">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">Panel de Control: Stock Atelier</h2>
            <p className="text-sm text-slate-400 mb-6">El dashboard se actualiza instantáneamente con las operaciones que el Agente IA realiza sobre la base de datos.</p>
            {dashboardData ? (
              <StatsCharts stockData={dashboardData.stockPorCategoria} desechosData={dashboardData.desechos} />
            ) : (
              <div className="text-center text-slate-500 py-10">Cargando estadísticas...</div>
            )}
          </div>
          {dashboardData && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-black/40 border border-cyan-900/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-cyan-300">{dashboardData.totalProductos}</div>
                <div className="text-xs text-cyan-600 uppercase mt-1">Total Productos</div>
              </div>
              <div className="bg-black/40 border border-cyan-900/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-cyan-300">{dashboardData.unidadesStock}</div>
                <div className="text-xs text-cyan-600 uppercase mt-1">Unidades (Stock)</div>
              </div>
              <div className="bg-black/40 border border-red-900/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-500">{dashboardData.productosBajoStock}</div>
                <div className="text-xs text-red-700 uppercase mt-1">Bajo Stock</div>
              </div>
              <div className="bg-black/40 border border-red-900/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-500">${dashboardData.perdidasDesechos?.toFixed(2) || 0}</div>
                <div className="text-xs text-red-700 uppercase mt-1">Pérdidas</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
