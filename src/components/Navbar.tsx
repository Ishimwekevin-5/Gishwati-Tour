import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trees, Menu, X, LayoutDashboard } from 'lucide-react';
import { useSite } from '../SiteContext';

export default function Navbar({ onDashboardClick }: { onDashboardClick: () => void }) {
  const { isAdmin } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tours', href: '#pricing' },
    { name: 'Reservation', href: '#reserve' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
      isScrolled ? 'py-4 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm' : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-zinc-950 rounded-md flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
            <Trees className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className={`text-xl font-extrabold tracking-tight ${isScrolled ? 'text-zinc-950' : 'text-white'}`}>
            Gishwati<span className="text-emerald-500">Tour</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors hover:text-emerald-500 ${
                isScrolled ? 'text-zinc-500' : 'text-zinc-300'
              }`}
            >
              {link.name}
            </a>
          ))}
          {isAdmin && (
            <button
              onClick={onDashboardClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                isScrolled ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 stroke-[2]" />
              Dashboard
            </button>
          )}
          <a
            href="#reserve"
            className={`px-8 py-3 rounded-md text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              isScrolled
                ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-lg'
                : 'bg-white text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-zinc-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-zinc-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onDashboardClick();
                  }}
                  className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </button>
              )}
              <a
                href="#reserve"
                className="w-full py-4 bg-emerald-600 text-white text-center font-bold rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
