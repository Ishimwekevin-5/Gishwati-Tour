import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Day Explorer',
    price: '$10',
    description: 'Perfect for a quick escape into nature.',
    features: ['Guided Forest Walk', 'Bird Watching', 'Park Entry Fees', 'Packed Lunch'],
    color: 'emerald'
  },
  {
    name: 'Primate Trek',
    price: '$30',
    description: 'The ultimate wildlife experience.',
    features: ['Chimpanzee Tracking', 'Golden Monkey Visit', 'Expert Naturalist Guide', 'Photography Permit', 'Lunch & Refreshments'],
    popular: true,
    color: 'emerald'
  },
  {
    name: 'Overnight Safari',
    price: '$50',
    description: 'Deep immersion in the rainforest.',
    features: ['2-Day Guided Tour', 'Luxury Eco-Lodge Stay', 'Night Forest Walk', 'All Meals Included', 'Private Transportation'],
    color: 'emerald'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-zinc-900">Choose Your Journey</h2>
          <p className="text-zinc-600 max-w-xl mx-auto">
            Transparent pricing for unforgettable experiences. Select the package that best fits your adventurous spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl bg-white border ${
                plan.popular ? 'border-emerald-500 shadow-xl scale-105 z-10' : 'border-zinc-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-zinc-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-zinc-900">{plan.price}</span>
                  <span className="text-zinc-500">/ person</span>
                </div>
                <p className="text-zinc-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-semibold transition-all ${
                plan.popular
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
              }`}>
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
