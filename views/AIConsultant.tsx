
import React, { useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, ChevronLeft, Zap, Target } from 'lucide-react';
import { getGymInsights } from '../services/geminiService';
import { Member } from '../types';

interface AIConsultantProps {
  members: Member[];
}

const AIConsultant: React.FC<AIConsultantProps> = ({ members }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateStrategy = async () => {
    setLoading(true);
    const result = await getGymInsights(members);
    setReport(result || null);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-zinc-900 border border-yellow-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 blur-[60px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 yellow-gradient rounded-[2rem] flex items-center justify-center shadow-2xl shadow-yellow-500/20 mb-6 rotate-6">
            <BrainCircuit size={40} className="text-black" />
          </div>
          <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">AI Strategist</h2>
          <p className="text-xs text-zinc-400 leading-relaxed mb-8 max-w-xs">
            حلل بيانات ناديك في ثوانٍ. دع الذكاء الاصطناعي يرسم لك خارطة الطريق لزيادة الأرباح والنمو.
          </p>
          
          <button 
            onClick={generateStrategy}
            disabled={loading}
            className="w-full group flex items-center justify-center gap-3 py-5 bg-white text-black rounded-[1.5rem] font-black uppercase italic transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Analyzing...' : 'Generate Elite Report'}
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col items-center gap-2">
          <Target className="text-yellow-500" size={24} />
          <p className="text-[10px] font-black uppercase text-zinc-400">Targeting</p>
        </div>
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col items-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          <p className="text-[10px] font-black uppercase text-zinc-400">Growth</p>
        </div>
      </div>

      {report && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 yellow-gradient rounded-full"></div>
            <h3 className="text-xl font-black uppercase italic">The Insight</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
              {report}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
