import React, { useState } from 'react';
import { useProtocol } from '../context/ProtocolContext';
import { 
  Dumbbell, HeartPulse, Sparkles, CheckCircle2, Circle, 
  Clock, Flame, Activity, ChevronDown, ChevronUp, Save
} from 'lucide-react';

export default function WorkoutView() {
  const { 
    currentDay, getDayLog, getWorkoutForDay, getPhaseForDay,
    toggleExercise, toggleCardio, toggleMobility 
  } = useProtocol();

  const log = getDayLog(currentDay);
  const workout = getWorkoutForDay(currentDay);
  const phase = getPhaseForDay(currentDay);

  // Local inputs state for weight/reps per exercise
  const [exerciseInputs, setExerciseInputs] = useState({});

  const handleInputChange = (exId, field, value) => {
    setExerciseInputs(prev => ({
      ...prev,
      [exId]: {
        ...prev[exId],
        [field]: value
      }
    }));
  };

  const handleSaveExercise = (exId) => {
    const details = exerciseInputs[exId] || {};
    toggleExercise(exId, details);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                DIA {currentDay} / 90
              </span>
              <span className="text-xs text-slate-400 font-semibold">{phase.name}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">{workout.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleMobility()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                log.mobilityDone 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mobilidade Feita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobility & Activation Section */}
      {workout.mobility && workout.mobility.length > 0 && (
        <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Protocolo de Mobilidade & Ativação (Pré-Treino)</h3>
            </div>
            <span className="text-xs text-slate-400">Obrigatório para Devs</span>
          </div>

          <div className="space-y-2">
            {workout.mobility.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">{item}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-bold">
                  Ativação
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercises Section */}
      {workout.exercises && workout.exercises.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-white text-base">Exercícios de Musculação</h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              {workout.exercises.filter(ex => log.completedExercises?.[ex.id]?.completed).length} / {workout.exercises.length} Concluídos
            </span>
          </div>

          <div className="space-y-3">
            {workout.exercises.map((ex, idx) => {
              const exLog = log.completedExercises?.[ex.id] || {};
              const isCompleted = exLog.completed;
              const inputState = exerciseInputs[ex.id] || { weightKg: exLog.weightKg || '', reps: exLog.reps || '' };

              return (
                <div 
                  key={ex.id}
                  className={`glass-card rounded-2xl p-4 border transition-all ${
                    isCompleted 
                      ? 'border-emerald-500/40 bg-emerald-950/10' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Exercise Info */}
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleExercise(ex.id)}
                        className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-emerald-400 transition"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-500">#{idx + 1}</span>
                          <h4 className={`font-bold text-sm ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                            {ex.name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span className="bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800 font-semibold text-emerald-400">
                            {ex.sets} séries x {ex.reps} reps
                          </span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3 text-amber-400" />
                            {ex.rest} descanso
                          </span>
                        </div>
                        {ex.notes && (
                          <p className="text-[11px] text-slate-400 italic">💡 {ex.notes}</p>
                        )}
                      </div>
                    </div>

                    {/* Inputs for Load & Reps */}
                    <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">Kg</span>
                        <input
                          type="number"
                          placeholder="Carga"
                          value={inputState.weightKg}
                          onChange={(e) => handleInputChange(ex.id, 'weightKg', e.target.value)}
                          className="w-14 bg-transparent text-xs text-center font-bold text-white outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">Reps</span>
                        <input
                          type="text"
                          placeholder="Exec"
                          value={inputState.reps}
                          onChange={(e) => handleInputChange(ex.id, 'reps', e.target.value)}
                          className="w-12 bg-transparent text-xs text-center font-bold text-white outline-none"
                        />
                      </div>

                      <button
                        onClick={() => handleSaveExercise(ex.id)}
                        className={`p-2 rounded-xl border transition ${
                          isCompleted
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400'
                        }`}
                        title="Salvar série"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8 text-center space-y-3 border border-slate-800">
          <Flame className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-white">Dia de Descanso Ativo ou Cardio Regenerativo</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Aproveite hoje para focar em caminhada leve, liberação miofascial e estabilização de core para supercompensação.
          </p>
        </div>
      )}

      {/* Cardio Section */}
      {workout.cardio && (
        <div className="glass-card rounded-3xl p-5 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <HeartPulse className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Cardio Prescrito: {workout.cardio.type}</h3>
                <p className="text-xs text-slate-400">Duração: {workout.cardio.durationMin} minutos | Alvo: {workout.cardio.bpmTarget}</p>
              </div>
            </div>

            <button
              onClick={() => toggleCardio()}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                log.cardioDone
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{log.cardioDone ? 'Cardio Concluído' : 'Marcar Concluído'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-center">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Inclinação</span>
              <span className="text-sm font-extrabold text-cyan-400">{workout.cardio.incline}</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Velocidade</span>
              <span className="text-sm font-extrabold text-cyan-400">{workout.cardio.speed}</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block font-semibold">Frequência Alvo</span>
              <span className="text-sm font-extrabold text-emerald-400">{workout.cardio.bpmTarget}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
