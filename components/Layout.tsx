
import React from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Sparkles, Dumbbell, Bell 
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'members', label: 'الأعضاء', icon: Users },
    { id: 'checkin', label: 'حضور', icon: UserCheck },
    { id: 'ai-consultant', label: 'الذكاء', icon: Sparkles },
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header أنيق للهوية الصفراء */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-yellow-500/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 yellow-gradient rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 rotate-3">
            <Dumbbell size={22} className="text-black" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">GymFlow</h1>
            <p className="text-[9px] font-bold text-yellow-500 tracking-[0.2em] uppercase mt-1">Elite Performance</p>
          </div>
        </div>
        <button className="relative p-2 bg-zinc-900 rounded-full border border-zinc-800">
          <Bell size={20} className="text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full border-2 border-black"></span>
        </button>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* شريط التنقل السفلي المطور */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="max-w-md mx-auto bg-zinc-900/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-2 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`flex flex-col items-center justify-center w-[22%] py-3 rounded-[1.8rem] transition-all duration-500 relative ${
                activeView === item.id 
                  ? 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20 scale-105' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <item.icon size={22} strokeWidth={activeView === item.id ? 2.5 : 2} />
              <span className={`text-[9px] font-black mt-1.5 ${activeView === item.id ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
              {activeView === item.id && (
                <div className="absolute -bottom-1 w-1 h-1 bg-black rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
