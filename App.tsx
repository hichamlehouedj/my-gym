
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import CheckIn from './views/CheckIn';
import AIConsultant from './views/AIConsultant';
import { Member, ViewType, SubscriptionType } from './types';
import { MOCK_MEMBERS } from './constants';
import { Search, Plus, Target, Calendar, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  const handleCheckIn = (memberId: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const now = new Date();
        const lastVisit = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        return {
          ...m,
          lastVisit,
          isPresent: true,
          subscription: {
            ...m.subscription,
            remainingSessions: m.subscription.type === SubscriptionType.SESSIONS 
              ? Math.max(0, m.subscription.remainingSessions - 1) 
              : m.subscription.remainingSessions
          }
        };
      }
      return m;
    }));
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard members={members} />;
      case 'checkin':
        return <CheckIn members={members} onCheckIn={handleCheckIn} />;
      case 'ai-consultant':
        return <AIConsultant members={members} />;
      case 'members':
        return (
          <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase italic">Athletes</h2>
                <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">Member Directory</p>
              </div>
              <button className="w-12 h-12 yellow-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20 active:scale-95 transition-all">
                <Plus size={24} className="text-black" strokeWidth={3} />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search athletes..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-[2.2rem] flex flex-col gap-5 group active:bg-zinc-900 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={member.photoUrl} 
                          className="w-16 h-16 rounded-[1.2rem] object-cover ring-2 ring-zinc-800 group-hover:ring-yellow-500/50 transition-all" 
                          alt="" 
                        />
                        {member.isPresent && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-zinc-950 rounded-full animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase italic leading-none">{member.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Target size={12} className="text-yellow-500" />
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{member.goal}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center bg-zinc-800/50 rounded-xl text-zinc-400">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50">
                      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Plan Type</p>
                      <p className="text-xs font-bold uppercase">{member.subscription.type}</p>
                    </div>
                    <div className="bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50">
                      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Status</p>
                      <span className={`text-[9px] font-black uppercase ${
                        member.subscription.status === 'active' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {member.subscription.status === 'active' ? 'Active' : 'Expired'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/50 flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-zinc-600" />
                      Expires: {member.subscription.expiryDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                      Details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard members={members} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
