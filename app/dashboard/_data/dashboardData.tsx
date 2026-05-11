'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutGrid,
  Users,
  CalendarDays,
  Video,
  FileText,
  BarChart2,
  Gem,
  ShoppingBag,
  Headphones,
  ShoppingCart,
  Settings,
  LogOut,
  UserCheck,
  Diamond,
  IndianRupee,
  Calendar,
  ChevronRight,
  Bell,
  Search,
  TrendingUp,
} from 'lucide-react';



const menuItems = [
  { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { label: 'Users', icon: Users, href: '/dashboard/users' },
  { label: 'Events', icon: CalendarDays, href: '/dashboard/events', arrow: true },
  { label: 'Videos', icon: Video, href: '/dashboard/videos', arrow: true },
  { label: 'Reels / Content', icon: FileText, href: '/dashboard/reels-content', arrow: true },
  { label: 'Leaderboard', icon: BarChart2, href: '/dashboard/leaderboard', arrow: true },
  { label: 'Diamonds', icon: Gem, href: '/dashboard/diamonds', arrow: true },
  { label: 'Shop', icon: ShoppingBag, href: '/dashboard/shop', arrow: true },
  { label: 'Support', icon: Headphones, href: '/dashboard/support', arrow: true },
  { label: 'Cart', icon: ShoppingCart, href: '/dashboard/cart', arrow: true },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings', arrow: true },
  { label: 'Logout', icon: LogOut, href: '/logout' },
];

export const statCards = [
  { title: 'Total Users', value: '12,540', icon: Users, color: 'bg-[#7441d8]' },
  { title: 'Active Users', value: '3,240', icon: UserCheck, color: 'bg-[#5abc68]' },
  { title: 'Total Diamonds', value: '1,25,000', icon: Diamond, color: 'bg-[#3e82ff]' },
  { title: 'Revenue', value: '₹4,50,000', icon: IndianRupee, color: 'bg-[#ffa229]' },
  { title: 'Active Events', value: '02', icon: Calendar, color: 'bg-[#e64f82]' },
];

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const bars: [number, number][] = [
  [125, 24],
  [118, 24],
  [153, 125],
  [118, 73],
  [102, 56],
  [134, 24],
  [116, 49],
];

export const linePath =
  'M0 151 C46 160 48 197 111 189 C171 181 171 121 225 121 C279 121 276 183 336 189 C400 196 408 157 461 156 C520 155 516 198 586 190 C636 184 641 141 706 132';

export const lineAreaPath = `${linePath} L706 305 L0 305 Z`;

export const recentActivities = [
  {
    title: 'New user registered',
    description: 'Rohit Kumar joined the platform',
    time: '2 mins ago',
  },
  {
    title: 'User profile updated',
    description: 'Sara Lee changed her profile picture',
    time: '10 seconds ago',
  },
  {
    title: 'Password changed',
    description: 'James Smith updated his password',
    time: '5 minutes ago',
  },
  {
    title: 'New message received',
    description: 'Emily Wong sent you a message',
    time: '3 minutes ago',
  },
  {
    title: 'New event created',
    description: 'WarShin event was published successfully',
    time: '8 minutes ago',
  },
];

export const topEvents = [
  {
    name: 'WarShin',
    category: 'Ultimate sports battle',
    value: '23,587',
    percent: 100,
    color: 'bg-[#226dff]',
  },
  {
    name: 'DanceX',
    category: 'Ultimate Dance Championship',
    value: '12,587',
    percent: 64,
    color: 'bg-[#7441d8]',
  },
  {
    name: 'Music Mania',
    category: 'Music Competition',
    value: '13,587',
    percent: 52,
    color: 'bg-[#d94179]',
  },
  {
    name: 'PhotoClic',
    category: 'Photography Contest',
    value: '10,587',
    percent: 45,
    color: 'bg-[#f29b35]',
  },
  {
    name: 'RapBattle',
    category: 'Rap & Freestyle Battle',
    value: '09,587',
    percent: 32,
    color: 'bg-[#4caf5a]',
  },
];



interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}



