import React from 'react';
import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivityFeed({ activities }) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="bg-black/40 border border-slate-800 rounded-lg p-4 mt-6">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        <Activity size={16} />
        <h4 className="font-mono text-xs uppercase tracking-widest">Actividad Reciente</h4>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {activities.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shadow-[0_0_5px_#22d3ee]"></div>
              <p className="text-sm font-mono text-slate-300">{act}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

