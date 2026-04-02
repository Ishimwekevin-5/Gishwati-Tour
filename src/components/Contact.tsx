import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSite } from '../SiteContext';

export default function Contact() {
  const { content } = useSite();

  if (!content) return null;

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-zinc-950">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="animate-in">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Contact Us</p>
              <h2 className="text-5xl font-extrabold text-white mb-8 tracking-tight">Get in Touch</h2>
              <p className="text-zinc-400 mb-12 text-lg font-medium leading-relaxed max-w-lg">
                Have questions about your upcoming trip? Our team of local experts is here to help you plan the perfect Gishwati experience.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                    <Mail className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-white text-xl font-bold tracking-tight">{content.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                    <Phone className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Call Us</p>
                    {content.contact.phones.map(phone => (
                      <p key={phone} className="text-white text-xl font-bold tracking-tight">{phone}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                    <MapPin className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Visit Us</p>
                    <a 
                      href={content.contact.mapLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-xl font-bold tracking-tight hover:text-emerald-500 transition-colors underline underline-offset-8 decoration-zinc-800 hover:decoration-emerald-500/50"
                    >
                      {content.contact.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sharp Contact Card */}
            <div className="relative animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-12 rounded-md shadow-2xl border border-zinc-200">
                <h3 className="text-2xl font-extrabold text-zinc-950 mb-8 tracking-tight">Send a Message</h3>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-4 px-6 text-zinc-950 placeholder:text-zinc-300 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-4 px-6 text-zinc-950 placeholder:text-zinc-300 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Message</label>
                    <textarea
                      placeholder="How can we help?"
                      rows={4}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-4 px-6 text-zinc-950 placeholder:text-zinc-300 font-medium focus:outline-none focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-md transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Send Message
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
