import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatPanel from './components/ChatPanel';
import CyberBackground from './components/CyberBackground';
import InventorySummary from './components/InventorySummary';
import StatsCharts from './components/StatsCharts';
import ProductTable from './components/ProductTable';
import ActivityFeed from './components/ActivityFeed';
import { chatService } from './services/chatService';

export default function App() {
  const [model, setModel] = useState('gemini-2.0-flash');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalProductos: 0,
    unidadesStock: 0,
    productosBajoStock: 0,
    perdidasDesechos: 0,
    productos: [],
    stockPorCategoria: [],
    desechos: [],
    actividadReciente: []
  });

  const fetchDashboard = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      const res = await fetch(`${backendUrl}/api/dashboard`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (e) {
      console.error("Error fetching dashboard", e);
    }
  };

  useEffect(() => {
    // Initial greeting
    setMessages([
      { role: 'bot', text: "Bienvenido a Stock Atelier. Soy tu agente ERP inteligente. Puedes pedirme que gestione productos, proveedores, pedidos, desechos o estadísticas." }
    ]);
    fetchDashboard();
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

      // Ya no insertamos actividad mockeada, re-consultamos al backend
      await fetchDashboard();

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

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-0">
        {/* Left Column: Chat */}
        <div className="w-full lg:w-[40%] xl:w-[35%] h-[50vh] lg:h-full">
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Column: Dashboard */}
        <div className="w-full lg:w-[60%] xl:w-[65%] h-[50vh] lg:h-full overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
          <div className="max-w-5xl mx-auto">
            <InventorySummary data={dashboardData} />
            <StatsCharts
              stockData={dashboardData.stockPorCategoria}
              desechosData={dashboardData.desechos}
            />
            <ProductTable products={dashboardData.productos} />
            <ActivityFeed activities={dashboardData.actividadReciente} />
          </div>
        </div>
      </div>
    </div>
  );
}
