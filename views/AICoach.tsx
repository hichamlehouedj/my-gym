
import React, { useState, useEffect } from 'react';
// Added missing Users import to fix compilation error
import { Sparkles, BrainCircuit, RefreshCw, Send, Trophy, Users } from 'lucide-react';
import { getGymInsights } from '../services/geminiService';
import { Member } from '../types';

interface AICoachProps {
  members: Member[];
}

const AICoach: React.FC<AICoachProps> = ({ members }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getGymInsights(members);
    setInsights(result || "تعذر الحصول على التحليلات.");
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden glass p-8 rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-500/10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={120} />
        </div>
        
        <div className="relative z-10 flex items-center gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20">
            <Sparkles size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">المساعد الإداري الذكي</h2>
            <p className="text-slate-400">تحليلات متقدمة لبيانات ناديك مدعومة بالذكاء الاصطناعي</p>
          </div>
        </div>

        <div className="min-h-[300px] glass bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-slate-200 leading-relaxed">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-slate-400 font-medium animate-pulse">جاري تحليل بيانات المشتركين والاتجاهات...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none whitespace-pre-wrap">
              {insights}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-700"
          >
            <RefreshCw size={18} />
            تحديث التحليل
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
            <Send size={18} />
            إرسال التقارير للمشتركين
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <Trophy size={20} />
            <h4 className="font-bold">تحدي الشهر المقترح</h4>
          </div>
          <p className="text-slate-400 text-sm">بناءً على نشاط الأعضاء، نقترح إطلاق "تحدي 30 يوم رشاقة" لتحفيز المشتركين الجدد.</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4 text-orange-400">
            <Users size={20} />
            <h4 className="font-bold">تنبيه بالاحتفاظ</h4>
          </div>
          <p className="text-slate-400 text-sm">هناك 3 رياضيين تنتهي اشتراكاتهم خلال الـ 48 ساعة القادمة. جرب إرسال كود خصم لهم.</p>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
