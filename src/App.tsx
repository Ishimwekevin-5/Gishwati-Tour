import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import ReservationForm from './components/ReservationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero onReserveClick={scrollToReservation} />
        
        {/* CTA Section */}
        <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
          <motion.div 
            initial={{ x: '20%', opacity: 0 }}
            whileInView={{ x: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800 skew-x-12 translate-x-1/4 z-0" 
          />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to witness the magic of Gishwati?</h2>
              <p className="text-emerald-100/70 text-xl mb-12 leading-relaxed">
                Join our expert guides for an unforgettable journey through one of Africa's most diverse ecosystems. From rare chimpanzees to breathtaking waterfalls, your adventure starts here.
              </p>
              <button 
                onClick={scrollToReservation}
                className="group px-10 py-5 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-950/20 flex items-center gap-3"
              >
                <span>Start Your Journey</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        <Pricing />
        <ReservationForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
