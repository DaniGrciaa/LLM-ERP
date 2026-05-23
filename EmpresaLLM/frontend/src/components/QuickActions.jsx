import React from 'react';
import { Package, AlertTriangle, BarChart2, CalendarX, Users, ShoppingCart } from 'lucide-react';

export default function QuickActions({ onAction }) {
  const actions = [
    { label: "Ver productos", icon: <Package size={14} />, cmd: "Lista todos los productos activos." },
    { label: "Bajo stock", icon: <AlertTriangle size={14} />, cmd: "Muestra los productos con bajo stock." },
    { label: "Estadísticas", icon: <BarChart2 size={14} />, cmd: "Muéstrame un resumen y estadísticas del inventario." },
    { label: "Caducados", icon: <CalendarX size={14} />, cmd: "Procesa y elimina los productos caducados." },
    { label: "Proveedores", icon: <Users size={14} />, cmd: "Muestra la lista de proveedores." },
    { label: "Pedidos", icon: <ShoppingCart size={14} />, cmd: "Lista todos los pedidos a proveedores." }
  ];

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => onAction(action.cmd)}
          className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 rounded font-mono text-xs transition-all"
        >
          <span className="text-cyan-500/70">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}

