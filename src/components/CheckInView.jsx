import React, { useState } from 'react';
import { useProtocol } from '../context/ProtocolContext';
import { 
  Activity, Zap, Flame, ShieldAlert, HeartPulse, 
  CheckCircle2, AlertTriangle, AlertCircle, Save, MessageSquare
} from 'lucide-react';

export default function CheckInView() {
  const { currentDay, getDayLog, saveCheckIn, logWeight, userProfile } = useProtocol();
  const log = getDayLog(currentDay);

  const [energy, setEnergy] = useState(log.checkIn?.energy || 8);
  const [doms, setDoms] = useState(log.checkIn?.doms || 3);
  const [jointStatus, setJointStatus] = useState(log.checkIn?.jointStatus || 'good');
  const [notes, setNotes] = useState(log.checkIn?.notes || '');
  const [weightKg, setWeightKg] = useState(log.weightKg || userProfile.initialWeightKg);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveCheckIn({ energy, doms, jointStatus, notes });
    logWeight(weightKg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Fisiologia Coach Recommendation based on status
  const getCoachFeedback = () => {
    if (jointStatus === 'pain') {
      return {
        title: "⚠️ Alerta de Segurança Articular",
        message: "Dor articular detectada em joelho/lombar. Reduza 20% das cargas no treino de amanhã ou troque o cardio por bike ergométrica em Zona 2.",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-300"
      };
    }
    if (energy <= 4) {
      return {
        title: "⚡ Fadiga do Sistema Nervoso Central (SNC) Elevada",
        message: "Nível de energia baixo (< 5). Garanta 8 horas de sono, aumente o consumo de carboidrato pré-treino em 20g e reduza 1 série de cada exercício.",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-300"
      };
    }
    if (doms >= 8) {
      return {
        title: "🔥 Dor Muscular Tardia Elevada (DOMS)",
        message: "Dormência/inflamação elevada. Prescrição: 15 min extras de liberação miofascial com rolo e banho morno/contraste.",
        color: "bg-orange-500/10 border-orange-500/30 text-orange-300"
      };
    }
    return {
      title: "✅ Supercompensação em Andamento",
      message: "Seus níveis de fadiga SNC e articulações estão otimizados. Mantenha o foco e a intensidade prescrita!",
      color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
    };
  };

  const feedback = getCoachFeedback();

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Check-in Diário de Fadiga & Articulações</h2>
            <p className="text-xs text-slate-400">Dia {currentDay} / 90 - Recalibração de treino em tempo real</p>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      <div className={`rounded-3xl p-5 border ${feedback.color} space-y-1.5`}>
        <h4 className="font-extrabold text-sm flex items-center gap-2">
          {feedback.title}
        </h4>
        <p className="text-xs leading-relaxed opacity-90">{feedback.message}</p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
        
        {/* Weight Log */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Peso Corporal Registrado Hoje (kg)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-base font-extrabold text-emerald-400 outline-none focus:border-emerald-500 w-40"
            />
            <span className="text-xs text-slate-400">
              Peso Inicial: <span className="font-bold text-slate-200">{userProfile.initialWeightKg} kg</span>
            </span>
          </div>
        </div>

        {/* Energy Slider */}
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Nível de Energia & Foco Metabólico</span>
            </div>
            <span className="text-sm font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
              {energy} / 10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
            <span>1 - Exausto / SNC Fraturado</span>
            <span>5 - Moderado</span>
            <span>10 - Energia Máxima</span>
          </div>
        </div>

        {/* DOMS / Muscle Soreness Slider */}
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-white">Dor Muscular Tardia (DOMS)</span>
            </div>
            <span className="text-sm font-extrabold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-lg border border-orange-500/20">
              {doms} / 10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={doms}
            onChange={(e) => setDoms(parseInt(e.target.value, 10))}
            className="w-full accent-orange-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
            <span>1 - Nenhuma Dor</span>
            <span>5 - Dor Moderada Normal</span>
            <span>10 - Inflamação Severa</span>
          </div>
        </div>

        {/* Joint Status Picker */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Integridade das Articulações (Joelho, Lombar, Tornozelos)</span>
          </label>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setJointStatus('good')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                jointStatus === 'good'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>100% Sem Dores</span>
            </button>

            <button
              type="button"
              onClick={() => setJointStatus('warning')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                jointStatus === 'warning'
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Leve Desconforto</span>
            </button>

            <button
              type="button"
              onClick={() => setJointStatus('pain')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                jointStatus === 'pain'
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>Dor / Pinçamento</span>
            </button>
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Notas & Observações do Dia</span>
          </label>
          <textarea
            rows="3"
            placeholder="Ex: Senti facilidade no supino; postura no código estava pesada à tarde..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>Salvar Check-in do Dia {currentDay}</span>
        </button>

        {savedSuccess && (
          <p className="text-xs font-bold text-emerald-400 text-center animate-fade-in">
            ✓ Check-in e parâmetros atualizados com sucesso!
          </p>
        )}
      </form>
    </div>
  );
}
