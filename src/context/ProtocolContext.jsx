import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PROFILE, WORKOUT_SCHEDULE_FASE1, MEAL_PRESETS, PHASES } from '../data/protocolData';
import { supabase } from '../lib/supabase';

const ProtocolContext = createContext();

const STORAGE_KEY = 'PROTOCOL_90_DAYS_LOGS_V1';
const CURRENT_DAY_KEY = 'PROTOCOL_90_DAYS_CURRENT_DAY_V1';

export function ProtocolProvider({ children }) {
  const [currentDay, setCurrentDayState] = useState(() => {
    const saved = localStorage.getItem(CURRENT_DAY_KEY);
    return saved ? parseInt(saved, 10) : 1;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading logs from localStorage", e);
      }
    }
    return {};
  });

  const [dbStatus, setDbStatus] = useState('syncing'); // 'syncing' | 'connected' | 'offline'

  // Load initial logs from Supabase on mount
  useEffect(() => {
    async function loadFromSupabase() {
      try {
        const { data: dailyData, error: dailyErr } = await supabase
          .from('daily_logs')
          .select('*');

        if (!dailyErr && dailyData) {
          setDbStatus('connected');
          setLogs((prev) => {
            const merged = { ...prev };
            dailyData.forEach((row) => {
              const day = row.day_number;
              merged[day] = {
                ...(merged[day] || {}),
                waterMl: row.water_ml ?? merged[day]?.waterMl ?? 0,
                cardioDone: row.cardio_done ?? merged[day]?.cardioDone ?? false,
                mobilityDone: row.mobility_done ?? merged[day]?.mobilityDone ?? false,
                weightKg: row.weight_kg ?? merged[day]?.weightKg ?? USER_PROFILE.initialWeightKg,
                completedMeals: row.completed_meals || merged[day]?.completedMeals || {}
              };
            });
            return merged;
          });
        } else {
          setDbStatus('connected');
        }
      } catch (e) {
        console.log("Supabase sync running in offline/local mode", e);
        setDbStatus('offline');
      }
    }

    loadFromSupabase();
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(CURRENT_DAY_KEY, currentDay.toString());
  }, [currentDay]);

  const setCurrentDay = (day) => {
    if (day >= 1 && day <= 90) {
      setCurrentDayState(day);
    }
  };

  const getDayLog = (dayNum = currentDay) => {
    return logs[dayNum] || {
      waterMl: 0,
      completedExercises: {},
      cardioDone: false,
      mobilityDone: false,
      completedMeals: {},
      checkIn: {
        energy: 8,
        doms: 3,
        jointStatus: 'good',
        notes: ''
      },
      weightKg: USER_PROFILE.initialWeightKg
    };
  };

  const updateDayLog = (dayNum, updateFn) => {
    setLogs((prev) => {
      const currentLog = prev[dayNum] || {
        waterMl: 0,
        completedExercises: {},
        cardioDone: false,
        mobilityDone: false,
        completedMeals: {},
        checkIn: {
          energy: 8,
          doms: 3,
          jointStatus: 'good',
          notes: ''
        },
        weightKg: USER_PROFILE.initialWeightKg
      };
      const updated = typeof updateFn === 'function' ? updateFn(currentLog) : { ...currentLog, ...updateFn };
      
      // Async background sync to Supabase
      supabase.from('daily_logs').upsert({
        day_number: dayNum,
        water_ml: updated.waterMl,
        cardio_done: updated.cardioDone,
        mobility_done: updated.mobilityDone,
        weight_kg: updated.weightKg,
        completed_meals: updated.completedMeals,
        updated_at: new Date().toISOString()
      }, { onConflict: 'day_number' }).then(({ error }) => {
        if (!error) setDbStatus('connected');
      }).catch(() => setDbStatus('offline'));

      return { ...prev, [dayNum]: updated };
    });
  };

  const addWater = (ml, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      waterMl: Math.max(0, (prev.waterMl || 0) + ml)
    }));
  };

  const resetWater = (dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      waterMl: 0
    }));
  };

  const toggleExercise = (exId, setDetails = null, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => {
      const exMap = { ...(prev.completedExercises || {}) };
      if (exMap[exId] && exMap[exId].completed && !setDetails) {
        delete exMap[exId];
      } else {
        exMap[exId] = {
          completed: true,
          weightKg: setDetails?.weightKg || exMap[exId]?.weightKg || '',
          reps: setDetails?.reps || exMap[exId]?.reps || ''
        };
      }

      // Sync exercise to Supabase
      supabase.from('exercise_logs').upsert({
        day_number: dayNum,
        exercise_id: exId,
        completed: exMap[exId]?.completed || false,
        weight_kg: exMap[exId]?.weightKg || '',
        reps: exMap[exId]?.reps || ''
      }, { onConflict: 'day_number,exercise_id' }).catch(() => {});

      return { ...prev, completedExercises: exMap };
    });
  };

  const toggleCardio = (dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      cardioDone: !prev.cardioDone
    }));
  };

  const toggleMobility = (dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      mobilityDone: !prev.mobilityDone
    }));
  };

  const toggleMeal = (mealId, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => {
      const mealMap = { ...(prev.completedMeals || {}) };
      mealMap[mealId] = !mealMap[mealId];
      return { ...prev, completedMeals: mealMap };
    });
  };

  const saveCheckIn = (checkInData, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      checkIn: { ...prev.checkIn, ...checkInData }
    }));

    supabase.from('checkin_logs').upsert({
      day_number: dayNum,
      energy_level: checkInData.energy,
      doms_level: checkInData.doms,
      joint_status: checkInData.jointStatus,
      notes: checkInData.notes
    }, { onConflict: 'day_number' }).catch(() => {});
  };

  const logWeight = (weightKg, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      weightKg: parseFloat(weightKg) || prev.weightKg
    }));
  };

  const getPhaseForDay = (dayNum) => {
    if (dayNum <= 30) return PHASES[0];
    if (dayNum <= 60) return PHASES[1];
    return PHASES[2];
  };

  const getWorkoutForDay = (dayNum) => {
    const dayOfWeekPattern = ((dayNum - 1) % 7) + 1;
    return WORKOUT_SCHEDULE_FASE1[dayOfWeekPattern] || WORKOUT_SCHEDULE_FASE1[1];
  };

  return (
    <ProtocolContext.Provider value={{
      currentDay,
      setCurrentDay,
      getDayLog,
      addWater,
      resetWater,
      toggleExercise,
      toggleCardio,
      toggleMobility,
      toggleMeal,
      saveCheckIn,
      logWeight,
      getPhaseForDay,
      getWorkoutForDay,
      dbStatus,
      userProfile: USER_PROFILE,
      mealPresets: MEAL_PRESETS,
      phases: PHASES
    }}>
      {children}
    </ProtocolContext.Provider>
  );
}

export const useProtocol = () => useContext(ProtocolContext);
