import {
  Users,
  UserCheck,
  Diamond,
  IndianRupee,
  Calendar,
} from "lucide-react";

export const statCards = [
  {
    title: "Total Users",
    value: "12,540",
    icon: Users,
    color: "bg-[#7441d8]",
  },
  {
    title: "Active Users",
    value: "3,240",
    icon: UserCheck,
    color: "bg-[#5abc68]",
  },
  {
    title: "Total Diamonds",
    value: "1,25,000",
    icon: Diamond,
    color: "bg-[#3e82ff]",
  },
  {
    title: "Revenue",
    value: "₹4,50,000",
    icon: IndianRupee,
    color: "bg-[#ffa229]",
  },
  {
    title: "Active Events",
    value: "02",
    icon: Calendar,
    color: "bg-[#e64f82]",
  },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
];

export const linePath =
  "M0 151 C46 160 48 197 111 189 C171 181 171 121 225 121 C279 121 276 183 336 189 C400 196 408 157 461 156 C520 155 516 198 586 190 C636 184 641 141 706 132";

export const lineAreaPath = `${linePath} L706 305 L0 305 Z`;

export const recentActivities = [
  {
    title: "New user registered",
    description: "Rohit Kumar joined the platform",
    time: "2 mins ago",
  },
];

export const topEvents = [
  {
    name: "WarShin",
    category: "Ultimate sports battle",
    value: "23,587",
    percent: 100,
    color: "bg-[#226dff]",
  },
];