import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon, subtitle, isWarning }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-lg border backdrop-blur-sm relative overflow-hidden group
        ${isWarning 
          ? 'bg-red-950/20 border-red-900/50 hover:border-red-500/50' 
          : 'bg-black/40 border-cyan-900/40 hover:border-cyan-500/50'}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -translate-y-16 translate-x-16 rounded-full transition-opacity opacity-20 group-hover:opacity-40
        ${isWarning ? 'bg-red-500' : 'bg-cyan-500'}`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${isWarning ? 'text-red-400' : 'text-slate-400'}`}>
            {title}
          </h4>
          <div className={`text-3xl font-bold font-mono tracking-tight ${isWarning ? 'text-red-300' : 'text-cyan-100'}`}>
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 font-mono">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded border ${isWarning ? 'bg-red-950 border-red-900 text-red-500' : 'bg-cyan-950/50 border-cyan-900/50 text-cyan-500'}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

