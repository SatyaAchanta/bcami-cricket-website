import React, { useState } from 'react';
import { Users, Trophy, Shield, User, ChevronRight, X, Sparkles } from 'lucide-react';
import { teams } from '../data/cricketData';

export default function TeamsSection() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <section id="teams" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Community Franchises</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Teams & Franchise Squads
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Meet the 8 premier teams competing in the BD Community Cup. From storied champions to dynamic contenders, explore rosters and team leadership.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="group cursor-pointer bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30"
            >
              <div className="space-y-4">
                
                {/* Team Card Top: Badge & Short code */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center font-black text-white text-lg shadow-md border border-white/20`}>
                    {team.short}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 group-hover:text-emerald-400 transition-colors">
                    {team.squad.length} Players
                  </span>
                </div>

                {/* Team Name & Titles */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {team.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold mt-1">
                    <Trophy className="w-3 h-3" />
                    <span>{team.titles}</span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {team.bio}
                </p>

                {/* Captain & Colors */}
                <div className="pt-3 border-t border-slate-800 text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Captain:</span>
                    <span className="font-semibold text-white">{team.captain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Colors:</span>
                    <span className="font-medium text-slate-300">{team.jersey}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                <span>View Full Roster</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Team Details & Roster Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedTeam.color} flex items-center justify-center font-black text-white text-2xl shadow-lg border border-white/20 shrink-0`}>
                {selectedTeam.short}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">{selectedTeam.name}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="text-amber-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    {selectedTeam.titles}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Owner: {selectedTeam.owner}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedTeam.bio}
            </p>

            {/* Squad Roster Listing */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Official Squad Roster ({selectedTeam.squad.length} Players)
                </h4>
                <span className="text-xs text-emerald-400 font-medium">Captain: {selectedTeam.captain}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTeam.squad.map((player, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                      player.name === selectedTeam.captain
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-white">{player.name}</span>
                    </div>
                    <span className={`text-[11px] ${
                      player.name === selectedTeam.captain ? 'text-emerald-300 font-bold' : 'text-slate-400'
                    }`}>
                      {player.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTeam(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
