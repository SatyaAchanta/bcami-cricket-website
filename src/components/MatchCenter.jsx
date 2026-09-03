import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Filter, X, ShieldCheck } from 'lucide-react';
import { fixtures, currentTournament } from '../data/cricketData';

export default function MatchCenter() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [stageFilter, setStageFilter] = useState('all');

  const filteredFixtures = stageFilter === 'all' 
    ? fixtures 
    : fixtures.filter(f => f.stage.toLowerCase().includes(stageFilter.toLowerCase()));

  return (
    <section id="schedule" className="py-16 sm:py-20 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Match Operations & Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tournament Schedule & Fixtures
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Official match fixtures, timings, and ground allocations for the <strong>{currentTournament.title}</strong> across Lasky Park, Jayne Field, and Delia Park.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 flex-wrap">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">Filter Stage:</span>
            {['all', 'Group A', 'Group B', 'Knockout'].map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  stageFilter === s
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s === 'all' ? 'All Matches' : s}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{filteredFixtures.length} Matches Scheduled</span>
          </div>
        </div>

        {/* Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFixtures.map((fixture) => (
            <div
              key={fixture.id}
              className="bg-slate-950 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                
                {/* Header with Match No & Time */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-800/40">
                    {fixture.stage}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {fixture.time}
                  </span>
                </div>

                {/* Match title / Game identifier */}
                <div className="pt-2 pb-3 border-y border-slate-900 space-y-1 text-center">
                  <div className="text-lg font-black text-white">
                    {fixture.matchNo}
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {fixture.note}
                  </div>
                </div>

                {/* Date & Ground */}
                <div className="text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{fixture.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{fixture.venue}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  T20 Official Game
                </span>
                <button
                  onClick={() => setSelectedMatch(fixture)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedMatch(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {selectedMatch.stage}
              </span>
              <h3 className="text-xl font-black text-white">{selectedMatch.matchNo}</h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedMatch.note}
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-white">{selectedMatch.date} @ {selectedMatch.time}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-500">Venue:</span>
                <span className="font-semibold text-emerald-400">{selectedMatch.venue}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Match Rules:</span>
                <span className="font-semibold text-white">ICC Standard T20 Playing Conditions</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="#umpire-portal"
                onClick={() => setSelectedMatch(null)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Rate Game in Umpire Portal</span>
              </a>
              <button
                onClick={() => setSelectedMatch(null)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
