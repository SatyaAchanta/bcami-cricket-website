import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchCenter from './components/MatchCenter';
import VenuesGuide from './components/VenuesGuide';
import AboutLeadership from './components/AboutLeadership';
import UmpirePortal from './components/UmpirePortal';
import AuthModal from './components/AuthModal';
import ContactFooter from './components/ContactFooter';
import { currentTournament } from './data/cricketData';

export default function App({ isClerkLive = false }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [clerkUser, setClerkUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bcami_current_umpire');
      return saved ? JSON.parse(saved) : {
        fullName: 'Tariqul Anam',
        email: 'tariqul@bcami.org',
        primaryEmailAddress: { emailAddress: 'tariqul@bcami.org' }
      };
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (user) => {
    setClerkUser(user);
    try {
      localStorage.setItem('bcami_current_umpire', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setClerkUser(null);
    try {
      localStorage.removeItem('bcami_current_umpire');
    } catch (e) {}
  };

  const scrollToSchedule = () => {
    const el = document.getElementById('schedule');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUmpirePortal = () => {
    const el = document.getElementById('umpire-portal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-red-950 border-b border-slate-800 text-center py-2 px-4 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{currentTournament.title} • {currentTournament.dates} • Lasky Recreation Park, Detroit</span>
      </div>

      {/* Navigation */}
      <Navbar
        isClerkLive={isClerkLive}
        clerkUser={clerkUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Pages */}
      <main className="flex-1">
        
        {/* 1. Hero & Tournament Overview */}
        <Hero
          onExploreFixtures={scrollToSchedule}
          onExploreTeams={scrollToUmpirePortal}
        />

        {/* 2. Schedule & Fixtures */}
        <div id="schedule">
          <MatchCenter />
        </div>

        {/* 3. Grounds & Venues Directory */}
        <div id="grounds">
          <VenuesGuide />
        </div>

        {/* 4. About BCAMI & Governance */}
        <div id="about">
          <AboutLeadership />
        </div>

        {/* 5. Umpire Fair Play Assessment & Rating Portal */}
        <UmpirePortal
          isClerkLive={isClerkLive}
          clerkUser={clerkUser}
          onSimulateLogin={() => setAuthModalOpen(true)}
          onSimulateLogout={handleLogout}
        />

      </main>

      {/* Footer */}
      <ContactFooter />

      {/* Auth Modal for Umpire login */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={clerkUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isClerkConfigured={isClerkLive}
      />

    </div>
  );
}
