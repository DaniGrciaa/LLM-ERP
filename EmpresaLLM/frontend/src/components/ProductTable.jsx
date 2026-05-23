import React from 'react';
import { Database } from 'lucide-react';

export default function ProductTable({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-black/60 border border-cyan-900/30 rounded-lg overflow-hidden backdrop-blur-md mt-6">
      <div className="p-3 border-b border-cyan-900/50 bg-cyan-950/20 flex items-center gap-2">
        <Database size={16} className="text-cyan-500" />
        <h4 className="font-mono text-xs text-cyan-400 tracking-wider">DATOS RECUPERADOS</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300 font-mono">
          <thead className="text-xs text-cyan-500 uppercase bg-black/40 border-b border-cyan-900/30">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx} className="border-b border-slate-800 hover:bg-cyan-950/20 transition-colors">
                <td className="px-4 py-3 text-slate-500">{p.id}</td>
                <td className="px-4 py-3 text-cyan-100">{p.nombre}</td>
                <td className="px-4 py-3">{p.categoria}</td>
                <td className={`px-4 py-3 text-right ${p.stock < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {p.stock} u
                </td>
                <td className="px-4 py-3 text-right">${p.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

