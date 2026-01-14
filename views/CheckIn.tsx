
import React, { useState } from 'react';
import { Search, UserCheck, CheckCircle2, X, Fingerprint } from 'lucide-react';
import { Member, SubscriptionType } from '../types';

interface CheckInProps {
  members: Member[];
  onCheckIn: (memberId: string) => void;
}

const CheckIn: React.FC<CheckInProps> = ({ members, onCheckIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastCheckIn, setLastCheckIn] = useState<Member | null>(null);

  const filteredMembers = members.filter(m => 
    m.name.includes(searchTerm) || m.phone.includes(searchTerm)
  );

  const handleAction = (member: Member) => {
    onCheckIn(member.id);
    setLastCheckIn(member);
    setSearchTerm('');
    setTimeout(() => setLastCheckIn(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-4">
          <Fingerprint className="text-yellow-500" size={32} />
        </div>
        <h2 className="text-3xl font-black uppercase italic">Reception</h2>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">Check-in Management</p>
      </div>

      {/* بحث عريض ومميز */}
      <div className="relative sticky top-0 z-20">
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <Search className="text-yellow-500" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو رقم الهاتف..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.8rem] py-5 pr-14 pl-14 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-base font-bold shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full text-zinc-400"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {lastCheckIn && (
        <div className="yellow-gradient p-5 rounded-[2rem] flex items-center gap-4 animate-in zoom-in duration-300 shadow-xl shadow-yellow-500/20">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <CheckCircle2 size={24} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-black font-black text-sm uppercase italic">Success Entry</p>
            <p className="text-black font-bold text-xs">مرحباً بك، {lastCheckIn.name}</p>
          </div>
        </div>
      )}

      <div className="space-y-3 pb-20">
        {searchTerm ? filteredMembers.map(member => (
          <div key={member.id} className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-[2.2rem] flex items-center justify-between group active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={member.photoUrl} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-yellow-500/10 group-hover:ring-yellow-500/30 transition-all" alt="" />
                {member.subscription.status === 'active' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-zinc-900 rounded-full"></div>
                )}
              </div>
              <div>
                <h4 className="font-black text-sm uppercase">{member.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-zinc-500">{member.subscription.type}</span>
                  <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
                  <span className={`text-[10px] font-bold ${member.subscription.remainingSessions <= 2 ? 'text-orange-500' : 'text-yellow-500'}`}>
                    {member.subscription.remainingSessions} حصص متبقية
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleAction(member)}
              className="w-14 h-14 yellow-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/10 active:bg-yellow-400"
            >
              <UserCheck size={28} className="text-black" strokeWidth={2.5} />
            </button>
          </div>
        ) ) : (
           <div className="py-20 text-center">
             <div className="w-24 h-24 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck size={40} className="text-zinc-700" />
             </div>
             <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">انتظار تسجيل الدخول</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
