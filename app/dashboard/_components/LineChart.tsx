"use client";

import { useState } from "react";
import { lineAreaPath, linePath, months } from "../_data/dashboardData";

const chartPoints = [
  { x: 0, y: 151, label: "Jan", value: "10,280 Users" },
  { x: 111, y: 189, label: "Feb", value: "8,950 Users" },
  { x: 225, y: 121, label: "Mar", value: "12,450 Users" },
  { x: 336, y: 189, label: "Apr", value: "9,180 Users" },
  { x: 478, y: 147, label: "Jun", value: "12,450 Users" },
  { x: 586, y: 190, label: "Jul", value: "8,870 Users" },
  { x: 706, y: 132, label: "Aug", value: "13,120 Users" },
];

function findNearestPoint(cursorX: number) {
  return chartPoints.reduce((closest, point) =>
    Math.abs(point.x - cursorX) < Math.abs(closest.x - cursorX)
      ? point
      : closest,
  );
}

export function LineChart() {
  const [activePoint, setActivePoint] = useState(chartPoints[4]);

  return (
    <div className="mt-8 grid grid-cols-[44px_1fr]">
      <div className="flex h-[282px] flex-col justify-between pb-7 text-base text-[#6573ad]">
        <span>15k</span>
        <span>12k</span>
        <span>9k</span>
        <span>6k</span>
        <span>3k</span>
        <span>0</span>
      </div>
      <div>
        <svg
          viewBox="0 0 706 305"
          className="h-[305px] w-full overflow-visible cursor-crosshair"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const cursorX =
              ((event.clientX - bounds.left) / bounds.width) * 706;

            setActivePoint(findNearestPoint(Math.max(0, Math.min(706, cursorX))));
          }}
        >
          <defs>
            <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2b7dff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#2b7dff" stopOpacity="0" />
            </linearGradient>
            <filter id="lineGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={lineAreaPath} fill="url(#lineFill)" />
          <path
            d={linePath}
            fill="none"
            stroke="#2375ff"
            strokeLinecap="round"
            strokeWidth="2.5"
            filter="url(#lineGlow)"
            className="transition-all duration-300 hover:[stroke-width:4]"
          />
          <line
            x1="0"
            x2="706"
            y1="305"
            y2="305"
            stroke="#6372b1"
            strokeWidth="1.2"
          />
          {[0, 123, 241, 355, 472, 584, 706].map((x) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1="305"
              y2="311"
              stroke="#6372b1"
              strokeWidth="1"
            />
          ))}
          <line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={activePoint.y + 9}
            y2={Math.max(28, activePoint.y - 24)}
            stroke="#6675b2"
            strokeDasharray="3 3"
            className="transition-all duration-200"
          />
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="10"
            fill="#2375ff"
            opacity="0.18"
            className="transition-all duration-200"
          />
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="6"
            fill="#ffffff"
            className="transition-all duration-200"
          />
          <circle
            cx={activePoint.x}
            cy={activePoint.y}
            r="4"
            fill="#2375ff"
            className="transition-all duration-200"
          />
          <rect
            x={Math.min(640, Math.max(0, activePoint.x - 33))}
            y={Math.max(12, activePoint.y - 48)}
            width="66"
            height="37"
            rx="5"
            fill="#0873ff"
            className="transition-all duration-200"
          />
          <text
            x={Math.min(673, Math.max(33, activePoint.x))}
            y={Math.max(28, activePoint.y - 32)}
            textAnchor="middle"
            fill="white"
            fontSize="9"
            className="transition-all duration-200"
          >
            {activePoint.label}
          </text>
          <text
            x={Math.min(673, Math.max(33, activePoint.x))}
            y={Math.max(41, activePoint.y - 19)}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="700"
            className="transition-all duration-200"
          >
            {activePoint.value}
          </text>
        </svg>
        <div className="grid grid-cols-7 text-base text-[#6674b0]">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
