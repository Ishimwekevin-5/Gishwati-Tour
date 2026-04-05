import React, { useState, useEffect } from 'react';
import { useSite } from '../SiteContext';
import { Save, RefreshCcw, Plus, Trash2, History, User, Clock, FileText } from 'lucide-react';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface ActivityLog {
  id: string;
  uid: string;
  email: string;
  action: string;
  details: string;
  timestamp: string;
}

export default function ContentEditor() {
  const { content, updateContent, showToast } = useSite();
  const [localContent, setLocalContent] = useState(content);
  const [saving, setSaving] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    if (content) {
      setLocalContent(content);
    }
  }, [content]);

  useEffect(() => {
    if (showLogs) {
      const q = query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'), limit(50));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const logsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog));
        setLogs(logsList);
      });
      return () => unsubscribe();
    }
  }, [showLogs]);

  if (!localContent) return <div>Loading...</div>;

  const logActivity = async (action: string, details: string) => {
    try {
      await addDoc(collection(db, 'activityLogs'), {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        action,
        details,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent(localContent);
      await logActivity('Update Content', 'Modified site text or pricing plans');
      showToast('Content updated successfully!');
    } catch (error) {
      console.error(error);
      showToast('Failed to update content.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field: string, value: string) => {
    setLocalContent({
      ...localContent,
      hero: { ...localContent.hero, [field]: value }
    });
  };

  const updatePricing = (index: number, field: string, value: any) => {
    const newPricing = [...localContent.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    setLocalContent({ ...localContent, pricing: newPricing });
  };

  const addPricingPlan = () => {
    setLocalContent({
      ...localContent,
      pricing: [
        ...localContent.pricing,
        { name: 'New Plan', price: '$0', description: '', features: [] }
      ]
    });
  };

  const removePricingPlan = (index: number) => {
    const newPricing = localContent.pricing.filter((_, i) => i !== index);
    setLocalContent({ ...localContent, pricing: newPricing });
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 mb-2">Site Content</h1>
          <p className="text-zinc-500 font-medium">Manage the text and images displayed on your website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-sm transition-all duration-300 border ${
              showLogs 
                ? 'bg-zinc-950 text-white border-zinc-950' 
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
            }`}
          >
            <History className="w-4 h-4 stroke-[2]" />
            {showLogs ? 'Hide Logs' : 'View Logs'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-sm transition-all duration-300 disabled:opacity-50 shadow-sm"
          >
            {saving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 stroke-[2]" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {showLogs ? (
        <div className="bg-white border border-zinc-200 rounded-md overflow-hidden animate-in">
          <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
            <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-950">
              <History className="w-5 h-5 text-emerald-600 stroke-[2]" />
              Activity History
            </h2>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1">Audit Trail</p>
          </div>
          <div className="divide-y divide-zinc-100">
            {logs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-zinc-50 transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600 border border-zinc-200">
                  <User className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-zinc-950 text-sm">{log.email}</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-widest rounded border border-zinc-200">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{log.details}</p>
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="p-20 text-center">
                <FileText className="w-12 h-12 text-zinc-200 mx-auto mb-4 stroke-[1]" />
                <p className="text-zinc-400 font-medium italic">No activity logs found yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in">
          {/* Hero Section */}
          <div className="bg-white border border-zinc-200 rounded-md p-10 space-y-8">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Hero Section</h2>
              <p className="text-lg font-bold text-zinc-950 mt-1">Landing Page Introduction</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Main Title</label>
                <input
                  type="text"
                  value={localContent.hero.title}
                  onChange={(e) => updateHero('title', e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Subtitle</label>
                <textarea
                  rows={3}
                  value={localContent.hero.subtitle}
                  onChange={(e) => updateHero('subtitle', e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none leading-relaxed"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Button Text</label>
                <input
                  type="text"
                  value={localContent.hero.ctaText}
                  onChange={(e) => updateHero('ctaText', e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white border border-zinc-200 rounded-md p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h2 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Pricing Plans</h2>
                <p className="text-lg font-bold text-zinc-950 mt-1">Tour Packages</p>
              </div>
              <button
                onClick={addPricingPlan}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-950 text-white rounded-md text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2]" />
                Add Plan
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {localContent.pricing.map((plan, index) => (
                <div key={index} className="bg-zinc-50 border border-zinc-200 rounded-md p-8 space-y-6 relative group">
                  <button
                    onClick={() => removePricingPlan(index)}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2]" />
                  </button>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Plan Name</label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => updatePricing(index, 'name', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-md py-2.5 px-4 text-zinc-950 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Price</label>
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => updatePricing(index, 'price', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-md py-2.5 px-4 text-zinc-950 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Description</label>
                    <input
                      type="text"
                      value={plan.description}
                      onChange={(e) => updatePricing(index, 'description', e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-md py-2.5 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white border border-zinc-200 rounded-md p-10 space-y-8">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Contact Information</h2>
              <p className="text-lg font-bold text-zinc-950 mt-1">Business Details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={localContent.contact.email}
                  onChange={(e) => setLocalContent({ ...localContent, contact: { ...localContent.contact, email: e.target.value } })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Address</label>
                <input
                  type="text"
                  value={localContent.contact.address}
                  onChange={(e) => setLocalContent({ ...localContent, contact: { ...localContent.contact, address: e.target.value } })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-3 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
