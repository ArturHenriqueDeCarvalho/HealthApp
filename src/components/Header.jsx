import React from 'react';
import { useProtocol } from '../context/ProtocolContext';
import { Shield, ChevronLeft, ChevronRight, Calendar, Award } from 'lucide-react';

export default function Header() {
  const { currentDay, setCurrentDay, getPhaseForDay } = useProtocol();
  const currentPhase = getPhaseForDay(currentDay);

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800/80 px-4 py-3 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight leading-tight gradient-text">
                PROTOCOL 90
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Coach Híbrido & Nutrição
              </p>
            </div>
          </div>

          {/* Mobile Phase Badge */}
          <div className="sm:hidden px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            Fase {currentPhase.id}
          </div>
        </div>

        {/* Day Selector Control */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl w-full sm:w-auto justify-center">
          <button
            onClick={() => setCurrentDay(currentDay - 1)}
            disabled={currentDay <= 1}
            className="p-1.5 rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition text-slate-300"
            title="Dia Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold text-slate-100 text-sm tracking-wide">
              DIA <span className="text-emerald-400 text-base">{currentDay}</span>/90
            </span>
          </div>

          <button
            onClick={() => setCurrentDay(currentDay + 1)}
            disabled={currentDay >= 90}
            className="p-1.5 rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition text-slate-300"
            title="Próximo Dia"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Phase Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">{currentPhase.name}</span>
        </div>
      </div>
    </header>
  );
}
