// app/dashboard/_components/BarChart.tsx

'use client';

import { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug'];

const bars: [number, number][] = [
  [125, 24], [118, 24], [153, 125],
  [118, 73], [102, 56], [134, 24], [116, 49],
];

export function BarChart() {
  const [activeIndex, setActiveIndex] = useState(2);
  const maxH = Math.max(...bars.map(([h]) => h));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-900 font-bold text-sm">Revenue</h3>
          <p className="text-gray-400 text-xs mt-0.5">Monthly breakdown</p>
        </div>
      </div>

      <div className="flex items-end gap-2" style={{ height: '160px' }}>
        {bars.map(([h, h2], i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end cursor-pointer group"
          >
            <div className="w-full flex flex-col justify-end gap-0.5 flex-1">
              <div
                className={`w-full rounded-t-md transition-all ${
                  activeIndex === i ? 'bg-[#7441d8]' : 'bg-[#7441d8]/40 group-hover:bg-[#7441d8]/70'
                }`}
                style={{ height: `${(h / maxH) * 75}%` }}
              />
              <div
                className={`w-full rounded-t-md transition-all ${
                  activeIndex === i ? 'bg-[#3e82ff]' : 'bg-[#3e82ff]/40 group-hover:bg-[#3e82ff]/70'
                }`}
                style={{ height: `${(h2 / maxH) * 75}%` }}
              />
            </div>
            <span className={`text-[9px] mt-1 ${activeIndex === i ? 'text-[#7441d8] font-bold' : 'text-gray-400'}`}>
              {months[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#7441d8]" />
          <span className="text-[10px] text-gray-500 font-medium">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#3e82ff]" />
          <span className="text-[10px] text-gray-500 font-medium">Profit</span>
        </div>
      </div>
    </div>
  );
}