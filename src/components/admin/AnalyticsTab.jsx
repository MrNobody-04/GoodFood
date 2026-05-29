import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function AnalyticsTab() {
  return (
    <div className="bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 space-y-6 shadow-sm">
      <div>
        <h3 className="font-display font-extrabold text-xl text-neutral-900 dark:text-white">Kitchen Analytics</h3>
        <p className="text-xs text-neutral-400 mt-1 leading-normal">
          Simulated cloud kitchen performance insights and favorite dishes tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Popular Category charts */}
        <div className="border border-neutral-100 dark:border-neutral-800 p-4.5 rounded-2.5xl bg-neutral-50/50 dark:bg-neutral-800/30">
          <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-350 mb-4 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-green-500" />
            <span>Most Popular Categories</span>
          </h4>
          
          <div className="space-y-3.5">
            {[
              { cat: 'Momo', pct: '42%', count: 120, color: 'bg-brand' },
              { cat: 'Pizza', pct: '28%', count: 80, color: 'bg-accent' },
              { cat: 'Burgers', pct: '18%', count: 52, color: 'bg-green-500' },
              { cat: 'Nepali Foods', pct: '12%', count: 34, color: 'bg-blue-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-neutral-700 dark:text-neutral-350">{item.cat}</span>
                  <span className="text-neutral-400">{item.count} orders ({item.pct})</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly peak graphs */}
        <div className="border border-neutral-100 dark:border-neutral-800 p-4.5 rounded-2.5xl bg-neutral-50/50 dark:bg-neutral-800/30 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-350 mb-3">Hourly Peaks</h4>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
              Cloud kitchen order surges occur mostly between <strong>8:00 PM – 2:00 AM</strong>, aligning perfectly with your 24/7 delivery services.
            </p>
          </div>

          <div className="grid grid-cols-4 items-end gap-2.5 h-32 pt-4">
            {[
              { hour: 'Lunch', val: 'h-[35%]', active: false },
              { hour: 'Evening', val: 'h-[55%]', active: false },
              { hour: 'Late Night', val: 'h-[95%]', active: true },
              { hour: 'Midnight', val: 'h-[75%]', active: true },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div className={`w-full rounded-t-lg transition-all duration-500 ${bar.val} ${
                  bar.active ? 'bg-brand' : 'bg-neutral-300 dark:bg-neutral-700'
                }`} />
                <span className="text-[9px] font-bold text-neutral-400 select-none text-center leading-none">
                  {bar.hour}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
