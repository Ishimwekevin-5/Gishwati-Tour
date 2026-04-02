import React from 'react';
import { Trees, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Trees className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Gishwati<span className="text-emerald-500">Tour</span>
              </span>
            </div>
            <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
              Dedicated to preserving the natural beauty of Gishwati-Mukura National Park while providing world-class eco-tourism experiences. Join us in our mission to protect Rwanda's biodiversity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Tours</a></li>
              <li><a href="#reservation" className="hover:text-emerald-400 transition-colors">Reservation</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-zinc-400">
              <li>+250 789 505 766</li>
              <li>+250 924 269 38</li>
              <li>hello@gishwatitour.rw</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Gishwati Tour. All rights reserved.</p>
          <p>Designed for Conservation.</p>
        </div>
      </div>
    </footer>
  );
}
