import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UmpirePortal from './components/UmpirePortal';
import MatchCenter from './components/MatchCenter';
import VenuesGuide from './components/VenuesGuide';
import ContactFooter from './components/ContactFooter';
import { currentTournament } from './data/cricketData';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-red-950 border-b border-slate-800 text-center py-2 px-4 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{currentTournament.title} • {currentTournament.dates} • Lasky Recreation Park, Detroit</span>
      </div>

      {/* Navigation (Home | Umpire Assessment | Schedule | Detroit Grounds) */}
      <Navbar />

      {/* Main Streamlined Sections */}
      <main className="flex-1 space-y-0">
        
        {/* 1. HOMEPAGE */}
        <Hero />

        {/* 2. UMPIRING ASSESSMENT PORTAL WITH UNIQUE PIN VERIFICATION */}
        <UmpirePortal />

        {/* 3. TOURNAMENT SCHEDULE */}
        <MatchCenter />

        {/* 4. DETROIT GROUNDS & DIRECTIONS */}
        <VenuesGuide />

      </main>

      {/* FOOTER */}
      <ContactFooter />

    </div>
  );
}
