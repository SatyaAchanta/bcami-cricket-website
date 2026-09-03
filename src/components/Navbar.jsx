import React, { useState } from 'react';
import { Calendar, MapPin, Info, ShieldCheck, User, LogIn, Menu, X } from 'lucide-react';
import { ClerkLiveNavbar } from './ClerkAuthBridge';
import { orgInfo } from '../data/cricketData';

export default function Navbar({ onOpenAuth, clerkUser, isClerkLive }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Schedule', href: '#schedule', icon: Calendar },
    { name: 'Detroit Grounds', href: '#grounds', icon: MapPin },
    { name: 'About BCAMI', href: '#about', icon: Info },
    { name: 'Umpire Rating Portal', href: '#umpire-portal', icon: ShieldCheck, highlight: true },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-transform p-0.5">
              <img
                src={orgInfo.logo}
                alt="BCAMI Logo"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <span className="text-lg font-black tracking-wider text-white hidden">BCA</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  BCAMI
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-widest">
                  USA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Bangladesh Cricket Association of Michigan</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  item.highlight
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80 hover:text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4 text-emerald-400" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Live Clerk / Local Umpire Auth */}
          <div className="flex items-center gap-3">
            {isClerkLive ? (
              <ClerkLiveNavbar />
            ) : clerkUser ? (
              <a
                href="#umpire-portal"
                onClick={(e) => handleNavClick(e, '#umpire-portal')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:bg-slate-800 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="max-w-[120px] truncate">{clerkUser.fullName || 'Umpire Active'}</span>
              </a>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Umpire Login</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <item.icon className="w-5 h-5 text-emerald-400" />
              {item.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{clerkUser ? 'Manage Umpire Session' : 'Umpire Login (Clerk)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
