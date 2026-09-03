import React from 'react';
import { Info, ShieldCheck, Heart, Users, CheckCircle, FileText } from 'lucide-react';
import { orgInfo, executiveCommittee } from '../data/cricketData';

export default function AboutLeadership() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Organization & Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About BCAMI & Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Dedicated to uniting the Bangladeshi diaspora, fostering youth athletics, and maintaining the highest standards of sportsmanship across Michigan.
          </p>
        </div>

        {/* Mission & Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Community & Unity</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded to celebrate our shared heritage, bringing families, youth, and cricket enthusiasts together every summer under Michigan skies.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Integrity & Sportsmanship</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upholding strict ICC & tournament guidelines, certified umpiring standards, and transparent draft processes to ensure fair play.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Youth & Growth</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Providing a competitive platform for the next generation of American-Bangladeshi cricketers to refine their game on quality turf.
            </p>
          </div>
        </div>

        {/* Executive Committee Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-black text-white">Executive Committee</h3>
              <p className="text-xs text-slate-400">The organizing leaders behind BCAMI & the BD Community Cup</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              Elected Board
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveCommittee.map((exec, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center space-y-4 hover:border-slate-700 transition-all hover:shadow-lg"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-500/40 p-0.5 bg-slate-950">
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">{exec.name}</h4>
                  <p className="text-xs font-semibold text-emerald-400">{exec.role}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {exec.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code of Conduct & Bylaws Note */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Official BCAMI Tournament Bylaws & Regulations</h4>
              <p className="text-xs text-slate-400">All players and franchises are governed by BCAMI disciplinary rules and ICC T20 standard playing conditions.</p>
            </div>
          </div>
          <a
            href={`mailto:${orgInfo.email}?subject=Tournament%20Bylaws%20Request`}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shrink-0"
          >
            Request Official Rules PDF
          </a>
        </div>

      </div>
    </section>
  );
}
