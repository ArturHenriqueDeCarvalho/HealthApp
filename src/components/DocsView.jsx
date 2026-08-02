import React, { useState } from 'react';
import { BookOpen, FileText, Shield, Dumbbell, Utensils, CheckSquare } from 'lucide-react';

export default function DocsView() {
  const [activeDoc, setActiveDoc] = useState('geral');

  const docs = [
    { id: 'geral', title: 'Plano Geral & Macrociclo', icon: Shield, file: 'docs/PLANO_GERAL_90_DIAS.md' },
    { id: 'nutricao', title: 'Protocolo Nutricional', icon: Utensils, file: 'docs/PLANO_NUTRICIONAL.md' },
    { id: 'fase1', title: 'Treinos Fase 1 (Dias 1-30)', icon: Dumbbell, file: 'docs/TREINOS_FASE1.md' },
    { id: 'fase2', title: 'Treinos Fase 2 (Dias 31-60)', icon: Dumbbell, file: 'docs/TREINOS_FASE2.md' },
    { id: 'fase3', title: 'Treinos Fase 3 (Dias 61-90)', icon: Dumbbell, file: 'docs/TREINOS_FASE3.md' },
    { id: 'guia', title: 'Guia Diário & Check-in', icon: CheckSquare, file: 'docs/GUIA_DIARIO_E_CHECKIN.md' },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Documentação Oficial do Protocolo (/docs)</h2>
            <p className="text-xs text-slate-400">Diretrizes fisiológicas, tabelas de treinos e planejamento nutricional</p>
          </div>
        </div>
      </div>

      {/* Docs Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {docs.map((doc) => {
          const Icon = doc.icon;
          const isActive = activeDoc === doc.id;
          return (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center gap-2.5 text-left ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-md'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{doc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Doc Preview / Content Note */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            Arquivo Markdown em /docs
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {docs.find(d => d.id === activeDoc)?.file}
          </span>
        </div>

        <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-sans">
          {activeDoc === 'geral' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">🛡️ PLANO GERAL & MACROCICLO</h3>
              <p>Perfil: 120 kg, 180 cm, 26 anos (Desenvolvedor de Software).</p>
              <p>Regra dos 90 Dias Ininterruptos: Treino de força 5x/semana + 2 dias de descanso ativo com mobilidade e core estabilizador.</p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-300">
                • Fase 1 (1-30): Adaptação neural, fortalecimento de core e Zona 2 sem impacto.<br/>
                • Fase 2 (31-60): Sobrecarga progressiva, volume aumentado e pequenos trotes.<br/>
                • Fase 3 (61-90): Intensificação, alta densidade e corrida híbrida contínua.
              </div>
            </div>
          )}

          {activeDoc === 'nutricao' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">🥗 PROTOCOLO NUTRICIONAL BASE</h3>
              <p>Meta Calórica: 2.100 kcal (Déficit de ~600 kcal).</p>
              <p>Macros: Proteínas 190-200g (1.8g/kg), Carboidratos 160-180g, Gorduras 60-70g.</p>
              <p>Hidratação: 4,5 Litros por dia (Tática do garrafão de 1,5L de manha/tarde/noite).</p>
            </div>
          )}

          {activeDoc === 'fase1' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">🏋️ TREINOS FASE 1 (DIAS 1 AO 30)</h3>
              <p>Sem impacto: 25 min Esteira Inclinada (4-5%) a 116-135 bpm.</p>
              <p>Divisão: Push / Pull / Legs / Descanso Ativo & Core / Upper Body / Legs & Core / Cardio Regenerativo.</p>
            </div>
          )}

          {activeDoc === 'fase2' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">🏋️ TREINOS FASE 2 (DIAS 31 AO 60)</h3>
              <p>Introdução de Trote Intermitente (1 min trote / 2 min caminhada x 8 ciclos).</p>
              <p>Aumento de carga progressivo (+5 a 10%) mantendo técnica perfeita.</p>
            </div>
          )}

          {activeDoc === 'fase3' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">🏋️ TREINOS FASE 3 (DIAS 61 AO 90)</h3>
              <p>Corrida Híbrida Contínua (30-35 min) + Treinos de alta densidade (Drop-sets/Rest-pause).</p>
            </div>
          )}

          {activeDoc === 'guia' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">📋 GUIA DIÁRIO E CHECK-IN</h3>
              <p>Modelo de mensagem e interação com o Coach a cada novo dia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
