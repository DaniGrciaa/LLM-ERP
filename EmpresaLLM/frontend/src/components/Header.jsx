import React from 'react';
import { Bot, Zap, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';
import SlidesModal from './SlidesModal';

export default function Header({ model, setModel, onNewChat }) {
  const [slidesOpen, setSlidesOpen] = React.useState(false);
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

  return (
    <header className="flex items-center justify-between p-4 border-b border-cyan-900/30 bg-black/40 backdrop-blur-md z-10 relative">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="text-cyan-400"
        >
          <Bot size={32} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">STAN</h1>
          <h2 className="text-xs text-slate-400 uppercase tracking-widest">Stock Atelier Network</h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
          <span className="text-sm text-cyan-400/80 font-mono tracking-wider">LINK ESTABLISHED</span>
        </div>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="bg-black/50 border border-cyan-900/50 text-cyan-100 text-sm rounded px-3 py-1 outline-none focus:border-cyan-500 font-mono"
        >
          {models.map(m => (
            <option key={m} value={m} className="bg-black">{m}</option>
          ))}
        </select>

        <button
          onClick={() => setSlidesOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/20 text-cyan-400/80 hover:text-cyan-300 rounded font-mono text-xs transition-all"
        >
          <Presentation size={14} /> SLIDES
        </button>

        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 rounded font-mono text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <Zap size={16} /> NEOLINK
        </button>
      </div>

      <SlidesModal isOpen={slidesOpen} onClose={() => setSlidesOpen(false)} />
    </header>
  );
}

