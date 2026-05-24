import React from 'react';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import { Send, Terminal } from 'lucide-react';

export default function ChatPanel({ messages, input, setInput, loading, onSendMessage }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
    
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border-r border-cyan-900/30 relative overflow-hidden">
      {/* Decorative scanning line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 opacity-20 shadow-[0_0_10px_#22d3ee] animate-[scan_3s_ease-in-out_infinite]" />

      <div className="p-4 border-b border-cyan-900/30 flex items-center gap-2">
        <Terminal size={18} className="text-cyan-500" />
        <h3 className="font-mono text-cyan-500 uppercase tracking-widest text-sm">Terminal IA</h3>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {loading && (
          <MessageBubble message={{
            role: 'bot',
            text: <span className="animate-pulse text-cyan-400">Analizando orden...</span>
          }} />
        )}
      </div>

      <div className="p-4 bg-black/60 border-t border-cyan-900/40 space-y-4 relative z-10">
        <QuickActions onAction={(cmd) => {
          setInput(cmd);
          // Auto send logic could be implemented here or managed from App.
          // We will just set it for now and let the user press send.
        }} />

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
          <div className="relative flex items-center bg-black border border-cyan-900/50 rounded overflow-hidden">
            <span className="pl-4 text-cyan-500 font-mono" >{">"}</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe una orden para el ERP..."
              className="w-full bg-transparent text-cyan-100 placeholder:text-cyan-800 font-mono text-sm p-3 outline-none resize-none"
              rows={1}
            />
            <button
              onClick={onSendMessage}
              disabled={loading || !input.trim()}
              className="p-3 bg-cyan-950/50 hover:bg-cyan-900 text-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-950/50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
