import React from 'react';
import { Trees, Facebook, Instagram, Twitter, LayoutDashboard } from 'lucide-react';
import { useSite } from '../SiteContext';

export default function Footer({ onManageClick }: { onManageClick: () => void }) {
  const { content, isAdmin } = useSite();

  if (!content) return null;

  return (
    <footer className="bg-zinc-950 text-white py-32 border-t border-zinc-900 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-zinc-950 shadow-sm">
                <Trees className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Gishwati<span className="text-emerald-500">Tour</span>
              </span>
            </div>
            <p className="text-zinc-500 max-w-md mb-10 leading-relaxed font-medium">
              Dedicated to preserving the natural beauty of Gishwati-Mukura National Park while providing world-class eco-tourism experiences. Join us in our mission to protect Rwanda's biodiversity.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-all duration-300">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Quick Links</h4>
            <ul className="space-y-5 text-zinc-400 font-medium text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tours</a></li>
              <li><a href="#reserve" className="hover:text-white transition-colors">Reservation</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li>
                <button 
                  onClick={onManageClick}
                  className="flex items-center gap-2 hover:text-white transition-colors text-left group"
                >
                  {isAdmin ? (
                    <>
                      <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold">Dashboard</span>
                    </>
                  ) : (
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity">Manage</span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Contact</h4>
            <ul className="space-y-5 text-zinc-400 font-medium text-sm">
              {content.contact.phones.map(phone => (
                <li key={phone} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                  {phone}
                </li>
              ))}
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                {content.contact.email}
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5" />
                <span className="leading-relaxed">{content.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
          <p>© {new Date().getFullYear()} Gishwati Tour. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <p>Designed for Conservation.</p>
            <p className="text-zinc-800">Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
