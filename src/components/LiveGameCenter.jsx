import React, { useState } from 'react';
import { Radio, ExternalLink, Play, Tv, Sparkles, Trophy, Calendar, MapPin, Activity, CheckCircle } from 'lucide-react';
import { currentTournament, fixtures, orgInfo } from '../data/cricketData';

export default function LiveGameCenter() {
  const [selectedStream, setSelectedStream] = useState('main');

  return (
    <section id="live" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span>Real-Time Broadcast & Scoring</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Live Game Links & Broadcasts
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Follow the <strong>{currentTournament.title}</strong> live from anywhere with high-definition video streaming, CricClubs live ball-by-ball scorecards, and commentary.
          </p>
        </div>

        {/* Live Action Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Broadcast Player (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Official Matchday Live Stream
                  </h3>
                  <p className="text-xs text-slate-400">Broadcasted from Lasky Recreation Park & Jayne Field</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                  LIVE HD 1080p
                </span>
              </div>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group flex items-center justify-center shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
                alt="Live Match Broadcast"
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Center Play Action */}
              <div className="relative z-10 text-center space-y-4 p-4">
                <a
                  href={orgInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-900/60 hover:scale-110 active:scale-95 transition-all mx-auto group/btn"
                  aria-label="Open Live Stream on Facebook"
                >
                  <Play className="w-8 h-8 fill-current ml-1 group-hover/btn:scale-110 transition-transform" />
                </a>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    9th BD Community Cup • Live Stream
                  </h4>
                  <p className="text-xs text-emerald-400 font-medium">
                    Streaming live commentary on Facebook & YouTube (@bcamiusa)
                  </p>
                </div>
              </div>

              {/* Overlays */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Lasky Recreation Park (Center Pitch)</span>
              </div>
            </div>

            {/* Quick Stream Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={orgInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <Tv className="w-4 h-4" />
                <span>Watch on Facebook Live</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-bold text-xs sm:text-sm transition-all"
              >
                <Radio className="w-4 h-4" />
                <span>Watch on YouTube Live</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* CricClubs Live Scoring & Digital Scorecards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CricClubs Direct Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Official Digital Scoring
                  </span>
                  <h3 className="text-xl font-black text-white">CricClubs Match Center</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  CC
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Access official ball-by-ball updates, live wagon wheels, batter strike rates, bowling economies, and match worm graphs hosted on CricClubs.
              </p>

              {/* Match Scoring Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="font-bold text-emerald-400">Opening Match</span>
                    <span>Sep 5 • 9:00 AM EDT</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-sm text-white">
                    <span>Power Rangers</span>
                    <span className="text-xs text-slate-500">VS</span>
                    <span>Sultan's of Sylhet</span>
                  </div>
                  <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Lasky Recreation Park</span>
                    <a
                      href={currentTournament.cricClubsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Live Scorecard</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="font-bold text-blue-400">Match 2</span>
                    <span>Sep 5 • 1:00 PM EDT</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-sm text-white">
                    <span>Detroit Strikers</span>
                    <span className="text-xs text-slate-500">VS</span>
                    <span>Michigan Eagles</span>
                  </div>
                  <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Jayne Field</span>
                    <a
                      href={currentTournament.cricClubsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Live Scorecard</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Full Tournament Portal Link */}
              <a
                href={currentTournament.cricClubsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 transition-all"
              >
                <span>Open Full CricClubs Tournament Hub</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
