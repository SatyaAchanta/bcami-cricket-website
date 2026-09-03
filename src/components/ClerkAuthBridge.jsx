import React from 'react';
import { useUser, useClerk, UserButton, SignInButton } from '@clerk/clerk-react';

// Wrapper component used when Clerk is live
export function ClerkLiveNavbar({ onScrollToSection }) {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-8 w-24 bg-slate-800 animate-pulse rounded-xl"></div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="#umpire-portal"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('#umpire-portal');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:bg-slate-800 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="max-w-[120px] truncate">{user.fullName || user.primaryEmailAddress?.emailAddress}</span>
        </a>
        <div className="border border-slate-700 rounded-full p-0.5">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all">
        <span>Umpire Clerk Login</span>
      </button>
    </SignInButton>
  );
}

export function useClerkUserBridge(isClerkLive, fallbackUser) {
  if (!isClerkLive) {
    return { user: fallbackUser, isLive: false };
  }

  try {
    const { user, isSignedIn } = useUser();
    return {
      user: isSignedIn ? user : fallbackUser,
      isLive: true,
      isSignedIn
    };
  } catch (e) {
    return { user: fallbackUser, isLive: false };
  }
}
