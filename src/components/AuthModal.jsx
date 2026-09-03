import React, { useState } from 'react';
import { ShieldCheck, User, Lock, Key, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, currentUser, onLogout, isClerkConfigured }) {
  const [selectedUmpire, setSelectedUmpire] = useState('Tariqul Anam (Senior Match Referee)');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const handleSimulatedSubmit = (e) => {
    e.preventDefault();
    const name = customName.trim() || selectedUmpire.split(' (')[0];
    const email = customEmail.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@bcami.org`;
    onLogin({ fullName: name, email, primaryEmailAddress: { emailAddress: email } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clerk Authentication</span>
          </div>
          <h3 className="text-2xl font-black text-white">Umpire Sign In</h3>
          <p className="text-xs text-slate-400">
            Authenticate to access the Fair Play match assessment and rating sheets.
          </p>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Currently Signed In</span>
              </div>
              <div className="font-bold text-white text-base">{currentUser.fullName}</div>
              <div className="text-xs text-slate-400">{currentUser.primaryEmailAddress?.emailAddress || currentUser.email}</div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 font-bold text-xs transition-colors"
            >
              Sign Out from Umpire Session
            </button>
          </div>
        ) : (
          <form onSubmit={handleSimulatedSubmit} className="space-y-4">
            
            {/* Quick Presets */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 text-xs">
                Select Certified Umpire:
              </label>
              <select
                value={selectedUmpire}
                onChange={(e) => setSelectedUmpire(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option>Tariqul Anam (Tournament Director & Senior Referee)</option>
                <option>Mohammad K. Islam (Chief Match Official)</option>
                <option>Kabir Hossain (Certified Field Umpire)</option>
                <option>Mahfuzur Rahman (Lead Umpire)</option>
              </select>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-slate-600 text-[10px] uppercase font-bold">Or enter custom umpire</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1 text-xs">Umpire Full Name</label>
              <input
                type="text"
                placeholder="e.g. Arifur Rahman"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1 text-xs">Umpire Email Address</label>
              <input
                type="email"
                placeholder="e.g. arif@bcami.org"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
            >
              <span>Sign In to Umpire Assessment Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Clerk Key Setup Help */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Clerk Production Key:</span>
              </div>
              <p>
                To enable live Clerk Auth with Google/Magic links, add your <code className="text-emerald-400 font-mono">VITE_CLERK_PUBLISHABLE_KEY=pk_...</code> into the <code className="text-slate-300">.env</code> file.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
