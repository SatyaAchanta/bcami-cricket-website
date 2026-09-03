import React, { useState } from 'react';
import { Calendar, Trophy, Clock, MapPin, Award, CheckCircle2, ChevronRight, ExternalLink, Filter, X } from 'lucide-react';
import { fixtures, recentResults, pointsTableGroupA, pointsTableGroupB, currentTournament } from '../data/cricketData';

export default function MatchCenter() {
  const [activeTab, setActiveTab] = useState('fixtures'); // 'fixtures' | 'results' | 'standings'
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [stageFilter, setStageFilter] = useState('all');

  const filteredFixtures = stageFilter === 'all' 
    ? fixtures 
    : fixtures.filter(f => f.stage.toLowerCase().includes(stageFilter.toLowerCase()));

  return (
    <section id="match-center" className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Match Operations & Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            BCAMI Match Center
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Stay updated with real-time fixtures, ball-by-ball tournament tracking, points table standings, and matchday scorecards.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'fixtures'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Fixtures ({fixtures.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'results'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Recent Results</span>
          </button>

          <button
            onClick={() => setActiveTab('standings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'standings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Points Table & NRR</span>
          </button>
        </div>

        {/* TAB 1: UPCOMING FIXTURES */}
        {activeTab === 'fixtures' && (
          <div className="space-y-6">
            
            {/* Filter Pill Strip */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter stage:</span>
                {['all', 'Group A', 'Group B', 'Knockout'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStageFilter(s)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors ${
                      stageFilter === s
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span>Scored via CricClubs system</span>
              </div>
            </div>

            {/* Fixtures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/40">
                        {fixture.stage}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {fixture.time}
                      </span>
                    </div>

                    <div className="pt-2 pb-3 border-y border-slate-900 space-y-2">
                      <div className="text-base font-bold text-white flex items-center justify-between">
                        <span>{fixture.team1}</span>
                      </div>
                      <div className="text-xs font-bold text-center text-slate-500 py-0.5 uppercase tracking-wider">
                        vs
                      </div>
                      <div className="text-base font-bold text-white flex items-center justify-between">
                        <span>{fixture.team2}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{fixture.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>{fixture.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 italic truncate max-w-[180px]">
                      {fixture.note}
                    </span>
                    <button
                      onClick={() => setSelectedMatch(fixture)}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
                    >
                      <span>Match Preview</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RECENT RESULTS */}
        {activeTab === 'results' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResults.map((res) => (
              <div
                key={res.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                    {res.tournament}
                  </span>
                  <span className="text-slate-400">{res.date}</span>
                </div>

                <div className="space-y-2 py-2 border-y border-slate-900">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span>{res.score1.split(':')[0]}</span>
                    <span className="text-emerald-400 font-mono">{res.score1.split(':')[1]}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                    <span>{res.score2.split(':')[0]}</span>
                    <span className="text-slate-400 font-mono">{res.score2.split(':')[1]}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">
                  🏆 {res.summary}
                </div>

                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Player of Match:</strong> {res.playerOfMatch}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{res.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: STANDINGS & POINTS TABLE */}
        {activeTab === 'standings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Group A */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Group A Standings
                </h3>
                <span className="text-xs font-semibold text-slate-400">Top 2 Qualify for Semis</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3 font-semibold">Team</th>
                      <th className="py-2.5 px-2 text-center font-semibold">P</th>
                      <th className="py-2.5 px-2 text-center font-semibold">W</th>
                      <th className="py-2.5 px-2 text-center font-semibold">L</th>
                      <th className="py-2.5 px-3 text-right font-semibold">NRR</th>
                      <th className="py-2.5 px-3 text-right font-bold text-white">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-medium">
                    {pointsTableGroupA.map((row, idx) => (
                      <tr key={row.team} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                            idx < 2 ? 'bg-emerald-900 text-emerald-300 font-bold' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          {row.team}
                        </td>
                        <td className="py-3 px-2 text-center text-slate-300">{row.played}</td>
                        <td className="py-3 px-2 text-center text-emerald-400 font-semibold">{row.won}</td>
                        <td className="py-3 px-2 text-center text-red-400">{row.lost}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300">{row.nrr}</td>
                        <td className="py-3 px-3 text-right font-black text-amber-400 text-base">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Group B */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Group B Standings
                </h3>
                <span className="text-xs font-semibold text-slate-400">Top 2 Qualify for Semis</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3 font-semibold">Team</th>
                      <th className="py-2.5 px-2 text-center font-semibold">P</th>
                      <th className="py-2.5 px-2 text-center font-semibold">W</th>
                      <th className="py-2.5 px-2 text-center font-semibold">L</th>
                      <th className="py-2.5 px-3 text-right font-semibold">NRR</th>
                      <th className="py-2.5 px-3 text-right font-bold text-white">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-medium">
                    {pointsTableGroupB.map((row, idx) => (
                      <tr key={row.team} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${
                            idx < 2 ? 'bg-blue-900 text-blue-300 font-bold' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          {row.team}
                        </td>
                        <td className="py-3 px-2 text-center text-slate-300">{row.played}</td>
                        <td className="py-3 px-2 text-center text-emerald-400 font-semibold">{row.won}</td>
                        <td className="py-3 px-2 text-center text-red-400">{row.lost}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300">{row.nrr}</td>
                        <td className="py-3 px-3 text-right font-black text-amber-400 text-base">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Match Preview Modal */}
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
                {selectedMatch.matchNo} • {selectedMatch.stage}
              </span>
              <h3 className="text-xl font-black text-white">Match Information</h3>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-base font-bold text-white">
                <span>{selectedMatch.team1}</span>
                <span className="text-xs text-slate-400 font-mono">VS</span>
                <span>{selectedMatch.team2}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
                {selectedMatch.note}
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-white">{selectedMatch.date} @ {selectedMatch.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Venue:</span>
                <span className="font-semibold text-emerald-400">{selectedMatch.venue}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Format:</span>
                <span className="font-semibold text-white">20 Overs (T20 Red/White Ball)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={currentTournament.cricClubsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                <span>CricClubs Live Scorecard</span>
                <ExternalLink className="w-3.5 h-3.5" />
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
