import React from 'react';
import { Mail, MapPin, Trophy, ShieldCheck, Heart } from 'lucide-react';
import { orgInfo, currentTournament } from '../data/cricketData';

export default function ContactFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          {/* Brand & Mission */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
                <img
                  src={orgInfo.logo}
                  alt="BCAMI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">BCAMI USA</span>
                <p className="text-xs text-slate-400">Bangladesh Cricket Association of Michigan</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {orgInfo.tagline}. Organizing the annual <strong>{currentTournament.title}</strong> across Detroit, fostering sportsmanship, and uniting community cricketers.
            </p>
          </div>

          {/* Contact Details & Official Channels */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-10">
            
            {/* Direct Info */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Official Email</span>
                  <a href={`mailto:${orgInfo.email}`} className="font-semibold text-white hover:text-emerald-400 transition-colors">
                    {orgInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Primary Venue</span>
                  <span className="font-semibold text-white">Lasky Recreation Park • Detroit, MI</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Official Channels
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href={orgInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <span>Facebook: @bcamiusa</span>
                </a>
                <a
                  href={orgInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 border border-pink-500/30 text-xs font-bold transition-colors inline-flex items-center gap-2"
                >
                  <span>Instagram: @BCAMIUSA</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bangladesh Cricket Association of Michigan (BCAMIUSA). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#tournament" className="hover:text-slate-300 transition-colors">Home</a>
            <span>•</span>
            <a href="#umpire-portal" className="hover:text-slate-300 transition-colors">Umpire Portal</a>
            <span>•</span>
            <a href="#schedule" className="hover:text-slate-300 transition-colors">Schedule</a>
            <span>•</span>
            <a href="#grounds" className="hover:text-slate-300 transition-colors">Detroit Grounds</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
