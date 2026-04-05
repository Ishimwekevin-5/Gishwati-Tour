import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Calendar, Users, Mail, Phone, User } from 'lucide-react';
import { useSite } from '../SiteContext';

export default function ReservationForm() {
  const { content, showToast } = useSite();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log('Reservation Data:', data);
    showToast('Thank you! Your reservation request has been sent. We will contact you shortly.');
    reset();
  };

  if (!content) return null;

  return (
    <section id="reserve" className="py-32 bg-zinc-50 border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-md overflow-hidden shadow-2xl flex flex-col md:flex-row border border-zinc-200">
          {/* Left Side - Info */}
          <div className="md:w-1/3 bg-zinc-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Reservations</p>
              <h2 className="text-4xl font-extrabold mb-8 tracking-tight leading-tight">Secure Your Spot</h2>
              <p className="text-zinc-400 mb-10 font-medium leading-relaxed">
                Gishwati is a protected area with limited daily visitors. Book in advance to ensure your preferred dates.
              </p>
            </div>
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                  <Calendar className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Availability</p>
                  <p className="text-sm font-bold">Mon - Sun, 6AM - 6PM</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500">
                  <Users className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Group Size</p>
                  <p className="text-sm font-bold">Max 8 people per guide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-2/3 p-12 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 stroke-[2]" />
                    <input
                      {...register('name', { required: true })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3.5 pl-12 pr-4 text-zinc-950 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 stroke-[2]" />
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3.5 pl-12 pr-4 text-zinc-950 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 stroke-[2]" />
                    <input
                      {...register('phone')}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3.5 pl-12 pr-4 text-zinc-950 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                      placeholder="+250 ..."
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 stroke-[2]" />
                    <input
                      type="date"
                      {...register('date', { required: true })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3.5 pl-12 pr-4 text-zinc-950 font-medium focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Select Package</label>
                <select
                  {...register('package')}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3.5 px-4 text-zinc-950 font-bold focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                >
                  {content.pricing.map(plan => (
                    <option key={plan.name} value={plan.name}>{plan.name} ({plan.price})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-md transition-all duration-300 shadow-xl uppercase tracking-widest text-xs"
              >
                Confirm Reservation Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
