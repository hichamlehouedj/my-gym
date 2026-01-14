
export enum SubscriptionType {
  MONTHLY = 'شهر واحد',
  THREE_MONTHS = '3 أشهر',
  SESSIONS = 'بالحصص',
  ANNUAL = 'سنوي'
}

export interface Subscription {
  id: string;
  type: SubscriptionType;
  startDate: string;
  expiryDate: string;
  totalSessions: number;
  remainingSessions: number;
  price: number;
  status: 'active' | 'expired' | 'pending' | 'frozen';
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  joinDate: string;
  goal: 'تنشيف' | 'تضخيم' | 'لياقة' | 'صحة عامة';
  subscription: Subscription;
  lastVisit?: string;
  isPresent: boolean;
}

export type ViewType = 'dashboard' | 'members' | 'checkin' | 'ai-consultant' | 'revenue';
