import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PROFILE, WORKOUT_SCHEDULE_FASE1, MEAL_PRESETS, PHASES } from '../data/protocolData';

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

  // Get or initialize log for a specific day
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
        jointStatus: 'good', // 'good' | 'warning' | 'pain'
        notes: ''
      },
      weightKg: USER_PROFILE.initialWeightKg
    };
  };

  // Update log for a specific day
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
      return { ...prev, [dayNum]: updated };
    });
  };

  // Quick Action Helpers
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
  };

  const logWeight = (weightKg, dayNum = currentDay) => {
    updateDayLog(dayNum, (prev) => ({
      ...prev,
      weightKg: parseFloat(weightKg) || prev.weightKg
    }));
  };

  // Helper to determine phase for any day
  const getPhaseForDay = (dayNum) => {
    if (dayNum <= 30) return PHASES[0];
    if (dayNum <= 60) return PHASES[1];
    return PHASES[2];
  };

  // Helper to get workout prescription for a day
  const getWorkoutForDay = (dayNum) => {
    // Phase 1 schedule pattern (repeats every 7 days)
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
      userProfile: USER_PROFILE,
      mealPresets: MEAL_PRESETS,
      phases: PHASES
    }}>
      {children}
    </ProtocolContext.Provider>
  );
}

export const useProtocol = () => useContext(ProtocolContext);
