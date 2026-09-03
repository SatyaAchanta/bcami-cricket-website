import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  MapPin, 
  Calendar, 
  Key, 
  Lock, 
  Unlock, 
  RefreshCw 
} from 'lucide-react';
import { fixtures, venues, currentTournament, teams } from '../data/cricketData';
import { verifyUmpirePin } from '../utils/umpireAuth';

const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

export default function UmpirePortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState(null);

  // Umpire PIN State
  const [umpirePin, setUmpirePin] = useState(() => {
    try {
      return localStorage.getItem('bcami_saved_umpire_pin') || '';
    } catch (e) {
      return '';
    }
  });

  const [pinVerification, setPinVerification] = useState({ valid: false, message: '' });

  // Form State
  const [selectedMatchId, setSelectedMatchId] = useState(fixtures[0]?.id || 'custom');
  const [matchNumber, setMatchNumber] = useState(fixtures[0]?.matchNo || 'League Match 1');
  const [matchDate, setMatchDate] = useState(fixtures[0]?.date || 'Saturday, Sep 5, 2026');
  const [venue, setVenue] = useState(fixtures[0]?.venue || 'Lasky Recreation Park');
  const [umpireName, setUmpireName] = useState('');
  
  // Team Selection
  const [teamEvaluated, setTeamEvaluated] = useState(teams[0]?.name || 'Power Rangers');
  const [opponentTeam, setOpponentTeam] = useState(teams[1]?.name || "Sultan's of Sylhet");

  // Fair Play Assessment Rating Fields (1 to 10 scale)
  const [ratings, setRatings] = useState({
    respectUmpires: 9,      // Respect for umpire authority and decisions
    respectOpponents: 9,    // Behavior towards opponents, no sledging/abusive language
    captainLeadership: 8,   // Captain's control of player conduct
    spiritOfCricket: 9,     // Integrity, walking when out, equipment/dress code
    overRateTimeliness: 8,  // Adherence to time limits and over-rates
  });

  const [disciplinaryIncident, setDisciplinaryIncident] = useState('No');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [generalComments, setGeneralComments] = useState('');

  // Validate PIN whenever it changes
  useEffect(() => {
    if (umpirePin.trim().length >= 4) {
      const res = verifyUmpirePin(umpirePin);
      setPinVerification(res);
      if (res.valid) {
        setUmpireName(res.umpire.name);
        try {
          localStorage.setItem('bcami_saved_umpire_pin', umpirePin.trim());
        } catch (e) {}
      }
    } else {
      setPinVerification({ valid: false, message: 'Please enter your assigned 4-digit PIN' });
      setUmpireName('');
    }
  }, [umpirePin]);

  // When match selector changes
  const handleMatchSelect = (e) => {
    const fId = e.target.value;
    setSelectedMatchId(fId);
    const f = fixtures.find(item => item.id === fId);
    if (f) {
      setMatchNumber(f.matchNo);
      setMatchDate(f.date);
      setVenue(f.venue);
      if (f.team1) setTeamEvaluated(f.team1);
      if (f.team2) setOpponentTeam(f.team2);
    }
  };

  // Compute Total Fair Play Score (Max 50)
  const totalScore = Object.values(ratings).reduce((acc, curr) => acc + Number(curr), 0);
  const maxScore = 50;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getScoreBadge = (pct) => {
    if (pct >= 85) return { text: 'Outstanding Fair Play (Grade A)', color: 'text-emerald-400 bg-emerald-950 border-emerald-500/40' };
    if (pct >= 70) return { text: 'Good Sporting Behavior (Grade B)', color: 'text-blue-400 bg-blue-950 border-blue-500/40' };
    if (pct >= 50) return { text: 'Satisfactory / Warnings (Grade C)', color: 'text-amber-400 bg-amber-950 border-amber-500/40' };
    return { text: 'Poor / Disciplinary Review (Grade D)', color: 'text-red-400 bg-red-950 border-red-500/40' };
  };

  const badge = getScoreBadge(percentage);

  // Submit Handler -> Sends directly to Google Sheet
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pinVerification.valid) {
      alert('Please enter a valid 4-digit Umpire PIN before submitting.');
      return;
    }

    setIsSubmitting(true);

    const newEntry = {
      id: 'sub-' + Date.now(),
      date: matchDate,
      match: matchNumber,
      venue,
      team: teamEvaluated.trim(),
      opponent: opponentTeam.trim(),
      umpire: umpireName || `Umpire (PIN: ${umpirePin})`,
      umpirePin: umpirePin.trim(),
      scores: { ...ratings },
      totalScore,
      maxScore,
      percentage,
      disciplinaryIncident,
      incidentDetails: disciplinaryIncident === 'Yes' ? incidentDetails : 'None',
      comments: generalComments,
      timestamp: new Date().toISOString()
    };

    // Post to Google Sheets Webhook
    let syncedToSheet = false;
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        });
        syncedToSheet = true;
      } catch (err) {
        console.warn('Google Sheets Webhook notice:', err);
      }
    }

    // Save copy in background
    try {
      const saved = localStorage.getItem('bcami_umpire_ratings');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('bcami_umpire_ratings', JSON.stringify([newEntry, ...existing]));
    } catch (err) {}

    setIsSubmitting(false);
    setSheetSyncStatus(syncedToSheet ? 'synced' : 'saved');
    setSubmittedSuccess(true);

    // Reset remarks for next submission
    setGeneralComments('');
    setDisciplinaryIncident('No');
    setIncidentDetails('');

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4000);
  };

  return (
    <section id="umpire-portal" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Match Officials Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Umpire Fair Play Assessment
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Enter your assigned 4-digit PIN to evaluate match conduct. Ratings are submitted directly to the Tournament Committee.
            </p>
          </div>

          {/* Umpire Verification Badge / PIN Status */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex items-center gap-4 transition-all shadow-xl shrink-0 ${
            pinVerification.valid
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-900/90 border-slate-800 text-slate-400'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
              pinVerification.valid
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {pinVerification.valid ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold uppercase tracking-wider">
                {pinVerification.valid ? '✓ Verified Official' : 'Umpire PIN Required'}
              </div>
              <div className="text-sm sm:text-base font-black text-white">
                {pinVerification.valid ? umpireName : 'Enter 4-Digit PIN below'}
              </div>
            </div>
          </div>
        </div>

        {/* ASSESSMENT FORM */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {submittedSuccess && (
            <div className="p-6 bg-emerald-950 border border-emerald-500 rounded-2xl text-center space-y-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Assessment Submitted Successfully!</h4>
              <p className="text-xs text-slate-300">
                Official rating for <strong>{teamEvaluated}</strong> ({totalScore}/50 - {percentage}%) recorded securely.
              </p>
            </div>
          )}

          {/* 1. Umpire Verification & Match Info */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <Key className="w-4 h-4 text-emerald-400" />
              1. Umpire PIN & Match Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              
              {/* PIN Input */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
                <label className="block text-emerald-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Enter Your 4-Digit Umpire PIN *
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  value={umpirePin}
                  onChange={(e) => setUmpirePin(e.target.value)}
                  placeholder="e.g. 1001"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-base font-black tracking-widest text-center focus:outline-none focus:border-emerald-500"
                />
                <div className={`text-[11px] font-semibold text-center ${
                  pinVerification.valid ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  {pinVerification.valid ? `✓ ${pinVerification.message}` : pinVerification.message}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Verified Umpire Name</label>
                <input
                  type="text"
                  disabled
                  value={pinVerification.valid ? umpireName : 'Enter valid PIN above'}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-300 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Select Scheduled Fixture</label>
                <select
                  value={selectedMatchId}
                  onChange={handleMatchSelect}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {fixtures.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.matchNo}: {f.team1} vs {f.team2} ({f.date})
                    </option>
                  ))}
                  <option value="custom">Custom Match</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Match Venue</label>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  {venues.map(v => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Team Being Evaluated</label>
                <select
                  value={teamEvaluated}
                  onChange={(e) => setTeamEvaluated(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Opponent Team</label>
                <select
                  value={opponentTeam}
                  onChange={(e) => setOpponentTeam(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Rating Criteria (1 to 10 scale) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                2. Assessment Categories (1 to 10 Scale)
              </h3>
              <span className="text-xs text-slate-400">1 = Poor • 10 = Exemplary</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Respect for Umpires */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Respect for Umpire Authority & Decisions</h4>
                    <p className="text-xs text-slate-400">Accepting decisions with zero dissent or aggressive gesturing.</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {ratings.respectUmpires}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.respectUmpires}
                  onChange={(e) => setRatings({...ratings, respectUmpires: Number(e.target.value)})}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* 2. Respect for Opponents */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Conduct Towards Opposition</h4>
                    <p className="text-xs text-slate-400">Respectful interaction, zero abusive language or personal sledging.</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {ratings.respectOpponents}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.respectOpponents}
                  onChange={(e) => setRatings({...ratings, respectOpponents: Number(e.target.value)})}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* 3. Captain's Leadership */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Captain's Leadership & Player Control</h4>
                    <p className="text-xs text-slate-400">Proactively controlling team members and setting a high standard.</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {ratings.captainLeadership}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.captainLeadership}
                  onChange={(e) => setRatings({...ratings, captainLeadership: Number(e.target.value)})}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* 4. Spirit of Cricket */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Spirit of Cricket & Dress Code</h4>
                    <p className="text-xs text-slate-400">Full uniform, integrity, and adherence to tournament regulations.</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {ratings.spiritOfCricket}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.spiritOfCricket}
                  onChange={(e) => setRatings({...ratings, spiritOfCricket: Number(e.target.value)})}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* 5. Pace of Play */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 md:col-span-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Pace of Play & Over-Rate Discipline</h4>
                    <p className="text-xs text-slate-400">Completing 20 overs within official allocated tournament time.</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-mono px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    {ratings.overRateTimeliness}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings.overRateTimeliness}
                  onChange={(e) => setRatings({...ratings, overRateTimeliness: Number(e.target.value)})}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* 3. Incidents & Final Calculation */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Fair Play Score</span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                  {totalScore} <span className="text-slate-500 text-xl font-normal">/ 50 ({percentage}%)</span>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold ${badge.color}`}>
                {badge.text}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Formal Warning Issued?</label>
                <select
                  value={disciplinaryIncident}
                  onChange={(e) => setDisciplinaryIncident(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="No">No Incidents (Clean Game)</option>
                  <option value="Yes">Yes (Formal Warning / Penalty)</option>
                </select>
              </div>

              {disciplinaryIncident === 'Yes' && (
                <div className="sm:col-span-2">
                  <label className="block text-red-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Specify Incident Details
                  </label>
                  <input
                    type="text"
                    required
                    value={incidentDetails}
                    onChange={(e) => setIncidentDetails(e.target.value)}
                    placeholder="e.g. Warning for excessive appealing or time-wasting"
                    className="w-full bg-slate-900 border border-red-500/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500 text-xs"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 text-xs sm:text-sm">
                Umpire Remarks & Observations
              </label>
              <textarea
                rows={3}
                value={generalComments}
                onChange={(e) => setGeneralComments(e.target.value)}
                placeholder="Notes on sporting spirit, positive moments, or areas for improvement..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
              ></textarea>
            </div>

          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !pinVerification.valid}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all ${
                pinVerification.valid
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white shadow-emerald-950/50 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Submission...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{pinVerification.valid ? `Submit as ${umpireName}` : 'Enter Valid PIN to Submit'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
