import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Heart, Trophy } from 'lucide-react';
import { orgInfo, currentTournament } from '../data/cricketData';

export default function ContactFooter() {
  const [sent, setSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 3000);
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info & Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-500/30 flex items-center justify-center font-black text-xl text-white shadow-lg">
                BCA
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">BCAMI USA</span>
                <p className="text-xs text-slate-400">Bangladesh Cricket Association of Michigan</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {orgInfo.tagline}. Organizing the premier BD Community Cup tournament, fostering cricket talent, and connecting community members across Michigan.
            </p>

            <div className="space-y-3 text-xs sm:text-sm pt-2">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Email Us</span>
                  <a href={`mailto:${orgInfo.email}`} className="font-semibold text-white hover:text-emerald-400">
                    {orgInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Primary Ground</span>
                  <span className="font-semibold text-white">Lasky Recreation Park • Detroit, MI</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Follow Official Channels
              </span>
              <div className="flex gap-3">
                <a
                  href={orgInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold transition-colors"
                >
                  Facebook: /bcamiusa
                </a>
                <a
                  href={orgInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 border border-pink-500/30 text-xs font-bold transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
            <p className="text-xs text-slate-400">Have questions regarding team registrations, tournament schedule, or umpiring?</p>

            {sent ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">We will respond to your inquiry at {contactForm.email} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1 text-xs">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="e.g. Shakib Ahmed"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1 text-xs">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="shakib@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1 text-xs">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option>General Inquiry</option>
                    <option>BD Community Cup Participation</option>
                    <option>Umpire & Match Official Application</option>
                    <option>Sponsorship & Advertising</option>
                    <option>Media & Live Stream Coverage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1 text-xs">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="How can BCAMI assist you?"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Credits */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bangladesh Cricket Association of Michigan (BCAMIUSA). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#tournament" className="hover:text-slate-300">BD Community Cup</a>
            <span>•</span>
            <a href="#match-center" className="hover:text-slate-300">Fixtures</a>
            <span>•</span>
            <a href="#venues" className="hover:text-slate-300">Detroit Grounds</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
