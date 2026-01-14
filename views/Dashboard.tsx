
import React from 'react';
import { Users, Activity, Zap, TrendingUp, Trophy } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Member } from '../types';

interface DashboardProps {
  members: Member[];
}

const Dashboard: React.FC<DashboardProps> = ({ members }) => {
  const activeNow = members.filter(m => m.isPresent).length;
  const totalRevenue = members.reduce((acc, m) => acc + m.subscription.price, 0);

  const occupancyData = [
    { time: '8ص', count: 4 }, { time: '11ص', count: 18 }, { time: '3م', count: 32 },
    { time: '6م', count: 45 }, { time: '9م', count: 28 }, { time: '11م', count: 8 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">الإحصائيات اللحظية</p>
          <h2 className="text-2xl font-black uppercase italic">Dashboard</h2>
        </div>
        <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping"></div>
           <span className="text-[10px] font-bold text-zinc-400">LIVE</span>
        </div>
      </div>

      {/* كروت الإحصائيات الفاخرة */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 blur-2xl group-hover:bg-yellow-500/10 transition-all"></div>
          <Zap size={20} className="text-yellow-500 mb-4" strokeWidth={2.5} />
          <h3 className="text-3xl font-black mb-1">{activeNow}</h3>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">في النادي الآن</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl"></div>
          <Users size={20} className="text-yellow-500 mb-4" strokeWidth={2.5} />
          <h3 className="text-3xl font-black mb-1">{members.length}</h3>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">إجمالي اللاعبين</p>
        </div>
      </div>

      {/* الرسم البياني الأصفر */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-yellow-500" />
            <h3 className="text-sm font-black uppercase">Occupancy</h3>
          </div>
          <span className="text-[9px] font-bold text-zinc-500">24H Trend</span>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occupancyData}>
              <defs>
                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#3f3f46" fontSize={9} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '10px' }}
                itemStyle={{ color: '#facc15' }}
              />
              <Area type="monotone" dataKey="count" stroke="#facc15" strokeWidth={4} fill="url(#yellowGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* قسم الإنجازات/التنبيهات */}
      <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-[2rem] border border-yellow-500/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 yellow-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/10">
            <Trophy className="text-black" size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase italic tracking-wider">الهدف المالي للشهر</h4>
            <p className="text-xs text-zinc-400">أنت الآن في 85% من الهدف المخطط له</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div className="h-full yellow-gradient w-[85%] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
