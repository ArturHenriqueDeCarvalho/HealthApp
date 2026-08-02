import React from 'react';
import { LayoutDashboard, Dumbbell, Utensils, Activity, BookOpen } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
    { id: 'workout', label: 'Treino', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrição & Água', icon: Utensils },
    { id: 'checkin', label: 'Check-in SNC', icon: Activity },
    { id: 'docs', label: 'Manual docs', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-slate-800/80 px-2 py-2 md:relative md:border-t-0 md:bg-transparent md:backdrop-blur-none md:mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-around md:justify-center md:gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col md:flex-row items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
