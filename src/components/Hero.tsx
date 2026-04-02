import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { useSite } from '../SiteContext';

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
  const { content } = useSite();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Portal 1 -> 2 (0 to 0.5)
  const portal1Scale = useTransform(scrollYProgress, [0.15, 0.25], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
  const img1Blur = useTransform(scrollYProgress, [0.15, 0.25], ["blur(0px)", "blur(10px)"]);

  // Portal 2 -> 3 (0.5 to 1)
  const portal2Scale = useTransform(scrollYProgress, [0.45, 0.55], ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]);
  const img2Scale = useTransform(scrollYProgress, [0.25, 0.55], [1, 1.1]);
  const img2Blur = useTransform(scrollYProgress, [0.45, 0.55], ["blur(0px)", "blur(10px)"]);

  // Text animations - Tighter ranges to avoid overlap
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scrollProgressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] w-full bg-zinc-950 font-sans"
    >
      {!content ? (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-md animate-pulse" />
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 1: Base */}
        <motion.div 
          style={{ scale: img1Scale, filter: img1Blur }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-zinc-950/40 z-10" />
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
          <div className="absolute inset-0 bg-zinc-950/40 z-10" />
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
          <div className="absolute inset-0 bg-zinc-950/40 z-10" />
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
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-zinc-500/5 to-transparent blur-3xl"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-40 h-full w-full flex items-center justify-center">
          <motion.div style={{ y: textY }} className="container mx-auto px-6 text-center">
            
            {/* Angle 1 Text */}
            <motion.div 
              style={{ opacity: text1Opacity, visibility: useTransform(text1Opacity, o => o <= 0 ? 'hidden' : 'visible') }} 
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <p className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black mb-6">Perspective I</p>
              <h1 className="text-7xl md:text-[10rem] font-extrabold text-white tracking-tighter mb-8 leading-none">THE CANOPY</h1>
              <p className="text-zinc-400 text-xl max-w-xl font-medium italic">"A sea of green that touches the sky."</p>
            </motion.div>

            {/* Angle 2 Text */}
            <motion.div 
              style={{ opacity: text2Opacity, visibility: useTransform(text2Opacity, o => o <= 0 ? 'hidden' : 'visible') }} 
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <p className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black mb-6">Perspective II</p>
              <h1 className="text-7xl md:text-[10rem] font-extrabold text-white tracking-tighter mb-8 leading-none">THE VALLEY</h1>
              <p className="text-zinc-400 text-xl max-w-xl font-medium italic">"Where the ancient rivers whisper secrets."</p>
            </motion.div>

            {/* Angle 3 Text (Final) */}
            <motion.div 
              style={{ opacity: text3Opacity, visibility: useTransform(text3Opacity, o => o <= 0 ? 'hidden' : 'visible') }} 
              className="flex flex-col items-center justify-center"
            >
              <p className="text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-black mb-6">The Destination</p>
              <h1 className="text-7xl md:text-[10rem] font-extrabold text-white tracking-tighter mb-10 leading-none">
                {content.hero.title}
              </h1>
              <p className="text-zinc-300 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
                <button
                  onClick={onReserveClick}
                  className="group relative px-12 py-6 bg-white text-zinc-950 rounded-md font-black transition-all duration-300 flex items-center gap-4 shadow-2xl hover:bg-zinc-100"
                >
                  <span className="uppercase tracking-widest text-xs">{content.hero.ctaText}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
                </button>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
          <div className="h-48 w-[1px] bg-white/10 relative overflow-hidden rounded-full">
            <motion.div 
              style={{ height: scrollProgressHeight }}
              className="absolute top-0 left-0 w-full bg-emerald-500"
            />
          </div>
          <span className="text-[9px] text-zinc-500 font-black uppercase vertical-text tracking-[0.3em]">Explore</span>
        </div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-emerald-500"
          >
            <ArrowDown className="w-5 h-5 stroke-[3]" />
          </motion.div>
        </div>
      </div>
    )}

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}
