import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="text-cyan-400 mb-6"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="1" width="18" height="22" rx="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
          </svg>
        </motion.div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
          STAN
        </h1>
        <h2 className="text-2xl text-cyan-300/90 font-light mb-2">Stock Atelier Network</h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mb-4" />
        <p className="text-xl text-slate-400">ERP Inteligente con Asistente de IA</p>
        <p className="text-sm text-slate-600 mt-8">SISINF · Curso 2025-26</p>
      </div>
    )
  },
  {
    title: 'Índice',
    bullets: [
      'Problema',
      'Solución',
      'Arquitectura del sistema',
      'Funcionalidades clave',
      'Stack tecnológico',
      'Demo en vivo',
      'Conclusiones'
    ]
  },
  {
    title: 'Problema',
    subtitle: '¿Por qué un ERP con IA?',
    bullets: [
      'Gestión manual de inventario en talleres → errores y pérdidas',
      'Consultas complejas requieren conocimientos técnicos (SQL)',
      'Datos dispersos: stock, proveedores, pedidos, mermas',
      'Toma de decisiones lenta con información desactualizada'
    ]
  },
  {
    title: 'Solución',
    subtitle: 'ERP conversacional inteligente',
    bullets: [
      'Plataforma unificada con interfaz conversacional',
      'Asistente IA basado en Google Gemini',
      'Consultas en lenguaje natural: "¿Qué productos tienen stock bajo?"',
      'Dashboard con métricas y gráficos en tiempo real'
    ]
  },
  {
    title: 'Arquitectura',
    subtitle: 'Frontend + Backend + IA',
    items: [
      { label: 'Frontend', desc: 'React + Vite + Tailwind CSS — Interfaz cyberpunk y responsive' },
      { label: 'Backend', desc: 'Spring Boot 3.5 (Java 21) — API REST con Spring AI' },
      { label: 'Datos', desc: 'MongoDB — Documentos flexibles para ERP' },
      { label: 'IA', desc: 'Google Gemini 2.0 Flash — Procesamiento de lenguaje natural' },
      { label: 'Deploy', desc: 'Vercel (frontend) + Railway (backend)' }
    ]
  },
  {
    title: 'Funcionalidades Clave',
    bullets: [
      'Chat conversacional con IA: preguntas en lenguaje natural',
      'CRUD completo: productos, proveedores, pedidos',
      'Gestión de desechos y mermas',
      'Dashboard con estadísticas y gráficos interactivos',
      'Alertas inteligentes de stock bajo'
    ]
  },
  {
    title: 'Stack Tecnológico',
    columns: [
      { area: 'Frontend', techs: ['React 18', 'Vite 5', 'TypeScript', 'Tailwind CSS 3', 'Framer Motion', 'Recharts'] },
      { area: 'Backend', techs: ['Spring Boot 3.5', 'Java 21', 'Spring AI', 'Spring Data MongoDB'] },
      { area: 'Infra', techs: ['MongoDB', 'Google Gemini API', 'Vercel', 'Railway'] }
    ]
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <h2 className="text-3xl font-bold text-cyan-300 mb-3">Demo en Vivo</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mb-6" />
        <p className="text-lg text-slate-400 mb-2">Aplicación desplegada en producción:</p>
        <a
          href="https://llmerp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-cyan-400 hover:text-cyan-300 underline decoration-cyan-900 transition-colors font-mono"
        >
          llmerp.vercel.app
        </a>
        <p className="text-sm text-slate-600 mt-8">Backend: Railway · Frontend: Vercel</p>
      </div>
    )
  },
  {
    title: 'Conclusiones',
    bullets: [
      'La IA conversacional simplifica drásticamente la gestión ERP',
      'Arquitectura modular, escalable y desacoplada',
      'Stack moderno con buenas prácticas de desarrollo',
      'Reducción del tiempo de consultas de días a segundos',
      'Proyecto con alto potencial de expansión (más módulos, más IA)'
    ]
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          ¡Gracias!
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mb-4" />
        <p className="text-xl text-slate-400">¿Preguntas?</p>
      </div>
    )
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function SlidesModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  }, [current, total]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  }, [current]);

  useEffect(() => {
    if (!isOpen) {
      setCurrent(0);
      setDirection(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, next, prev, onClose]);

  const slide = slides[current];
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-[90vw] h-[85vh] max-w-5xl bg-black/80 border border-cyan-900/50 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.1)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded hover:bg-cyan-950/30"
            >
              <X size={20} />
            </button>

            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto px-12 py-16">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="h-full"
                  >
                    {slide.content || (
                      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
                        {slide.subtitle && (
                          <p className="text-sm text-cyan-500/70 uppercase tracking-widest mb-2 font-mono">
                            {slide.subtitle}
                          </p>
                        )}
                        <h2 className="text-3xl font-bold text-white mb-8">{slide.title}</h2>

                        {slide.bullets && (
                          <ul className="space-y-4">
                            {slide.bullets.map((b, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                className="flex items-start gap-3 text-lg text-slate-300"
                              >
                                <span className="text-cyan-500 mt-1.5 shrink-0">
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                    <circle cx="4" cy="4" r="4" />
                                  </svg>
                                </span>
                                {b}
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {slide.items && (
                          <div className="space-y-5">
                            {slide.items.map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                className="flex flex-col gap-1"
                              >
                                <span className="text-cyan-400 font-mono text-sm tracking-wider">{item.label}</span>
                                <p className="text-slate-300 text-base">{item.desc}</p>
                                {i < slide.items.length - 1 && (
                                  <div className="border-b border-cyan-900/30 my-3" />
                                )}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {slide.columns && (
                          <div className="grid grid-cols-3 gap-6 mt-4">
                            {slide.columns.map((col, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.3 }}
                                className="border border-cyan-900/40 rounded-lg p-4 bg-black/40"
                              >
                                <h3 className="text-cyan-400 font-mono text-sm tracking-wider mb-3 text-center">{col.area}</h3>
                                <div className="space-y-2">
                                  {col.techs.map((t, j) => (
                                    <div key={j} className="text-slate-300 text-sm text-center">{t}</div>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between px-8 py-4 border-t border-cyan-900/30 bg-black/40">
                <button
                  onClick={prev}
                  disabled={isFirst}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-mono transition-all ${
                    isFirst
                      ? 'text-slate-700 cursor-not-allowed'
                      : 'text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300'
                  }`}
                >
                  <ChevronLeft size={16} /> ANTERIOR
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === current
                            ? 'w-6 bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 font-mono ml-3">
                    {current + 1} / {total}
                  </span>
                </div>

                <button
                  onClick={next}
                  disabled={isLast}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-mono transition-all ${
                    isLast
                      ? 'text-slate-700 cursor-not-allowed'
                      : 'text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300'
                  }`}
                >
                  SIGUIENTE <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
