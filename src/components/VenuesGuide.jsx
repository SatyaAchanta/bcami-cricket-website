import React from 'react';
import { MapPin, Navigation, Compass, CheckCircle2, ExternalLink } from 'lucide-react';
import { venues } from '../data/cricketData';

export default function VenuesGuide() {
  return (
    <section id="venues" className="py-16 sm:py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Matchday Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Detroit & Michigan Grounds
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Find matchday driving directions, parking information, and pitch surfaces for our tournament facilities across the Greater Detroit area.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {venues.map((venue, idx) => (
            <div
              key={venue.id}
              className={`bg-slate-950 rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all hover:shadow-xl ${
                idx === 0
                  ? 'border-emerald-500/50 shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    idx === 0
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    {venue.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{venue.city}</span>
                </div>

                {/* Venue Name */}
                <div>
                  <h3 className="text-xl font-black text-white">{venue.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{venue.address}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {venue.description}
                </p>

                {/* Pitch surface info */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-500 font-medium">Pitch Surface:</div>
                  <div className="font-semibold text-slate-200">{venue.pitchType}</div>
                </div>

                {/* Amenities List */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Key Amenities:
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {venue.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Navigation CTA */}
              <div className="pt-6 mt-6 border-t border-slate-900">
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-200 text-xs font-bold border border-slate-800 hover:border-emerald-500 transition-all group"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
