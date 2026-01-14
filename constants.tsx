
import { Member, SubscriptionType } from './types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'عبدالله العتيبي',
    phone: '0501112223',
    email: 'abdullah@gym.com',
    photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
    joinDate: '2023-01-15',
    goal: 'تضخيم',
    isPresent: true,
    subscription: {
      id: 'sub1',
      type: SubscriptionType.ANNUAL,
      startDate: '2023-01-15',
      expiryDate: '2024-01-15',
      totalSessions: 0,
      remainingSessions: 0,
      price: 2500,
      status: 'active'
    },
    lastVisit: '2023-11-28 17:00'
  },
  {
    id: '2',
    name: 'فهد بن سلطان',
    phone: '0554445556',
    email: 'fahad@gym.com',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    joinDate: '2023-10-10',
    goal: 'لياقة',
    isPresent: false,
    subscription: {
      id: 'sub2',
      type: SubscriptionType.SESSIONS,
      startDate: '2023-11-01',
      expiryDate: '2023-12-01',
      totalSessions: 12,
      remainingSessions: 3,
      price: 600,
      status: 'active'
    },
    lastVisit: '2023-11-27 19:30'
  },
  {
    id: '3',
    name: 'نورة السعيد',
    phone: '0567778889',
    email: 'noura@gym.com',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    joinDate: '2023-11-20',
    goal: 'تنشيف',
    isPresent: true,
    subscription: {
      id: 'sub3',
      type: SubscriptionType.MONTHLY,
      startDate: '2023-11-20',
      expiryDate: '2023-12-20',
      totalSessions: 0,
      remainingSessions: 0,
      price: 350,
      status: 'active'
    },
    lastVisit: '2023-11-28 16:45'
  }
];
