import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import ReservationForm from './components/ReservationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { ChevronRight, Shield } from 'lucide-react';
import { SiteProvider, useSite } from './SiteContext';
import { auth } from './firebase';
import DashboardLayout from './components/DashboardLayout';
import ContentEditor from './components/ContentEditor';
import UserManagement from './components/UserManagement';
import Login from './components/Login';

function MainApp() {
  const { user, isAdmin, loading, profile } = useSite();
  const [activeTab, setActiveTab] = useState('content');
  const [showDashboard, setShowDashboard] = useState(false);

  const scrollToReservation = () => {
    const element = document.getElementById('reserve');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle Dashboard Access
  const isDashboardRoute = window.location.pathname === '/dashboard';

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans">
        <div className="w-12 h-12 bg-zinc-950 rounded-md animate-pulse shadow-sm" />
      </div>
    );
  }

  if (isDashboardRoute || showDashboard) {
    if (!user) return <Login />;
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full space-y-10 bg-white border border-zinc-200 p-12 rounded-md shadow-sm animate-in">
            <div className="w-20 h-20 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-950 mx-auto mb-8 border border-zinc-200">
              <Shield className="w-10 h-10 stroke-[1.5]" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">Access <span className="text-emerald-600">Pending</span></h1>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Your account <span className="text-zinc-950 font-bold">({user.email})</span> is currently being reviewed for administrative access.
              </p>
            </div>

            <div className="bg-zinc-50 rounded-md p-8 border border-zinc-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${profile?.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`} />
                <span className={`font-black uppercase tracking-[0.2em] text-[10px] ${profile?.status === 'pending' ? 'text-amber-600' : 'text-red-600'}`}>
                  Status: {profile?.status || 'Unknown'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                {profile?.status === 'pending' 
                  ? 'The Super Admin has been notified of your request. Please check back later.' 
                  : 'Your request for administrative access was not approved. Contact support for details.'}
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <button 
                onClick={() => setShowDashboard(false)}
                className="w-full px-8 py-5 bg-zinc-950 text-white rounded-md font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 shadow-lg"
              >
                Back to Website
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="w-full px-8 py-5 bg-white text-zinc-500 border border-zinc-200 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'content' && <ContentEditor />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">Configuration</p>
              <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-zinc-950">Settings</h1>
              <p className="text-zinc-500 font-medium text-lg">Configure your administrative preferences.</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-md p-20 text-center">
              <p className="text-zinc-400 font-black uppercase tracking-widest text-xs">Settings panel coming soon</p>
            </div>
          </div>
        )}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-zinc-950 selection:text-white font-sans">
      <Navbar onDashboardClick={() => setShowDashboard(true)} />
      <main>
        <Hero onReserveClick={scrollToReservation} />
        
        {/* CTA Section */}
        <section className="py-40 bg-zinc-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 skew-x-12 translate-x-1/4 z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl animate-in">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-8">Adventure Awaits</p>
              <h2 className="text-5xl md:text-8xl font-extrabold mb-12 leading-none tracking-tighter">Ready to witness the magic of Gishwati?</h2>
              <p className="text-zinc-400 text-xl md:text-2xl mb-16 leading-relaxed font-medium max-w-3xl">
                Join our expert guides for an unforgettable journey through one of Africa's most diverse ecosystems. From rare chimpanzees to breathtaking waterfalls, your adventure starts here.
              </p>
              <button 
                onClick={scrollToReservation}
                className="group px-12 py-6 bg-white text-zinc-950 font-black rounded-md hover:bg-zinc-100 transition-all duration-300 shadow-2xl flex items-center gap-4 uppercase tracking-widest text-xs"
              >
                <span>Start Your Journey</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
              </button>
            </div>
          </div>
        </section>

        <Pricing />
        <ReservationForm />
        <Contact />
      </main>
      <Footer onManageClick={() => setShowDashboard(true)} />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <MainApp />
    </SiteProvider>
  );
}
