import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  FileSpreadsheet, 
  Send, 
  Download, 
  Copy, 
  Clock, 
  MapPin, 
  Calendar, 
  Trash2,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { fixtures, venues, currentTournament } from '../data/cricketData';

const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

export default function UmpirePortal({ clerkUser, isClerkConfigured, onSimulateLogin, onSimulateLogout }) {
  const [activeTab, setActiveTab] = useState('rate'); // 'rate' | 'history'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Form State
  const [selectedMatchId, setSelectedMatchId] = useState(fixtures[0]?.id || 'custom');
  const [matchNumber, setMatchNumber] = useState('Match 1 (Opening Game)');
  const [matchDate, setMatchDate] = useState(fixtures[0]?.date || 'Saturday, Sep 5, 2026');
  const [venue, setVenue] = useState('Lasky Recreation Park');
  const [umpireName, setUmpireName] = useState(clerkUser?.fullName || clerkUser?.primaryEmailAddress?.emailAddress || 'Tariqul Anam');
  const [umpireEmail, setUmpireEmail] = useState(clerkUser?.primaryEmailAddress?.emailAddress || clerkUser?.email || 'tariqul@bcami.org');
  
  // Flexible Team Inputs (No Team DB required)
  const [teamEvaluated, setTeamEvaluated] = useState('Team A');
  const [opponentTeam, setOpponentTeam] = useState('Team B');

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

  // Local storage history
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('bcami_umpire_ratings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sub-001',
          date: 'Saturday, Sep 5, 2026',
          match: 'Match 1 (Opening Game)',
          venue: 'Lasky Recreation Park',
          team: 'Team A',
          opponent: 'Team B',
          umpire: 'Tariqul Anam',
          umpireEmail: 'tariqul@bcami.org',
          scores: {
            respectUmpires: 9,
            respectOpponents: 10,
            captainLeadership: 9,
            spiritOfCricket: 9,
            overRateTimeliness: 8,
          },
          totalScore: 45,
          maxScore: 50,
          percentage: 90,
          disciplinaryIncident: 'No',
          comments: 'Exemplary sporting conduct shown throughout all 20 overs.',
          timestamp: new Date().toISOString()
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Sync user details if clerkUser changes
  useEffect(() => {
    if (clerkUser) {
      if (clerkUser.fullName) setUmpireName(clerkUser.fullName);
      if (clerkUser.primaryEmailAddress?.emailAddress) setUmpireEmail(clerkUser.primaryEmailAddress.emailAddress);
      else if (clerkUser.email) setUmpireEmail(clerkUser.email);
    }
  }, [clerkUser]);

  // When match selector changes
  const handleMatchSelect = (e) => {
    const fId = e.target.value;
    setSelectedMatchId(fId);
    const f = fixtures.find(item => item.id === fId);
    if (f) {
      setMatchNumber(f.matchNo);
      setMatchDate(f.date);
      setVenue(f.venue);
      setTeamEvaluated(f.team1);
      setOpponentTeam(f.team2);
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

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newEntry = {
      id: 'sub-' + Date.now(),
      date: matchDate,
      match: matchNumber,
      venue,
      team: teamEvaluated.trim(),
      opponent: opponentTeam.trim(),
      umpire: umpireName || 'Official Umpire',
      umpireEmail: umpireEmail || 'umpire@bcami.org',
      scores: { ...ratings },
      totalScore,
      maxScore,
      percentage,
      disciplinaryIncident,
      incidentDetails: disciplinaryIncident === 'Yes' ? incidentDetails : 'None',
      comments: generalComments,
      timestamp: new Date().toISOString()
    };

    // Try Google Sheets Webhook POST if configured
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

    const updated = [newEntry, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem('bcami_umpire_ratings', JSON.stringify(updated));
    } catch (err) {}

    setIsSubmitting(false);
    setSheetSyncStatus(syncedToSheet ? 'synced' : 'local_only');
    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('history');
    }, 2000);
  };

  const handleDeleteEntry = (id) => {
    const filtered = submissions.filter(item => item.id !== id);
    setSubmissions(filtered);
    try {
      localStorage.setItem('bcami_umpire_ratings', JSON.stringify(filtered));
    } catch (e) {}
  };

  const exportToCSV = () => {
    const headers = ["ID", "Date", "Match", "Venue", "Evaluated Team", "Opponent", "Umpire Name", "Umpire Email", "Respect Umpires (10)", "Respect Opponents (10)", "Captaincy (10)", "Spirit of Cricket (10)", "Over-Rate (10)", "Total Score (50)", "Percentage", "Disciplinary Incident", "Incident Details", "Comments", "Timestamp"];
    
    const rows = submissions.map(s => [
      `"${s.id}"`,
      `"${s.date}"`,
      `"${s.match}"`,
      `"${s.venue}"`,
      `"${s.team}"`,
      `"${s.opponent}"`,
      `"${s.umpire}"`,
      `"${s.umpireEmail}"`,
      s.scores.respectUmpires,
      s.scores.respectOpponents,
      s.scores.captainLeadership,
      s.scores.spiritOfCricket,
      s.scores.overRateTimeliness,
      s.totalScore,
      `${s.percentage}%`,
      `"${s.disciplinaryIncident}"`,
      `"${(s.incidentDetails || '').replace(/"/g, '""')}"`,
      `"${(s.comments || '').replace(/"/g, '""')}"`,
      `"${s.timestamp}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BCAMI_FairPlay_Ratings_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyTableForSheets = () => {
    const textRows = submissions.map(s => 
      `${s.date}\t${s.match}\t${s.venue}\t${s.team}\t${s.totalScore}/50\t${s.percentage}%\t${s.umpire}\t${s.comments}`
    ).join('\n');

    const fullText = `Date\tMatch\tVenue\tTeam\tScore\tPercentage\tUmpire\tComments\n${textRows}`;
    navigator.clipboard.writeText(fullText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
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
              Umpire Fair Play Assessment
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Record official match conduct, disciplinary observations, and sportsmanship ratings following each fixture to determine the <strong>BD Community Cup Fair Play Award</strong>.
            </p>
          </div>

          {/* Authenticated Umpire Card */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 shadow-xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-500/40 flex items-center justify-center text-white font-bold shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Certified Match Official</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {clerkUser?.fullName || umpireName}
                </div>
                <div className="text-xs text-slate-400 truncate max-w-[180px]">
                  {clerkUser?.primaryEmailAddress?.emailAddress || umpireEmail}
                </div>
              </div>
            </div>

            {onSimulateLogout && (
              <button
                onClick={onSimulateLogout}
                title="Switch umpire / Sign out"
                className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('rate')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'rate'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Submit Assessment Form</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Recorded Ratings ({submissions.length})</span>
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={exportToCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={copyTableForSheets}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-blue-400" />
              <span>{copiedNotification ? 'Copied Rows!' : 'Copy for Sheets'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FORM */}
        {activeTab === 'rate' && (
          <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            
            {submittedSuccess && (
              <div className="p-6 bg-emerald-950 border border-emerald-500 rounded-2xl text-center space-y-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Assessment Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Logged rating for <strong>{teamEvaluated}</strong> ({totalScore}/50 - {percentage}%).
                  {sheetSyncStatus === 'synced' && ' Synced with Google Sheets.'}
                </p>
              </div>
            )}

            {/* 1. Fixture & Match Info */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                1. Match & Official Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Select Scheduled Fixture</label>
                  <select
                    value={selectedMatchId}
                    onChange={handleMatchSelect}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    {fixtures.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.matchNo} ({f.date})
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
                  <label className="block text-slate-300 font-semibold mb-1.5">Reporting Umpire</label>
                  <input
                    type="text"
                    required
                    value={umpireName}
                    onChange={(e) => setUmpireName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Team Being Evaluated</label>
                  <input
                    type="text"
                    required
                    value={teamEvaluated}
                    onChange={(e) => setTeamEvaluated(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Opponent Team</label>
                  <input
                    type="text"
                    required
                    value={opponentTeam}
                    onChange={(e) => setOpponentTeam(e.target.value)}
                    placeholder="Enter opponent team name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Match Date</label>
                  <input
                    type="text"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
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
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Assessment</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* TAB 2: RECORDED RATINGS */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Recorded Fair Play Log</h3>
                  <p className="text-xs text-slate-400">All submitted match assessments for the 9th BD Community Cup</p>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  {submissions.length} Total Submissions
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <FileSpreadsheet className="w-12 h-12 mx-auto opacity-40" />
                  <p className="text-sm">No assessments recorded yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-3 px-3 font-semibold">Match / Date</th>
                        <th className="py-3 px-3 font-semibold">Team Evaluated</th>
                        <th className="py-3 px-3 font-semibold">Venue</th>
                        <th className="py-3 px-3 text-center font-semibold">Score</th>
                        <th className="py-3 px-3 text-center font-semibold">Status</th>
                        <th className="py-3 px-3 font-semibold">Umpire</th>
                        <th className="py-3 px-3 text-right font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {submissions.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-950/50">
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{item.match}</span>
                            <span className="text-slate-500 text-[11px]">{item.date}</span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-emerald-400">
                            {item.team}
                          </td>
                          <td className="py-3.5 px-3 text-slate-300 text-xs">
                            {item.venue}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-black text-white text-base">
                            {item.totalScore}/50
                            <span className="text-[11px] text-slate-400 font-normal block">{item.percentage}%</span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.percentage >= 80 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                                : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                            }`}>
                              {item.percentage >= 80 ? 'Grade A' : 'Grade B'}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-300 text-xs">
                            <span className="font-semibold block">{item.umpire}</span>
                            <span className="text-[10px] text-slate-500">{item.umpireEmail}</span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => handleDeleteEntry(item.id)}
                              title="Delete entry"
                              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
