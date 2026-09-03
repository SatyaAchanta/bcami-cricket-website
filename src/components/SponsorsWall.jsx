import React, { useState } from 'react';
import { Award, Star, HeartHandshake, Mail, CheckCircle2, ChevronRight, X, Download } from 'lucide-react';
import { sponsors, orgInfo } from '../data/cricketData';

export default function SponsorsWall() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    tier: 'Platinum ($1,000)',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        tier: 'Platinum ($1,000)',
        message: ''
      });
    }, 2500);
  };

  return (
    <section id="sponsors" className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Community Partners & Backers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Our Official Sponsors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We are deeply grateful to Michigan's local businesses and community leaders who make grassroots cricket, youth development, and tournament prize pools possible.
          </p>
        </div>

        {/* Sponsors Tiers Display */}
        <div className="space-y-8">
          {sponsors.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              
              {/* Tier Heading */}
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${group.tierColor}`}>
                  {group.tier}
                </span>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              {/* Sponsor Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.list.map((sp, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 flex items-center gap-4 transition-all hover:shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-slate-300 text-sm tracking-wider shrink-0 text-center px-1">
                      {sp.logoText}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-base">{sp.name}</h4>
                      <p className="text-xs text-slate-400">{sp.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Sponsor Banner & Call-to-action */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Partner with BCAMI & BD Community Cup</h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Showcase your brand to thousands of passionate community members, live stream viewers across North America, and match attendees in Detroit.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Become a Sponsor</span>
          </button>
        </div>

      </div>

      {/* Sponsorship Inquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Community Partnership
              </span>
              <h3 className="text-2xl font-black text-white">Sponsorship Inquiry</h3>
              <p className="text-xs text-slate-400">
                Join us as an official partner for the 9th BD Community Cup 2026.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Thank you for your inquiry!</h4>
                <p className="text-xs text-slate-300">
                  A member of the BCAMI Organizing Committee will reach out to you shortly at {formData.email || 'your email'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business or Organization Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="e.g., Detroit Motors LLC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      placeholder="Your Name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(313) 555-0199"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@business.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Desired Sponsorship Level</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({...formData, tier: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Title Sponsor ($2,500+)</option>
                    <option>Platinum Partner ($1,000)</option>
                    <option>Gold Partner / Team Kit Sponsor ($500)</option>
                    <option>Community Banner Sponsor ($250)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Message / Notes</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Any specific requests or tournament promotion questions..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Submit Sponsorship Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
