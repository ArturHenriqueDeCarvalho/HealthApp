import React, { useState } from 'react';
import { useProtocol } from '../context/ProtocolContext';
import { 
  Droplets, Utensils, Clock, CheckCircle2, Circle, 
  Plus, RotateCcw, Flame, ShieldAlert, Award
} from 'lucide-react';

export default function NutritionView() {
  const { 
    currentDay, getDayLog, toggleMeal, addWater, resetWater, 
    userProfile, mealPresets 
  } = useProtocol();

  const log = getDayLog(currentDay);
  const [customMl, setCustomMl] = useState('');

  const handleAddCustomWater = (e) => {
    e.preventDefault();
    const val = parseInt(customMl, 10);
    if (val && val > 0) {
      addWater(val);
      setCustomMl('');
    }
  };

  const waterProgress = Math.min(100, Math.round((log.waterMl / userProfile.dailyWaterTargetMl) * 100));

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Water Ingestion Section */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Droplets className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Registro de Ingestão Hídrica</h2>
              <p className="text-xs text-slate-400">
                Meta Diária: <span className="text-cyan-400 font-bold">{(userProfile.dailyWaterTargetMl / 1000).toFixed(1)} Litros</span> (40ml/kg)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => resetWater()}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/10 hover:border-rose-500/30 border border-slate-800 text-slate-400 hover:text-rose-400 transition"
              title="Zerar Água de Hoje"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Water Progress Meter */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-extrabold text-white">
                {(log.waterMl / 1000).toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ {(userProfile.dailyWaterTargetMl / 1000).toFixed(1)} L</span>
            </div>
            <span className="text-sm font-extrabold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              {waterProgress}% Atingido
            </span>
          </div>

          <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20"
              style={{ width: `${waterProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 italic text-center">
            💡 Tática do Garrafão de Desenvolvedor: Consuma 1,5L de manhã (até 12h), 1,5L à tarde (até 17h) e 1,5L à noite no treino.
          </p>
        </div>

        {/* Quick Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => addWater(250)}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-semibold text-xs transition flex flex-col items-center gap-1"
          >
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Copo (250ml)</span>
          </button>
          <button
            onClick={() => addWater(500)}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-semibold text-xs transition flex flex-col items-center gap-1"
          >
            <Droplets className="w-5 h-5 text-cyan-400" />
            <span>Garrafa (500ml)</span>
          </button>
          <button
            onClick={() => addWater(1500)}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 font-semibold text-xs transition flex flex-col items-center gap-1"
          >
            <Droplets className="w-6 h-6 text-cyan-400" />
            <span>Garrafão (1.5L)</span>
          </button>

          <form onSubmit={handleAddCustomWater} className="flex gap-1.5">
            <input
              type="number"
              placeholder="+ ml"
              value={customMl}
              onChange={(e) => setCustomMl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 text-xs font-bold text-white placeholder-slate-500 outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Meals & Macro Timing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-white text-base">Cronograma de Refeições</h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Meta: 2.100 kcal / dia
          </span>
        </div>

        <div className="space-y-3">
          {mealPresets.map((meal) => {
            const isCompleted = log.completedMeals?.[meal.id];

            return (
              <div 
                key={meal.id}
                className={`glass-card rounded-2xl p-4 border transition-all ${
                  isCompleted 
                    ? 'border-emerald-500/40 bg-emerald-950/10' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleMeal(meal.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          {meal.time}
                        </span>
                        <h4 className={`font-bold text-sm ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                          {meal.name}
                        </h4>
                      </div>

                      <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                        {meal.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Macros Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                    <span className="text-xs font-extrabold text-white bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                      {meal.calories} <span className="text-[10px] font-normal text-slate-400">kcal</span>
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mt-1">
                      <span className="text-emerald-400">{meal.protein}g P</span>
                      <span className="text-cyan-400">{meal.carbs}g C</span>
                      <span className="text-amber-400">{meal.fats}g G</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
