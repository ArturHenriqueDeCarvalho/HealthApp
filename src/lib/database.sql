-- SQL Schema para Supabase (Protocolo 90 Dias)

-- Table 1: Daily Logs (Registros Diários)
CREATE TABLE IF NOT EXISTS daily_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT DEFAULT 'default_dev_user',
    day_number INT NOT NULL UNIQUE,
    water_ml INT DEFAULT 0,
    cardio_done BOOLEAN DEFAULT FALSE,
    mobility_done BOOLEAN DEFAULT FALSE,
    weight_kg NUMERIC(5,2) DEFAULT 120.00,
    completed_meals JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table 2: Exercise Logs (Registros de Exercícios por Dia)
CREATE TABLE IF NOT EXISTS exercise_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day_number INT NOT NULL,
    exercise_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    weight_kg TEXT,
    reps TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(day_number, exercise_id)
);

-- Table 3: Check-in Logs (Fadiga SNC & Articulações)
CREATE TABLE IF NOT EXISTS checkin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day_number INT NOT NULL UNIQUE,
    energy_level INT DEFAULT 8,
    doms_level INT DEFAULT 3,
    joint_status TEXT DEFAULT 'good',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_logs ENABLE ROW LEVEL SECURITY;

-- Allow public access for dev/testing
CREATE POLICY "Allow public select on daily_logs" ON daily_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on daily_logs" ON daily_logs FOR ALL USING (true);

CREATE POLICY "Allow public select on exercise_logs" ON exercise_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on exercise_logs" ON exercise_logs FOR ALL USING (true);

CREATE POLICY "Allow public select on checkin_logs" ON checkin_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on checkin_logs" ON checkin_logs FOR ALL USING (true);
