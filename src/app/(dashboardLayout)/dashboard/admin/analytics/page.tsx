"use client";

import { Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip, SectionHeader } from "../Components";

const completionData = [
  { cat: "Dev", v: 74 },
  { cat: "Design", v: 68 },
  { cat: "Data", v: 81 },
  { cat: "Marketing", v: 55 },
  { cat: "Business", v: 63 },
];

const reports = [
  { name: "Instructor Revenue Report", size: "128 KB", updated: "Today" },
  { name: "Student Activity Report", size: "342 KB", updated: "Today" },
  { name: "Course Completion Report", size: "94 KB", updated: "Yesterday" },
  { name: "Payment Report", size: "216 KB", updated: "Today" },
  { name: "Coupon Usage Report", size: "48 KB", updated: "Feb 18" },
  { name: "Refund Analysis Report", size: "72 KB", updated: "Feb 17" },
];

export default function AnalyticsPage() {
  return (
    /* Using the custom animation defined in global.css theme */
    <div className='animate-page-enter'>
      <SectionHeader
        title='Analytics & Reports'
        sub='Deep insights and downloadable CSV reports'
        action={
          <div className='flex gap-3'>
            <button className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold cursor-pointer transition-all duration-150 bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
              <Download size={13} /> Export CSV
            </button>
            <button className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold cursor-pointer transition-all duration-150 border-none bg-gradient-to-br from-[#da7c36] to-[#d15100] text-white shadow-[0_4px_14px_rgba(218,124,54,0.25)] hover:shadow-[0_6px_20px_rgba(218,124,54,0.45)] hover:-translate-y-px">
              <Download
                size={13}
                color='white'
              />{" "}
              Export PDF
            </button>
          </div>
        }
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-[14px] mb-6'>
        {reports.map(r => (
          <div
            key={r.name}
            className="relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-[16px] p-4 px-5 flex justify-between items-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none"
          >
            <div>
              <div className='font-semibold text-[13px] text-[#e8f0fe] mb-[3px]'>{r.name}</div>
              <div className='font-mono text-[11px] text-[#3d5a80]'>
                {r.size} · {r.updated}
              </div>
            </div>
            <button className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] font-['Outfit'] text-[12px] font-semibold cursor-pointer transition-all duration-150 bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
              <Download size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-[16px] p-6 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
        <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-1">
          Course Completion Rate by Category
        </div>
        <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-6'>
          Current month performance
        </div>

        <ResponsiveContainer
          width='100%'
          height={240}
        >
          <BarChart
            data={completionData}
            barSize={36}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#1a3158'
            />
            <XAxis
              dataKey='cat'
              tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono',monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono',monospace" }}
              axisLine={false}
              tickLine={false}
              unit='%'
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey='v'
              fill='#da7c36'
              radius={[6, 6, 0, 0]}
              name='Completion %'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
