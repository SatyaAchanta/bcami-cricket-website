import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, ChevronRight, ShieldCheck, Sparkles, Flame, Award } from 'lucide-react';
import { currentTournament, orgInfo } from '../data/cricketData';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(currentTournament.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="tournament" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{currentTournament.badge} • Detroit, Michigan</span>
              </div>
            </div>

            {/* Headline with Logo */}
            <div className="space-y-4">
              <div className="max-w-md mx-auto lg:mx-0 flex items-center justify-center lg:justify-start">
                <img
                  src={currentTournament.logo}
                  alt={currentTournament.title}
                  className="w-full h-auto object-contain max-h-52 sm:max-h-60 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:scale-102 transition-transform"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Welcome to the <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                  {currentTournament.title}
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Official tournament platform organized by the <strong>Bangladesh Cricket Association of Michigan (BCAMI)</strong>. Bringing community cricketers together across Detroit's top grounds.
            </p>

            {/* Key Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">{currentTournament.dates}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{currentTournament.primaryVenue}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#umpire-portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Umpire Fair Play Rating</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#schedule"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>View Tournament Schedule</span>
              </a>
            </div>
          </div>

          {/* Right Countdown Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/30 via-slate-800 to-red-500/30 shadow-2xl">
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 space-y-6 border border-slate-800">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Tournament Countdown
                    </span>
                    <h2 className="text-xl font-black text-white mt-0.5">{currentTournament.shortTitle}</h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Mins', value: timeLeft.minutes },
                    { label: 'Secs', value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Award className="w-4 h-4" />
                    <span>Official Match Officiating</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Certified umpires evaluate team conduct and sporting behavior to determine the tournament Fair Play Award.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Official BCAMI sanction
                  </span>
                  <a
                    href={orgInfo.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    @bcamiusa
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Fast Stats Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {orgInfo.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
