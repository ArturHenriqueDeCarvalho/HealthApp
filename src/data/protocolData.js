export const USER_PROFILE = {
  name: "Desenvolvedor Híbrido",
  initialWeightKg: 120,
  targetWeightKg: 100,
  heightCm: 180,
  age: 26,
  occupation: "Desenvolvedor de Software",
  dailyWaterTargetMl: 4500,
  dailyCalorieTarget: 2100,
  macrosTarget: {
    proteinG: 195,
    carbsG: 170,
    fatsG: 65
  },
  biomechanicalPoints: [
    "Flexores do quadril encurtados (postura sentada)",
    "Amnésia glútea (inibição muscular posterior)",
    "Risco de sobrecarga articular nos joelhos/lombar",
    "Cardio sem impacto (Zona 2) obrigatório na Fase 1"
  ]
};

export const PHASES = [
  {
    id: 1,
    name: "Fase 1: Adaptação & Base Aeróbica",
    daysRange: "Dias 1 ao 30",
    description: "Adaptação neural, fortalecimento do core/lombar, hipertrofia base e cardio em Zona 2 (sem impacto).",
    cardioNote: "Esteira inclinada (4-5%) ou Elíptico a 116-135 bpm (25 min). Sem corrida.",
    accentColor: "#10b981"
  },
  {
    id: 2,
    name: "Fase 2: Consolidação & Volume",
    daysRange: "Dias 31 ao 60",
    description: "Aumento de carga progressiva, 1 série extra por exercício e pequenos blocos de trote (1 min trote / 2 min caminhada).",
    cardioNote: "24-30 min intermitente (se articular ok).",
    accentColor: "#06b6d4"
  },
  {
    id: 3,
    name: "Fase 3: Intensificação Híbrida",
    daysRange: "Dias 61 ao 90",
    description: "Máxima recomposição corporal, alta densidade (Drop-sets, Rest-pause) e corrida híbrida contínua.",
    cardioNote: "30-35 min corrida contínua moderada.",
    accentColor: "#8b5cf6"
  }
];

