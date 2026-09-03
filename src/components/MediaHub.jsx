import React, { useState } from 'react';
import { Play, Image, Video, Radio, ExternalLink, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { galleryItems, currentTournament, orgInfo } from '../data/cricketData';

export default function MediaHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Trophies', 'Matchday Action', 'Draft & Events', 'Awards', 'Community'];

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="media" className="py-16 sm:py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Broadcast & Media Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Live Stream & Photo Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Relive unforgettable tournament moments, watch live broadcasts with Bengali & English commentary, and explore action galleries from Lasky Park.
          </p>
        </div>

        {/* FEATURED: LIVE BROADCAST SCREEN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  Official Matchday Broadcast Stream
                </h3>
                <p className="text-xs text-slate-400">Live multi-camera coverage from Lasky Recreation Park & Jayne Field</p>
              </div>
            </div>
            <a
              href={orgInfo.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Watch on Facebook Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Video Mock Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=80"
              alt="Live Cricket Stream"
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Play overlay */}
            <div className="relative z-10 text-center space-y-3 p-4">
              <a
                href={orgInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-900/50 hover:scale-110 active:scale-95 transition-all mx-auto"
                aria-label="Play Stream"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </a>
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-bold text-white">
                  9th BD Community Cup 2026 • Live Stream Feed
                </div>
                <div className="text-xs text-emerald-400 font-medium">
                  Streaming live on @bcamiusa with live score overlay
                </div>
              </div>
            </div>

            {/* Live match badge on screen */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>HD 1080p Stream</span>
            </div>
          </div>
        </div>

        {/* PHOTO & TOURNAMENT MOMENTS GALLERY */}
        <div className="space-y-8">
          
          {/* Gallery Category Filter */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-black text-white">Tournament Photo Gallery</h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-slate-800">
                    {item.category}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h4 className="text-sm font-bold text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 border-t border-slate-900">
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full space-y-0 shadow-2xl relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-slate-500">BD Community Cup Archives</span>
              </div>
              <h3 className="text-lg font-black text-white">{selectedImage.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
