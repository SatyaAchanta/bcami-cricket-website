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
  RefreshCw,
  MinusCircle,
  PlusCircle,
  HelpCircle,
  Users
} from 'lucide-react';
import { fixtures, venues, currentTournament, teams, SPIRIT_QUESTIONS, UNFAIR_PLAY_QUESTIONS, umpires } from '../data/cricketData';
import { verifyUmpirePin } from '../utils/umpireAuth';

const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

// Initial state for one team's ratings
const createInitialTeamRatings = () => ({
  // Positive Spirit Criteria (1 to 5)
  spirit: {
    respectUmpires: 5,
    respectOpposition: 5,
    respectOwnTeam: 5,
    properAttire: 5,
  },
  // Negative Unfair Play Deductions (0 to -5)
  deductions: {
    disputeDecision: 0,
    abusiveLanguage: 0,
    aggressiveAppeal: 0,
    distractOpponent: 0,
    cheatingSharpPractice: 0,
    timeWasting: 0,
    damagingEquipment: 0,
    dangerousBowling: 0,
    tamperingBall: 0,
    otherUnfairAction: 0,
  },
  comments: ''
});

export default function UmpirePortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [activeTeamTab, setActiveTeamTab] = useState('team1'); // 'team1' | 'team2' | 'summary'

  // Umpire PIN State
  const [umpirePin, setUmpirePin] = useState(() => {
    try {
      return localStorage.getItem('bcami_saved_umpire_pin') || '';
    } catch (e) {
      return '';
    }
  });

  const [pinVerification, setPinVerification] = useState({ valid: false, message: '' });
  const [umpireName, setUmpireName] = useState('');

  // Match Information
  const [selectedMatchId, setSelectedMatchId] = useState(fixtures[0]?.id || 'm01');
  const [matchTitle, setMatchTitle] = useState(fixtures[0]?.matchNo || 'Match 1');
  const [matchDate, setMatchDate] = useState(fixtures[0]?.date || 'Saturday, Sep 5, 2026');
  const [venue, setVenue] = useState(fixtures[0]?.venue || 'Lasky Recreation Park');

  // Both Teams
  const [team1Name, setTeam1Name] = useState(fixtures[0]?.team1 || "Simba's Riders");
  const [team2Name, setTeam2Name] = useState(fixtures[0]?.team2 || "Sultans of Sylhet");

  // Ratings for both teams
  const [team1Data, setTeam1Data] = useState(createInitialTeamRatings());
  const [team2Data, setTeam2Data] = useState(createInitialTeamRatings());

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
      setPinVerification({ valid: false, message: 'Please enter your 4-digit PIN' });
      setUmpireName('');
    }
  }, [umpirePin]);

  // When match selector changes
  const handleMatchSelect = (e) => {
    const fId = e.target.value;
    setSelectedMatchId(fId);
    const f = fixtures.find(item => item.id === fId);
    if (f) {
      setMatchTitle(`${f.matchNo}: ${f.team1} vs ${f.team2}`);
      setMatchDate(f.date);
      setVenue(f.venue);
      if (f.team1) setTeam1Name(f.team1);
      if (f.team2) setTeam2Name(f.team2);
    }
  };

  // Helper calculation for a team
  const calculateTeamScore = (teamData) => {
    const spiritTotal = Object.values(teamData.spirit).reduce((sum, v) => sum + Number(v), 0); // Max 20
    const deductionTotal = Object.values(teamData.deductions).reduce((sum, v) => sum + Math.abs(Number(v)), 0); // Negative sum
    const netScore = Math.max(0, spiritTotal - deductionTotal);
    const maxScore = 20;
    const percentage = Math.round((netScore / maxScore) * 100);
    return { spiritTotal, deductionTotal, netScore, maxScore, percentage };
  };

  const t1Score = calculateTeamScore(team1Data);
  const t2Score = calculateTeamScore(team2Data);

  // Submit Handler -> Sends both Team 1 and Team 2 to Google Sheets in 1 call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pinVerification.valid) {
      alert('Please enter a valid 4-digit Umpire PIN before submitting.');
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      id: 'sub-' + Date.now(),
      timestamp: new Date().toISOString(),
      umpire: umpireName || `Official (PIN: ${umpirePin})`,
      umpirePin: umpirePin.trim(),
      match: matchTitle,
      date: matchDate,
      venue: venue,
      
      // TEAM 1 Evaluation
      team1: {
        name: team1Name,
        spirit: { ...team1Data.spirit },
        deductions: { ...team1Data.deductions },
        spiritTotal: t1Score.spiritTotal,
        deductionTotal: t1Score.deductionTotal,
        netScore: t1Score.netScore,
        percentage: t1Score.percentage,
        comments: team1Data.comments
      },

      // TEAM 2 Evaluation
      team2: {
        name: team2Name,
        spirit: { ...team2Data.spirit },
        deductions: { ...team2Data.deductions },
        spiritTotal: t2Score.spiritTotal,
        deductionTotal: t2Score.deductionTotal,
        netScore: t2Score.netScore,
        percentage: t2Score.percentage,
        comments: team2Data.comments
      }
    };

    // Send payload to Google Sheets Webhook
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload)
        });
      } catch (err) {
        console.warn('Google Sheets notice:', err);
      }
    }

    // Save local backup
    try {
      const saved = localStorage.getItem('bcami_dual_ratings');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('bcami_dual_ratings', JSON.stringify([submissionPayload, ...existing]));
    } catch (err) {}

    setIsSubmitting(false);
    setSubmittedSuccess(true);

    // Reset form fields
    setTeam1Data(createInitialTeamRatings());
    setTeam2Data(createInitialTeamRatings());

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 5000);
  };

  // Reusable Team Rating Sub-Form
  const renderTeamEvaluationForm = (teamNum, teamName, teamData, setTeamData, scoreInfo) => {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        
        {/* Team Score Bar */}
        <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Team {teamNum} Assessment
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{teamName}</h3>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Spirit Points</span>
              <span className="text-base font-black text-white font-mono">{scoreInfo.spiritTotal}/20</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-red-400 block">Deductions</span>
              <span className="text-base font-black text-red-400 font-mono">-{scoreInfo.deductionTotal}</span>
            </div>
            <div className="px-4 py-2 bg-emerald-950/80 rounded-xl border border-emerald-500/40">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Net Fair Play Score</span>
              <span className="text-xl font-black text-white font-mono">{scoreInfo.netScore}/20 ({scoreInfo.percentage}%)</span>
            </div>
          </div>
        </div>

        {/* SECTION A: SPIRIT OF CRICKET (1 to 5) */}
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              Section 1: Adherence to the Spirit of the Game (1 = Low, 5 = High)
            </h4>
            <p className="text-xs text-slate-400">Determine how respectful and sporting the team was during the match.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPIRIT_QUESTIONS.map((q) => (
              <div key={q.id} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white text-xs sm:text-sm">{q.label}</span>
                    <span className="text-base font-black text-emerald-400 font-mono px-2 py-0.5 bg-slate-900 rounded-lg border border-slate-800">
                      {teamData.spirit[q.id]}/5
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{q.desc}</p>
                </div>

                {/* 1 to 5 Radio Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setTeamData({
                        ...teamData,
                        spirit: { ...teamData.spirit, [q.id]: val }
                      })}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        teamData.spirit[q.id] === val
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 scale-105'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: UNFAIR PLAY DEDUCTIONS (0 to -5) */}
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <MinusCircle className="w-4 h-4 text-red-400" />
              Section 2: Unfair Play Deductions (0 = No Violation, -1 to -5 = Severity)
            </h4>
            <p className="text-xs text-slate-400">Record infractions and unsporting actions. Negative points are deducted directly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNFAIR_PLAY_QUESTIONS.map((q) => {
              const currentVal = teamData.deductions[q.id] || 0;
              return (
                <div key={q.id} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">{q.label}</span>
                      <span className={`text-base font-black font-mono px-2 py-0.5 rounded-lg border shrink-0 ${
                        currentVal === 0 
                          ? 'text-slate-400 bg-slate-900 border-slate-800' 
                          : 'text-red-400 bg-red-950/60 border-red-500/40'
                      }`}>
                        {currentVal === 0 ? '0' : `-${Math.abs(currentVal)}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{q.desc}</p>
                  </div>

                  {/* 0 to -5 Deduction Selectors */}
                  <div className="grid grid-cols-6 gap-1.5 pt-2">
                    {[0, 1, 2, 3, 4, 5].map((num) => {
                      const isSelected = Math.abs(currentVal) === num;
                      return (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setTeamData({
                            ...teamData,
                            deductions: { ...teamData.deductions, [q.id]: num }
                          })}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? num === 0
                                ? 'bg-slate-700 text-white border border-slate-500'
                                : 'bg-red-600 text-white shadow-md shadow-red-950/50 scale-105'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {num === 0 ? '0' : `-${num}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION C: COMMENTS */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-300">
            Comments regarding {teamName} Behavior
          </label>
          <textarea
            rows={3}
            value={teamData.comments}
            onChange={(e) => setTeamData({ ...teamData, comments: e.target.value })}
            placeholder={`Notes on ${teamName}'s sportsmanship, key moments, or specific incidents...`}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
          ></textarea>
        </div>

      </div>
    );
  };

  return (
    <section id="umpire-portal" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Match Officials Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              2026 BD Community Cup - Fair Play Report
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Official umpire evaluation form. Assess <strong>both competing teams</strong> across Spirit of Cricket standards and Unfair Play deductions.
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
                {pinVerification.valid ? '✓ Official Match Official' : 'Umpire PIN Required'}
              </div>
              <div className="text-sm sm:text-base font-black text-white">
                {pinVerification.valid ? umpireName : 'Enter 4-Digit PIN below'}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN DUAL ASSESSMENT FORM */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {submittedSuccess && (
            <div className="p-6 bg-emerald-950 border border-emerald-500 rounded-2xl text-center space-y-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Fair Play Assessment Submitted Successfully!</h4>
              <p className="text-xs text-slate-300">
                Logged ratings for both <strong>{team1Name}</strong> ({t1Score.netScore}/20) and <strong>{team2Name}</strong> ({t2Score.netScore}/20) directly to the Committee.
              </p>
            </div>
          )}

          {/* 1. Umpire PIN & Match Selection */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
              <Key className="w-4 h-4 text-emerald-400" />
              1. Match & Official Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              
              {/* PIN Input */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
                <label className="block text-emerald-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Your 4-Digit Umpire PIN *
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
                <label className="block text-slate-300 font-semibold mb-1.5">Official Umpire Name</label>
                <input
                  type="text"
                  disabled
                  value={pinVerification.valid ? umpireName : 'Enter valid PIN to unlock'}
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
                      {f.matchNo}: {f.team1} vs {f.team2}
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
                <label className="block text-slate-300 font-semibold mb-1.5">1st Team Name</label>
                <select
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">2nd Team Name</label>
                <select
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold text-cyan-400 focus:outline-none focus:border-emerald-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* 2. DUAL TEAM TABS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTeamTab('team1')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTeamTab === 'team1'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>1. {team1Name} ({t1Score.netScore}/20)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTeamTab('team2')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                    activeTeamTab === 'team2'
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>2. {team2Name} ({t2Score.netScore}/20)</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Both teams will be submitted together</span>
              </div>
            </div>

            {/* TAB CONTENT */}
            {activeTeamTab === 'team1' && renderTeamEvaluationForm(1, team1Name, team1Data, setTeam1Data, t1Score)}
            {activeTeamTab === 'team2' && renderTeamEvaluationForm(2, team2Name, team2Data, setTeam2Data, t2Score)}

          </div>

          {/* Bottom Combined Summary & Submit Bar */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{team1Name} Score</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{t1Score.netScore} / 20</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{team2Name} Score</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{t2Score.netScore} / 20</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !pinVerification.valid}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all ${
                pinVerification.valid
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white shadow-emerald-950/50 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting Both Teams...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Match Fair Play Report</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
