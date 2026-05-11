type IconProps = {
  className?: string;
};

function IconBase({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      {children}
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" stroke="none" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function VideosIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function EventsIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="4" width="7" height="7" rx="1" />
      <rect x="14" y="4" width="7" height="7" rx="1" />
      <rect x="3" y="15" width="7" height="7" rx="1" />
      <path d="m15 16 5 5" />
      <path d="m20 16-5 5" />
    </IconBase>
  );
}

export function ContentIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="m10 10 5 3-5 3z" />
      <path d="M7 3v4" />
      <path d="M17 3v4" />
    </IconBase>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M4 20h16" />
      <path d="M6 20V10" />
      <path d="M12 20V4" />
      <path d="M18 20v-7" />
    </IconBase>
  );
}

export function DiamondIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      <path d="m9 3 3 6 3-6" />
    </IconBase>
  );
}

export function ShopIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M3 9h18l-2 11H5z" />
      <path d="M5 9V5h14v4" />
      <path d="M8 13h8" />
    </IconBase>
  );
}

export function SupportIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="m5.6 5.6 4.3 4.3" />
      <path d="m18.4 5.6-4.3 4.3" />
      <path d="m5.6 18.4 4.3-4.3" />
      <path d="m18.4 18.4-4.3-4.3" />
    </IconBase>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="m5.6 5.6 4.3 4.3" />
      <path d="m18.4 5.6-4.3 4.3" />
      <path d="m5.6 18.4 4.3-4.3" />
      <path d="m18.4 18.4-4.3-4.3" />
    </IconBase>
  );
}




export function SettingsIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1v.17a2 2 0 1 1-4 0V21a1.7 1.7 0 0 0-.4-1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4h-.17a2 2 0 1 1 0-4H3a1.7 1.7 0 0 0 1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V2.83a2 2 0 1 1 4 0V3a1.7 1.7 0 0 0 .4 1 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.26.27.47.61.6 1h1.17a2 2 0 1 1 0 4H20a1.7 1.7 0 0 0-.6 1z" />
    </IconBase>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </IconBase>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </IconBase>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
        fill="currentColor"
        stroke="none"
      />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </IconBase>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="currentColor"
        stroke="none"
      />
      <path d="m3 7 9 6 9-6" stroke="#222637" />
    </IconBase>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"
        fill="currentColor"
      />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </IconBase>
  );
}

export function UsersSolidIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M16 19v-1.2a3.8 3.8 0 0 0-3.8-3.8H7.8A3.8 3.8 0 0 0 4 17.8V19" />
      <circle cx="10" cy="8" r="3.5" />
      <path d="M20 19v-1.3a3.6 3.6 0 0 0-2.7-3.5" />
      <path d="M15 4.4a3.5 3.5 0 0 1 0 7.1" />
    </IconBase>
  );
}

export function ActiveUsersIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="m3 12 3 3 5-6" />
      <path d="M18 19v-1.2a3.8 3.8 0 0 0-3.8-3.8h-1.5" />
      <circle cx="14" cy="8" r="3.5" />
      <path d="M22 19v-1.3a3.6 3.6 0 0 0-2.7-3.5" />
    </IconBase>
  );
}

export function DiamondSolidIcon({ className }: IconProps) {
  return (
    <span className={`${className ?? ""} text-[31px] leading-none`}>
      {"\u{1F48E}"}
    </span>
  );
}

export function RupeeIcon({ className }: IconProps) {
  return (
    <span className={`${className ?? ""} text-[36px] leading-none`}>
      {"\u20b9"}
    </span>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
      <path d="M14 14h2" />
    </IconBase>
  );
}