export const WORKOUT_SCHEDULE_FASE1 = {
  1: {
    title: "Push (Peito, Ombros e Tríceps) + Cardio Zona 2",
    type: "Push",
    mobility: [
      "Soltura de Flexores de Quadril Ajoelhado: 2x45s cada lado",
      "Rotação Torácica em 4 Apoios: 2x10 rep",
      "Ativação de Escápula com Elástico: 2x15 rep"
    ],
    exercises: [
      { id: "p1_1", name: "Supino Reto com Halteres", sets: 4, reps: "10-12", rest: "75s", notes: "Trajetória natural para ombros" },
      { id: "p1_2", name: "Supino Inclinado com Halteres (30º)", sets: 3, reps: "12", rest: "60s", notes: "Peitoral superior" },
      { id: "p1_3", name: "Crossover na Polia Média", sets: 3, reps: "15", rest: "60s", notes: "Esmagar no pico de contração" },
      { id: "p1_4", name: "Desenvolvimento Sentado com Halteres", sets: 3, reps: "10-12", rest: "75s", notes: "Apoiar a coluna" },
      { id: "p1_5", name: "Elevação Lateral Sentado com Halteres", sets: 4, reps: "12-15", rest: "45s", notes: "Foco no deltoide lateral" },
      { id: "p1_6", name: "Tríceps Corda na Polia", sets: 3, reps: "12-15", rest: "45s", notes: "Abrir a corda no final" },
      { id: "p1_7", name: "Tríceps Testa na Polia", sets: 3, reps: "12", rest: "45s", notes: "Cotovelos fechados" }
    ],
    cardio: {
      type: "Esteira Inclinada",
      durationMin: 25,
      bpmTarget: "116 - 135 bpm",
      incline: "4.0% - 5.0%",
      speed: "4.8 - 5.2 km/h"
    }
  },
  2: {
    title: "Pull (Costas, Bíceps e Posterior de Ombro) + Cardio Zona 2",
    type: "Pull",
    mobility: [
      "Gato-Camelo (Cat-Cow): 2x12 rep (Coluna)",
      "Ativação de Latíssimo / Escapular: 2x10 rep"
    ],
    exercises: [
      { id: "p2_1", name: "Puxada Frontal na Polia (Pegada Pronada)", sets: 4, reps: "10-12", rest: "75s", notes: "Travar o tronco" },
      { id: "p2_2", name: "Remada Baixa no Triângulo", sets: 4, reps: "10-12", rest: "60s", notes: "Esmagar escápulas" },
      { id: "p2_3", name: "Remada Unilateral com Halter (Serrote)", sets: 3, reps: "12", rest: "60s", notes: "Apoio no banco" },
      { id: "p2_4", name: "Crucifixo Inverso no Voador", sets: 4, reps: "12-15", rest: "45s", notes: "Posterior de ombro" },
      { id: "p2_5", name: "Rosca Direta com Barra W", sets: 3, reps: "10-12", rest: "60s", notes: "Sem roubar na lombar" },
      { id: "p2_6", name: "Rosca Martelo com Halteres", sets: 3, reps: "12", rest: "45s", notes: "Braquial e antebraço" }
    ],
    cardio: {
      type: "Elíptico ou Bike Ergométrica",
      durationMin: 25,
      bpmTarget: "116 - 135 bpm",
      incline: "N/A",
      speed: "Moderado"
    }
  },
  3: {
    title: "Legs & Glúteos (Proteção Articular)",
    type: "Legs",
    mobility: [
      "Ponte de Quadril Solo: 3x15 rep (Pico 2s topo)",
      "Clamshell (Ostra) Deitado: 2x15 rep cada lado",
      "Alongamento Ativo de Isquiotibiais: 2x30s cada perna"
    ],
    exercises: [
      { id: "p3_1", name: "Leg Press 45º (Pés Altos e Afastados)", sets: 4, reps: "12", rest: "90s", notes: "Tira sobrecarga patelar" },
      { id: "p3_2", name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60s", notes: "Sem chutar a carga" },
      { id: "p3_3", name: "Mesa ou Cadeira Flexora", sets: 4, reps: "12", rest: "60s", notes: "Equilíbrio isquiotibial" },
      { id: "p3_4", name: "Elevação Pélvica na Máquina/Barra", sets: 4, reps: "10-12", rest: "75s", notes: "Esmagar glúteos no topo" },
      { id: "p3_5", name: "Panturrilha no Leg Press", sets: 5, reps: "15", rest: "45s", notes: "Pausa de 2s embaixo" }
    ],
    cardio: {
      type: "Desaquecimento Esteira Plana",
      durationMin: 15,
      bpmTarget: "< 115 bpm",
      incline: "0%",
      speed: "4.5 km/h"
    }
  },
  4: {
    title: "Descanso Ativo, Mobilidade & Core Estabilizador",
    type: "Rest",
    mobility: [
      "Caminhada leve ao ar livre / esteira (35 min)",
      "Foam Roller em TI, quadríceps e glúteos",
      "Alongamento de Peitoral na parede (30s)"
    ],
    exercises: [
      { id: "p4_1", name: "Prancha Frontal (Plank)", sets: 3, reps: "45 seg", rest: "45s", notes: "Contração total de glúteo e abdominal" },
      { id: "p4_2", name: "Bird-Dog (Perdigueiro)", sets: 3, reps: "10 cada lado", rest: "45s", notes: "Estabilidade de coluna" },
      { id: "p4_3", name: "Pallof Press na Polia", sets: 3, reps: "12 cada lado", rest: "45s", notes: "Anti-rotação" }
    ],
    cardio: {
      type: "Caminhada Regenerativa",
      durationMin: 35,
      bpmTarget: "Zona 1/2 Leve",
      incline: "Plano",
      speed: "4.5 km/h"
    }
  },
  5: {
    title: "Upper Body (Corpo Superior Completo) + Cardio Zona 2",
    type: "Push/Pull",
    mobility: [
      "Rotação Torácica: 2x10 rep",
      "Alongamento Flexores Quadril: 2x45s"
    ],
    exercises: [
      { id: "p5_1", name: "Supino Inclinado com Halteres", sets: 4, reps: "10", rest: "75s", notes: "Carga moderada/alta" },
      { id: "p5_2", name: "Puxada Frontal Pegada Neutra", sets: 4, reps: "10-12", rest: "75s", notes: "Foco no latíssimo" },
      { id: "p5_3", name: "Desenvolvimento Arnold", sets: 3, reps: "12", rest: "60s", notes: "Rotação limpa" },
      { id: "p5_4", name: "Remada Articulada", sets: 3, reps: "12", rest: "60s", notes: "Escápulas presas" },
      { id: "p5_5", name: "Biseti Armas (Rosca Martelo + Tríceps Corda)", sets: 3, reps: "12", rest: "60s", notes: "Sem intervalo no biset" }
    ],
    cardio: {
      type: "Esteira Inclinada",
      durationMin: 25,
      bpmTarget: "116 - 135 bpm",
      incline: "5.0%",
      speed: "4.8 km/h"
    }
  },
  6: {
    title: "Legs & Core (Posterior, Glúteo & Estabilização)",
    type: "Legs",
    mobility: [
      "Ativação de Glúteos na Ponte: 3x15 rep",
      "Alongamento Dinâmico de Isquiotibiais"
    ],
    exercises: [
      { id: "p6_1", name: "Stiff com Halteres (Coluna Neutra)", sets: 4, reps: "10-12", rest: "75s", notes: "Foco em dobrar o quadril" },
      { id: "p6_2", name: "Agachamento Goblet", sets: 3, reps: "10-12", rest: "75s", notes: "Halter junto ao peitoral" },
      { id: "p6_3", name: "Cadeira Flexora", sets: 4, reps: "12-15", rest: "60s", notes: "Posterior isolado" },
      { id: "p6_4", name: "Cadeira Abdutora (Glúteo Médio)", sets: 4, reps: "15", rest: "45s", notes: "Pausa 1s no pico" },
      { id: "p6_5", name: "Abdominal Infra no Banco Inclinado", sets: 3, reps: "15", rest: "45s", notes: "Controle na descida" },
      { id: "p6_6", name: "Abdominal Supra Solo", sets: 3, reps: "20", rest: "45s", notes: "Contrair topo" }
    ],
    cardio: {
      type: "Caminhada Plana",
      durationMin: 15,
      bpmTarget: "< 120 bpm",
      incline: "0%",
      speed: "4.5 km/h"
    }
  },
  7: {
    title: "Cardio Regenerativo & Mobilidade Profunda",
    type: "Rest",
    mobility: [
      "Sessão completa de alongamento passivo (20 min)",
      "Posição do Cão Olhando pra Baixo / Criança (Yoga)",
      "Soltura profunda de flexores do quadril e peitoral"
    ],
    exercises: [],
    cardio: {
      type: "Caminhada ao Ar Livre ou Bike Leve",
      durationMin: 45,
      bpmTarget: "< 115 bpm",
      incline: "Plano",
      speed: "Confortável"
    }
  }
};

export const MEAL_PRESETS = [
  {
    id: "m1",
    time: "08:00",
    name: "Café da Manhã Matinal",
    calories: 420,
    protein: 26,
    carbs: 39,
    fats: 17,
    items: [
      "3 Ovos mexidos ou cozidos",
      "2 Fatias de pão 100% integral",
      "150g Mamão Papaia ou Morangos",
      "Café preto sem açúcar"
    ]
  },
  {
    id: "m2",
    time: "12:30",
    name: "Almoço Nutritivo",
    calories: 550,
    protein: 63,
    carbs: 44,
    fats: 11,
    items: [
      "180g Peito de frango grelhado ou Patinho moído",
      "120g Arroz integral ou Batata doce",
      "100g Feijão preto/carioca",
      "Vegetais verdes à vontade (Brócolis, Espinafre)",
      "5ml Azeite de oliva extra virgem"
    ]
  },
  {
    id: "m3",
    time: "16:30",
    name: "Pré-Treino Energético",
    calories: 350,
    protein: 30,
    carbs: 48,
    fats: 4.5,
    items: [
      "30g Whey Protein Concentrado",
      "40g Aveia em flocos",
      "1 Banana prata (~90g)",
      "1 Pitada de canela em pó"
    ]
  },
  {
    id: "m4",
    time: "21:00",
    name: "Pós-Treino / Jantar",
    calories: 530,
    protein: 63,
    carbs: 36,
    fats: 18,
    items: [
      "200g Peito de frango ou Tilápia assada",
      "150g Batata doce assada ou Arroz",
      "Salada verde colorida grande",
      "10ml Azeite de oliva extra virgem"
    ]
  },
  {
    id: "m5",
    time: "23:00",
    name: "Ceia Proteica (Opcional)",
    calories: 250,
    protein: 16,
    carbs: 13,
    fats: 11,
    items: [
      "170g Iogurte Natural Desnatado / Greco Zero",
      "15g Pasta de amendoim integral",
      "10g Sementes de chia"
    ]
  }
];
