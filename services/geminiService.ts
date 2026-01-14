
import { GoogleGenAI } from "@google/genai";
import { Member } from "../types";

// Always initialize with named parameter and use process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGymInsights = async (members: Member[]) => {
  // Use recommended model for text tasks
  const model = 'gemini-3-flash-preview';
  
  const memberDataSummary = members.map(m => ({
    name: m.name,
    sub: m.subscription.type,
    remaining: m.subscription.remainingSessions,
    status: m.subscription.status
  }));

  const prompt = `
    بصفتك مستشاراً ذكياً لصالة رياضية، قم بتحليل بيانات المشتركين التالية وقدم نصائح إدارية لتحسين المبيعات والاحتفاظ بالعملاء.
    البيانات: ${JSON.stringify(memberDataSummary)}
    
    المطلوب:
    1. ملخص لحالة الاشتراكات الحالية.
    2. توصيات لزيادة التفاعل مع الرياضيين الذين اقتربت جلساتهم من الانتهاء.
    3. اقتراح عروض تسويقية ذكية بناءً على هذه البيانات.
    
    اجعل الرد مشجعاً ومهنياً باللغة العربية.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Use .text property to extract response
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "عذراً، لا يمكن الحصول على تحليلات حالياً. يرجى المحاولة لاحقاً.";
  }
};

export const getPersonalizedPlan = async (member: Member) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    أنشئ خطة تدريبية مبسطة ومشجعة لهذا الرياضي:
    الاسم: ${member.name}
    نوع الاشتراك: ${member.subscription.type}
    تاريخ الانضمام: ${member.joinDate}
    
    ركز على تحفيزه للحضور بانتظام وتحسين اللياقة البدنية.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    // Use .text property to extract response
    return response.text;
  } catch (error) {
    console.error("Gemini Coach Error:", error);
    return "لا يمكن توليد خطة حالياً.";
  }
};
