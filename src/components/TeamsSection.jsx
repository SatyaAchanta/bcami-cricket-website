import React from 'react';
import { Users, Shield, Trophy } from 'lucide-react';
import { teams, currentTournament } from '../data/cricketData';

export default function TeamsSection() {
  return (
    <section id="teams" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Community Contenders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Participating Teams
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The 8 official community teams competing for the prestigious <strong>{currentTournament.title}</strong> and the Fair Play Award.
          </p>
        </div>

        {/* Teams Grid (8 Teams) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, idx) => (
            <div
              key={team.id}
              className={`bg-slate-900/90 border ${team.border} rounded-2xl p-6 flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center font-black text-white text-lg shadow-lg border border-white/20 shrink-0`}>
                {team.short}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Team #{idx + 1}
                </span>
                <h3 className="text-base font-black text-white">
                  {team.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