function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0 shadow-sm`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="min-w-0">
        <p className="text-gray-400 text-xs font-medium truncate">{title}</p>

        <p className="text-gray-900 font-bold text-xl mt-0.5">{value}</p>

        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-green-500" />

          <span className="text-green-500 text-[10px] font-semibold">
            +12.5%
          </span>

          <span className="text-gray-400 text-[10px]">this month</span>
        </div>
      </div>
    </div>
  );
}

function LineChartCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-900 font-bold text-sm">User Growth</h3>

          <p className="text-gray-400 text-xs mt-0.5">
            Last 7 months overview
          </p>
        </div>
      </div>

      <svg viewBox="0 0 706 220" className="w-full" fill="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7441d8" stopOpacity="0.18" />

            <stop offset="100%" stopColor="#7441d8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[50, 100, 150, 200].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="706"
            y2={y}
            stroke="#f3f4f6"
            strokeWidth="1"
          />
        ))}

        <path d={lineAreaPath} fill="url(#lineGrad)" />

        <path
          d={linePath}
          stroke="#7441d8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="225" cy="121" r="5" fill="#7441d8" />

        <circle cx="225" cy="121" r="9" fill="#7441d8" fillOpacity="0.2" />
      </svg>

      <div className="flex justify-between mt-1 px-1">
        {months.map((m) => (
          <span key={m} className="text-[10px] text-gray-400">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function BarChartCard() {
  const maxH = Math.max(...bars.map(([h]) => h));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-900 font-bold text-sm">Revenue</h3>

          <p className="text-gray-400 text-xs mt-0.5">
            Monthly breakdown
          </p>
        </div>
      </div>

      <div className="flex items-end gap-2 h-[160px]">
        {bars.map(([h, h2], i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
          >
            <div className="w-full flex flex-col justify-end gap-1 flex-1">
              <div
                className="w-full bg-[#7441d8] rounded-t-md"
                style={{
                  height: `${(h / maxH) * 75}%`,
                }}
              />

              <div
                className="w-full bg-[#3e82ff] rounded-t-md"
                style={{
                  height: `${(h2 / maxH) * 75}%`,
                }}
              />
            </div>

            <span className="text-[9px] text-gray-400 mt-1">
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivitiesCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-bold text-sm">
          Recent Activities
        </h3>

        <button className="text-[#7441d8] text-xs font-semibold hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((a, i) => (
          <div key={i}>
            <p className="text-gray-800 text-xs font-semibold">
              {a.title}
            </p>

            <p className="text-gray-400 text-[11px] mt-0.5">
              {a.description}
            </p>

            <p className="text-gray-300 text-[10px] mt-1">
              {a.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopEventsCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-bold text-sm">Top Events</h3>

        <button className="text-[#7441d8] text-xs font-semibold hover:underline">
          See all
        </button>
      </div>

      <div className="space-y-4">
        {topEvents.map((event, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-800 text-xs font-semibold">
                  {event.name}
                </p>

                <p className="text-gray-400 text-[10px] mt-0.5">
                  {event.category}
                </p>
              </div>

              <span className="text-gray-700 text-xs font-bold bg-gray-50 px-2 py-1 rounded-lg">
                {event.value}
              </span>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${event.color} rounded-full`}
                style={{ width: `${event.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-w-[240px] min-h-screen bg-[#12082a] flex flex-col border-r border-white/5 flex-shrink-0">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7441d8] to-[#3e82ff] flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-base">A</span>
          </div>

          <div>
            <p className="text-white font-bold text-sm leading-none">
              AdminPanel
            </p>

            <p className="text-white/30 text-[10px] mt-0.5 tracking-wide">
              Management System
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group
              ${
                active
                  ? 'bg-[#7441d8] text-white'
                  : 'text-white/45 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />

              <span className="flex-1 truncate">{item.label}</span>

              {item.arrow && (
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div>
            <h1 className="text-gray-900 font-bold text-lg">
              Dashboard
            </h1>

            <p className="text-gray-400 text-[11px] mt-0.5">
              Welcome back, Admin 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
              <Search className="w-3.5 h-3.5 text-gray-400" />

              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>

            <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
              <Bell className="w-4 h-4 text-gray-500" />

              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#e64f82]" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7441d8] to-[#3e82ff] flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {statCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LineChartCard />
            </div>

            <BarChartCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RecentActivitiesCard />

            <TopEventsCard />
          </div>
        </main>
      </div>
    </div>
  );
}