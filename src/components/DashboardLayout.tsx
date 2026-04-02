import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Globe, LogOut, Settings } from 'lucide-react';
import { useSite } from '../SiteContext';
import { logout } from '../firebase';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  const { user, isSuperAdmin } = useSite();

  const menuItems = [
    { id: 'content', label: 'Site Content', icon: Globe },
    ...(isSuperAdmin ? [{ id: 'users', label: 'User Management', icon: Users }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white flex text-zinc-950 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-50 border-r border-zinc-200 flex flex-col">
        <div className="p-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-950 rounded-md flex items-center justify-center text-white">
            <LayoutDashboard className="w-5 h-5 stroke-[1.5]" />
          </div>
          <span className="font-extrabold tracking-tight text-xl">Console</span>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white border border-zinc-200 text-zinc-950 shadow-sm' 
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950'
              }`}
            >
              <item.icon className={`w-5 h-5 stroke-[1.5] ${activeTab === item.id ? 'text-emerald-600' : ''}`} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-zinc-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-zinc-50 rounded-md border border-zinc-100">
            <img src={user?.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-zinc-200" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate text-zinc-950">{user?.displayName}</p>
              <p className="text-[10px] text-zinc-500 truncate font-medium">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-300"
          >
            <LogOut className="w-5 h-5 stroke-[1.5]" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto bg-white">
        <div className="max-w-6xl mx-auto animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}
