import React from 'react';
import { useProtocol } from '../context/ProtocolContext';
import { 
  Droplets, Dumbbell, Utensils, Zap, Flame, ShieldAlert, 
  CheckCircle2, Plus, ArrowRight, Activity, TrendingDown
} from 'lucide-react';

export default function DashboardView({ setActiveTab }) {
  const { 
    currentDay, getDayLog, getWorkoutForDay, getPhaseForDay, 
    addWater, userProfile, mealPresets 
  } = useProtocol();

  const log = getDayLog(currentDay);
  const workout = getWorkoutForDay(currentDay);
  const phase = getPhaseForDay(currentDay);

  // Calculations
  const waterProgress = Math.min(100, Math.round((log.waterMl / userProfile.dailyWaterTargetMl) * 100));
  
  const totalExercises = workout.exercises ? workout.exercises.length : 0;
  const completedExercisesCount = workout.exercises 
    ? workout.exercises.filter(ex => log.completedExercises?.[ex.id]?.completed).length 
    : 0;
  
  const workoutProgress = totalExercises > 0 
    ? Math.round((completedExercisesCount / totalExercises) * 100) 
    : (log.cardioDone ? 100 : 0);

  const completedMealsCount = Object.values(log.completedMeals || {}).filter(Boolean).length;
  const mealsProgress = Math.round((completedMealsCount / mealPresets.length) * 100);

  const overallProgressPercent = Math.round((currentDay / 90) * 100);

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* 90-Day Protocol Banner */}
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              {phase.name} ({phase.daysRange})
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Progresso dos <span className="gradient-text">90 Dias</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-xl">
              {phase.description}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-emerald-400">{currentDay}</span>
              <span className="text-xs text-slate-500 block font-semibold uppercase">Dia Atual</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-200">{90 - currentDay}</span>
              <span className="text-xs text-slate-500 block font-semibold uppercase">Dias Restantes</span>
            </div>
          </div>
        </div>

        {/* 90 Day Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Conclusão do Protocolo</span>
            <span className="text-emerald-400">{overallProgressPercent}% Concluído</span>
          </div>
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Water Hydration Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Droplets className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Hidratação</h3>
                <p className="text-xs text-slate-400">Meta: {(userProfile.dailyWaterTargetMl/1000).toFixed(1)}L / dia</p>
              </div>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              {waterProgress}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold text-white">
                {(log.waterMl / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-400">L</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Faltam {Math.max(0, (userProfile.dailyWaterTargetMl - log.waterMl) / 1000).toFixed(2)}L
              </span>
            </div>
            
            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${waterProgress}%` }}
              />
            </div>
          </div>

          {/* Quick Water Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => addWater(250)}
              className="px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-slate-800 text-xs font-semibold text-cyan-300 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-slate-800 text-xs font-semibold text-cyan-300 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 500ml
            </button>
            <button
              onClick={() => addWater(1500)}
              className="px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-slate-800 text-xs font-semibold text-cyan-300 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 1.5L
            </button>
          </div>
        </div>

        {/* Workout Today Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Treino do Dia</h3>
                <p className="text-xs text-slate-400 truncate max-w-[150px]">{workout.title}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {workoutProgress}%
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Exercícios Concluídos:</span>
              <span className="font-bold text-white">{completedExercisesCount} / {totalExercises}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Cardio Zona 2:</span>
              <span className={`font-bold ${log.cardioDone ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-500'}`}>
                {log.cardioDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                {log.cardioDone ? 'Concluído' : 'Pendente'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Mobilidade Antiescranchamento:</span>
              <span className={`font-bold ${log.mobilityDone ? 'text-emerald-400 flex items-center gap-1' : 'text-slate-500'}`}>
                {log.mobilityDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                {log.mobilityDone ? 'Feito' : 'Pendente'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('workout')}
            className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Registrar Treino</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Nutrition Card */}
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Alimentação</h3>
                <p className="text-xs text-slate-400">Meta: {userProfile.dailyCalorieTarget} kcal</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              {mealsProgress}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Proteínas</span>
                <span className="font-extrabold text-emerald-400">{userProfile.macrosTarget.proteinG}g</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Carbos</span>
                <span className="font-extrabold text-cyan-400">{userProfile.macrosTarget.carbsG}g</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Gorduras</span>
                <span className="font-extrabold text-amber-400">{userProfile.macrosTarget.fatsG}g</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center pt-1">
              {completedMealsCount} de {mealPresets.length} refeições registradas
            </p>
          </div>

          <button
            onClick={() => setActiveTab('nutrition')}
            className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <span>Ver Refeições & Timing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Developer Biomechanical Advisory Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Alerta Biomecânico de Desenvolvedor</h4>
            <p className="text-xs text-slate-400">Prevenção ativa contra o estresse postural de escritório</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          {userProfile.biomechanicalPoints.map((point, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-2xl flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span className="text-xs text-slate-300 leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
