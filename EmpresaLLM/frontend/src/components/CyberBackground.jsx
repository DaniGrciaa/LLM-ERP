import React from 'react';

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020617] overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-violet-900/10 blur-[100px] rounded-full mix-blend-screen" />
    </div>
  );
}

