import React, { useState } from 'react';
import { ProtocolProvider } from './context/ProtocolContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import WorkoutView from './components/WorkoutView';
import NutritionView from './components/NutritionView';
import CheckInView from './components/CheckInView';
import DocsView from './components/DocsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ProtocolProvider>
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-4 md:pt-6">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
          {activeTab === 'workout' && <WorkoutView />}
          {activeTab === 'nutrition' && <NutritionView />}
          {activeTab === 'checkin' && <CheckInView />}
          {activeTab === 'docs' && <DocsView />}
        </main>
      </div>
    </ProtocolProvider>
  );
}
