import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={`flex w-full gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border
        ${isUser 
          ? 'bg-blue-900/30 border-blue-500/50 text-blue-400' 
          : 'bg-cyan-900/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
        }`}
      >
        {isUser ? <User size={20} /> : <Cpu size={20} />}
      </div>

      <div className={`p-4 rounded-2xl max-w-[80%] font-mono text-sm leading-relaxed backdrop-blur-sm
        ${isUser 
          ? 'bg-blue-950/20 border border-blue-900/30 text-blue-100 rounded-tr-sm' 
          : 'bg-cyan-950/20 border border-cyan-900/30 text-cyan-50 rounded-tl-sm'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

