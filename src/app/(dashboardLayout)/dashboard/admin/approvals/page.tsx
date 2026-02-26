"use client";

import { Badge, SectionHeader } from "../Components";
import { APPROVALS } from "../Data";

const typeIcon: Record<string, string> = {
  "New Course": "📘",
  "New Instructor": "👤",
  "Book Approval": "📕",
  "Instructor KYC": "🔐",
  "Course Update": "✏️",
};

export default function ApprovalsPage() {
  return (
    <div className='animate-page-enter'>
      <SectionHeader
        title='Approval Workflow'
        sub={`${APPROVALS.length} items awaiting your review`}
      />

      <div className='flex flex-col gap-3'>
        {APPROVALS.map(item => (
          <div
            key={item.id}
            className={`
              relative overflow-hidden flex items-center gap-4 px-6 py-[18px] rounded-2xl border bg-brand-dark transition-all
              ${item.priority === "High" ? "border-red-500/25" : "border-gray-400"}
              before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none
            `}
          >
            {/* Icon Container */}
            <div className='flex shrink-0 items-center justify-center w-[46px] h-[46px] rounded-xl bg-brand-deep border border-gray-400 text-[20px]'>
              {typeIcon[item.type]}
            </div>

            {/* Content Area */}
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap gap-2 items-center mb-1'>
                <Badge variant='blue'>{item.type}</Badge>
                {item.priority === "High" && <Badge variant='red'>🔴 High Priority</Badge>}
              </div>

              <div className=' font-bold text-[14px] text-gray-400 mb-[3px]'>{item.title}</div>

              <div className='text-[12px] text-gray-400'>
                {item.by} · {item.date} · {item.id}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-2 shrink-0'>
              {/* btnGhost mapping */}
              <button className="inline-flex items-center px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[12px] font-semibold cursor-pointer transition-all border border-gray-400 text-[#7a9cc4] hover:bg-brand-dark hover:text-brand-text hover:border-[#2a4a78]">
                Review
              </button>

              {/* btnSuccess mapping */}
              <button className="inline-flex items-center px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[12px] font-semibold cursor-pointer transition-all border border-green-500/20 bg-green-500/10 text-[#00e5a0] hover:bg-green-500/20">
                ✓ Approve
              </button>

              {/* btnDanger mapping */}
              <button className="inline-flex items-center px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[12px] font-semibold cursor-pointer transition-all border border-red-500/20 bg-red-500/10 text-[#ff4757] hover:bg-red-500/20">
                ✗ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
