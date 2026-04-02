import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useSite } from '../SiteContext';

export default function Pricing() {
  const { content } = useSite();

  if (!content) return null;

  return (
    <section id="pricing" className="py-32 bg-white border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-in">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Pricing Plans</p>
          <h2 className="text-5xl font-extrabold mb-6 text-zinc-950 tracking-tight">Choose Your Journey</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Transparent pricing for unforgettable experiences. Select the package that best fits your adventurous spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {content.pricing.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-10 rounded-md bg-white border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                index === 1 ? 'border-zinc-950 shadow-md scale-105 z-10' : 'border-zinc-200'
              }`}
            >
              {index === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <div className="mb-10">
                <h3 className="text-xl font-extrabold mb-3 text-zinc-950 tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-extrabold text-zinc-950 tracking-tighter">{plan.price}</span>
                  <span className="text-zinc-400 font-bold text-sm uppercase tracking-widest">/ person</span>
                </div>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-5 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-zinc-600 font-medium">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-zinc-950 stroke-[3]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-md font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                index === 1
                  ? 'bg-zinc-950 text-white hover:bg-zinc-800'
                  : 'bg-white border border-zinc-200 text-zinc-950 hover:bg-zinc-50'
              }`}>
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
