import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowDown } from 'lucide-react';

const ANGLES = [
  {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop',
    title: 'The Canopy',
    desc: 'Breathe in the ancient air of the high forest.'
  },
  {
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000&auto=format&fit=crop',
    title: 'The Valley',
    desc: 'Where life flows through the heart of the hills.'
  },
  {
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    title: 'The Mist',
    desc: 'A world hidden within the clouds.'
  }
];

export default function Hero({ onReserveClick }: { onReserveClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Portal 1 -> 2 (0 to 0.5)
  const portal1Scale = useTransform(scrollYProgress, [0, 0.4], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.5]);
  const img1Blur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(20px)"]);

  // Portal 2 -> 3 (0.5 to 1)
  const portal2Scale = useTransform(scrollYProgress, [0.5, 0.9], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const img2Scale = useTransform(scrollYProgress, [0.4, 0.9], [1, 1.5]);
  const img2Blur = useTransform(scrollYProgress, [0.5, 0.9], ["blur(0px)", "blur(20px)"]);

  // Text animations
  const text1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[500vh] w-full bg-zinc-950"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: Base */}
        <motion.div 
          style={{ scale: img1Scale, filter: img1Blur }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={ANGLES[0].url}
            alt="Angle 1"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Layer 2: Portal Reveal */}
        <motion.div 
          style={{ clipPath: portal1Scale, scale: img2Scale, filter: img2Blur }}
          className="absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={ANGLES[1].url}
            alt="Angle 2"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Layer 3: Final Portal Reveal */}
        <motion.div 
          style={{ clipPath: portal2Scale }}
          className="absolute inset-0 z-20"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={ANGLES[2].url}
            alt="Angle 3"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Floating Particles/Mist Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <motion.div 
            animate={{ 
              x: [-20, 20, -20],
              y: [-10, 10, -10],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-500/5 to-transparent blur-3xl"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-40 h-full w-full flex items-center justify-center">
          <motion.div style={{ y: textY }} className="container mx-auto px-6 text-center">
            
            {/* Angle 1 Text */}
            <motion.div style={{ opacity: text1Opacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-emerald-400 uppercase tracking-[0.6em] text-sm font-bold mb-4">Perspective I</h2>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-6">THE CANOPY</h1>
              <p className="text-emerald-50/60 text-xl max-w-xl font-light italic">"A sea of green that touches the sky."</p>
            </motion.div>

            {/* Angle 2 Text */}
            <motion.div style={{ opacity: text2Opacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-emerald-400 uppercase tracking-[0.6em] text-sm font-bold mb-4">Perspective II</h2>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-6">THE VALLEY</h1>
              <p className="text-emerald-50/60 text-xl max-w-xl font-light italic">"Where the ancient rivers whisper secrets."</p>
            </motion.div>

            {/* Angle 3 Text (Final) */}
            <motion.div style={{ opacity: text3Opacity }} className="flex flex-col items-center justify-center">
              <h2 className="text-emerald-400 uppercase tracking-[0.6em] text-sm font-bold mb-4">The Destination</h2>
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none">
                GISHWATI<br /><span className="text-emerald-500">MUKURA</span>
              </h1>
              <p className="text-emerald-50/80 text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-light">
                Rwanda's newest national treasure awaits. Discover a world of rare primates and untouched rainforest.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
                <button
                  onClick={onReserveClick}
                  className="group relative px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                >
                  <span className="uppercase tracking-widest text-sm">Book Your Expedition</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
          <div className="h-40 w-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div 
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              className="absolute top-0 left-0 w-full bg-emerald-500"
            />
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase vertical-text tracking-widest">Explore</span>
        </div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-emerald-400"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </div>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}
