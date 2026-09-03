import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UmpirePortal from './components/UmpirePortal';
import TeamsSection from './components/TeamsSection';
import MatchCenter from './components/MatchCenter';
import LiveGameCenter from './components/LiveGameCenter';
import VenuesGuide from './components/VenuesGuide';
import AboutLeadership from './components/AboutLeadership';
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-red-950 border-b border-slate-800 text-center py-2 px-4 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{currentTournament.title} • {currentTournament.dates} • Lasky Recreation Park, Detroit</span>
      </div>

      {/* Navigation (1. Home | 2. Umpire Assessment | 3. Teams | 4. Schedule | 5. Live Links) */}
      <Navbar
        isClerkLive={isClerkLive}
        clerkUser={clerkUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Pages in Exact Requested Order */}
      <main className="flex-1 space-y-0">
        
        {/* 1. HOMEPAGE & HERO BANNER */}
        <Hero />

        {/* 2. UMPIRING ASSESSMENT PORTAL */}
        <UmpirePortal
          isClerkLive={isClerkLive}
          clerkUser={clerkUser}
          onSimulateLogin={() => setAuthModalOpen(true)}
          onSimulateLogout={handleLogout}
        />

        {/* 3. TEAMS & FRANCHISE SQUADS */}
        <TeamsSection />

        {/* 4. SCHEDULE & POINTS TABLE STANDINGS */}
        <MatchCenter />

        {/* 5. LIVE LINKS TO THE GAME & DIGITAL SCORING */}
        <LiveGameCenter />

        {/* DETROIT GROUNDS & VENUES DIRECTORY */}
        <VenuesGuide />

        {/* ABOUT BCAMI & LEADERSHIP */}
        <AboutLeadership />

      </main>

      {/* FOOTER */}
      <ContactFooter />

      {/* Clerk / Local Umpire Auth Modal */}
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
