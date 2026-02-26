"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SectionHeader, Toggle } from "../Components";

const radarData = [
  { s: "Rating", v: 90 },
  { s: "Revenue", v: 85 },  
  { s: "Completion", v: 72 },
  { s: "Feedback", v: 88 },
  { s: "Activity", v: 78 },
];

const badgeRules = [
  { badge: "Gold", color: "#ffc107", criteria: "Rating ≥ 4.5 · Revenue ≥ $5K · Completion ≥ 70%" },
  {
    badge: "Platinum",
    color: "#b47aff",
    criteria: "Rating ≥ 4.8 · Revenue ≥ $20K · Completion ≥ 85%",
  },
  { badge: "Premium", color: "#da7c36", criteria: "Manual admin assignment only" },
];

export default function BadgesPage() {
  return (
    <div className='animate-page-enter'>
      <SectionHeader
        title='Badges & Ranking System'
        sub='Configure automated badge assignment and performance criteria'
      />

      {/* chartRow2col */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5'>
        {/* Badge Rules Card */}
        <div className='relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl p-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'>
          <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-5">Badge Rules</div>

          {badgeRules.map(b => (
            <div
              key={b.badge}
              className='p-4 rounded-xl bg-[#070f1e] mb-3 border'
              style={{ borderColor: `${b.color}30` }}
            >
              <div className='flex justify-between items-center mb-2'>
                <div
                  className='font-bold text-[14px]'
                  style={{ color: b.color }}
                >
                  🏅 {b.badge} Badge
                </div>
                <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
                  Edit
                </button>
              </div>
              <div className='font-mono text-[12px] text-[#7a9cc4]'>{b.criteria}</div>
            </div>
          ))}

          <button className="w-full flex justify-center items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold transition-all mt-2 bg-gradient-to-br from-[#da7c36] to-[#d15100] text-white shadow-[0_4px_14px_rgba(218,124,54,0.25)] hover:shadow-[0_6px_20px_rgba(218,124,54,0.45)] hover:-translate-y-px">
            + Add Badge Rule
          </button>
        </div>

        {/* Radar Card */}
        <div className='relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl p-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'>
          <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-1">
            Instructor Score Radar
          </div>
          <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-4'>
            James Carter — Platinum
          </div>

          <ResponsiveContainer
            width='100%'
            height={200}
          >
            <RadarChart data={radarData}>
              <PolarGrid stroke='#1a3158' />
              <PolarAngleAxis
                dataKey='s'
                tick={{ fontSize: 11, fill: "#7a9cc4", fontFamily: "'DM Mono',monospace" }}
              />
              <Radar
                dataKey='v'
                stroke='#da7c36'
                fill='#da7c36'
                fillOpacity={0.15}
                strokeWidth={2}
                name='Score'
              />
              <Tooltip
                contentStyle={{
                  background: "#0d1f3c",
                  border: "1px solid #1a3158",
                  borderRadius: 8,
                  color: "#e8f0fe",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Automation Controls Card */}
      <div className='relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl p-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'>
        <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-5">
          Automation Controls
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3.5'>
          {[
            ["Auto Badge Upgrade", "Upgrade when criteria met", true],
            ["Auto Badge Downgrade", "Downgrade on performance drop", true],
            ["Manual Override", "Admin can override automation", true],
          ].map(([l, s, on]) => (
            <div
              key={String(l)}
              className='bg-[#070f1e] border border-[#1a3158] rounded-xl p-4 flex justify-between items-start'
            >
              <div>
                <div className='font-semibold text-[13px] text-[#e8f0fe] mb-1'>{l}</div>
                <div className='text-[11px] text-[#3d5a80]'>{s}</div>
              </div>
              <Toggle on={Boolean(on)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
