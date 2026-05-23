import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

export default function StatsCharts({ stockData, desechosData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Chart 1: Stock by Category */}
      <div className="bg-black/40 border border-cyan-900/40 rounded-lg p-4 backdrop-blur-sm">
        <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4">Stock por Categoría</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#164e63" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{fill: '#083344'}}
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #164e63', color: '#cffafe' }}
              />
              <Bar dataKey="value" fill="#22d3ee" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Desechos */}
      <div className="bg-black/40 border border-red-900/30 rounded-lg p-4 backdrop-blur-sm">
        <h4 className="font-mono text-xs text-red-400 uppercase tracking-widest mb-4">Pérdidas por Desechos</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={desechosData}>
              <defs>
                <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#451a1a" vertical={false} />
              <XAxis dataKey="mes" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{stroke: '#7f1d1d'}}
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #7f1d1d', color: '#fecaca' }}
              />
              <Area type="monotone" dataKey="valor" stroke="#ef4444" fillOpacity={1} fill="url(#colorValor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

