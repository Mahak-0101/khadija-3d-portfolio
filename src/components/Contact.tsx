"use client";

import React, { useState } from "react";
import { ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Haute Couture Editorial",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-couture-950 overflow-hidden border-t border-white/10"
    >
      {/* Background Radial Glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] bg-couture-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Dramatic Typographic Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-mono text-xs text-couture-gold tracking-widest">
                  08 / BOOKING
                </span>
                <div className="h-[1px] w-12 bg-couture-gold/40" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
                  INQUIRIES & COLLABORATIONS
                </span>
              </div>

              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-couture-cream uppercase font-light tracking-wide leading-[0.95]">
                LET&apos;S <br />
                <span className="text-couture-gold">CREATE.</span>
              </h2>

              <p className="mt-8 text-sm sm:text-base text-couture-muted font-sans font-light leading-relaxed max-w-md">
                Available for editorial shoots, haute couture campaigns, bridal lookbooks, and
                cinematic motion productions worldwide.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col space-y-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-couture-gold font-mono">
                DIRECT INQUIRY
              </span>
              <p className="font-display text-xl sm:text-2xl text-couture-cream tracking-wider">
                contact@khadijafarhat.com
              </p>
              <span className="text-xs text-couture-muted font-sans">
                Official representation & booking management
              </span>
            </div>
          </div>

          {/* Right Column: Haute Couture Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-couture-900/60 border border-white/10 p-8 sm:p-12 rounded-sm backdrop-blur-xl shadow-2xl">
              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-couture-gold/10 border border-couture-gold flex items-center justify-center text-couture-gold">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-couture-cream tracking-wide uppercase">
                    INQUIRY TRANSMITTED
                  </h3>
                  <p className="text-sm text-couture-muted max-w-sm font-sans font-light">
                    Thank you for your interest in collaborating with Khadija Farhat. Your booking
                    details have been received and will be reviewed shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        type: "Haute Couture Editorial",
                        date: "",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2 rounded-full border border-couture-gold/40 text-[10px] tracking-widest uppercase text-couture-gold hover:bg-couture-gold hover:text-couture-950 transition-all font-sans"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="name"
                      className="text-[10px] tracking-[0.25em] uppercase text-couture-muted font-mono"
                    >
                      YOUR NAME / PRODUCTION
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vogue Arabia / Elena Studio"
                      className="w-full bg-couture-950 border border-white/15 rounded px-4 py-3 text-sm text-couture-cream focus:outline-none focus:border-couture-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] tracking-[0.25em] uppercase text-couture-muted font-mono"
                    >
                      CONTACT EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="creative@studio.com"
                      className="w-full bg-couture-950 border border-white/15 rounded px-4 py-3 text-sm text-couture-cream focus:outline-none focus:border-couture-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="type"
                        className="text-[10px] tracking-[0.25em] uppercase text-couture-muted font-mono"
                      >
                        PROJECT TYPE
                      </label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-couture-950 border border-white/15 rounded px-4 py-3 text-sm text-couture-cream focus:outline-none focus:border-couture-gold transition-colors font-sans"
                      >
                        <option>Haute Couture Editorial</option>
                        <option>Bridal Campaign</option>
                        <option>Cinematic Motion Reel</option>
                        <option>Runway & Fashion Week</option>
                        <option>Beauty & Jewelry Campaign</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="date"
                        className="text-[10px] tracking-[0.25em] uppercase text-couture-muted font-mono"
                      >
                        TIMEFRAME / LOCATION
                      </label>
                      <input
                        id="date"
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="e.g. Nov 2026 / Milan"
                        className="w-full bg-couture-950 border border-white/15 rounded px-4 py-3 text-sm text-couture-cream focus:outline-none focus:border-couture-gold transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="message"
                      className="text-[10px] tracking-[0.25em] uppercase text-couture-muted font-mono"
                    >
                      CREATIVE BRIEF & SCOPE
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline shoot details, moodboard concepts, and production requirements..."
                      className="w-full bg-couture-950 border border-white/15 rounded px-4 py-3 text-sm text-couture-cream focus:outline-none focus:border-couture-gold transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-couture-gold text-couture-950 hover:bg-couture-champagne transition-all duration-300 font-sans text-xs tracking-[0.3em] uppercase font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-couture-gold/20"
                    data-cursor="SUBMIT"
                  >
                    <span>SUBMIT BOOKING INQUIRY</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
