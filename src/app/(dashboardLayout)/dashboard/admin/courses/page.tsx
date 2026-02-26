"use client";

import { Archive, Eye, Home, Search } from "lucide-react";
import { useState } from "react";
import { Badge, ProgressBar, SectionHeader } from "../Components";
import { COURSES } from "../Data";

const statusV: Record<string, string> = {
  Approved: "green",
  Pending: "orange",
  Draft: "gray",
  Rejected: "red",
};

export default function CoursesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter(c => {
    const m =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return m && (statusFilter === "all" || c.status.toLowerCase() === statusFilter);
  });

  const counts = {
    all: COURSES.length,
    approved: COURSES.filter(c => c.status === "Approved").length,
    pending: COURSES.filter(c => c.status === "Pending").length,
    draft: COURSES.filter(c => c.status === "Draft").length,
    rejected: COURSES.filter(c => c.status === "Rejected").length,
  };

  return (
    <div className='animate-page-enter'>
      <SectionHeader
        title='Course Management'
        sub='Review, approve and curate all courses'
      />

      <div className='flex gap-3 mb-5 items-center flex-wrap'>
        {/* Tab Navigation */}
        <div className='flex gap-0.5 bg-[#070f1e] rounded-xl p-1 border border-[#1a3158] overflow-x-auto flex-nowrap scrollbar-hide'>
          {(["all", "approved", "pending", "draft", "rejected"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-[18px] py-2 rounded-lg text-[13px] font-semibold cursor-pointer transition-all font-['Outfit'] whitespace-nowrap border ${
                statusFilter === s
                  ? "bg-[#0d1f3c] text-[#fc9759] border-[#da7c36]/25 shadow-lg"
                  : "bg-transparent text-[#3d5a80] border-transparent hover:text-[#7a9cc4]"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
              <span className='opacity-60 text-[11px]'>({counts[s]})</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className='relative'>
          <Search
            size={14}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-[#3d5a80]'
          />
          <input
            className="w-56 bg-[#070f1e] border border-[#1a3158] rounded-lg py-2.5 pl-9 pr-3.5 text-[13.5px] text-[#e8f0fe] font-['Outfit'] outline-none transition-all focus:border-[#da7c36] focus:ring-3 focus:ring-[#da7c36]/10 placeholder:text-[#3d5a80]"
            placeholder='Search courses...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4'>
        {filtered.map(c => (
          <div
            key={c.id}
            className='group relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl transition-all hover:border-[#2a4a78] hover:-translate-y-0.5 hover:shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none'
          >
            {/* Header / Featured Ribbon */}
            <div className='bg-gradient-to-br from-[#0a1628] to-[#0d1f3c] px-5 py-4 border-b border-[#1a3158] relative'>
              {c.featured && (
                <div className='absolute top-0 right-0 bg-[#da7c36] text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-lg font-mono tracking-wider'>
                  FEATURED
                </div>
              )}
              <div className='flex justify-between items-center'>
                <Badge variant={statusV[c.status]}>{c.status}</Badge>
                <span className='font-mono text-[11px] text-[#3d5a80]'>{c.cat}</span>
              </div>
            </div>

            {/* Body */}
            <div className='p-5'>
              <div className="font-['Syne'] font-bold text-sm text-[#e8f0fe] mb-1 leading-snug">
                {c.title}
              </div>
              <div className='text-[12px] text-[#3d5a80] mb-4'>by {c.instructor}</div>

              {/* Stats Grid */}
              <div className='grid grid-cols-4 gap-2 mb-3.5'>
                {[
                  { l: "Students", v: c.enr.toLocaleString() },
                  { l: "Revenue", v: c.rev ? `$${c.rev.toLocaleString()}` : "$0" },
                  { l: "Rating", v: c.rating || "—" },
                  { l: "Price", v: `$${c.price}` },
                ].map(s => (
                  <div
                    key={s.l}
                    className='text-center'
                  >
                    <div className='font-mono text-sm font-bold text-[#e8f0fe]'>{s.v}</div>
                    <div className='font-mono text-[10px] uppercase tracking-widest text-[#3d5a80] mt-0.5'>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Section */}
              {c.pct > 0 && (
                <div className='mb-3.5'>
                  <div className='flex justify-between mb-1'>
                    <span className='font-mono text-[10px] uppercase tracking-widest text-[#3d5a80]'>
                      Completion Rate
                    </span>
                    <span className='font-mono text-[11px] text-[#da7c36]'>{c.pct}%</span>
                  </div>
                  <ProgressBar value={c.pct} />
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-2 flex-wrap'>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
                  <Eye size={12} /> View
                </button>

                {c.status === "Pending" && (
                  <>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/20 hover:bg-[#00e5a0]/20">
                      ✓ Approve
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-[#ff4757]/10 text-[#ff4757] border border-[#ff4757]/20 hover:bg-[#ff4757]/20">
                      ✗ Reject
                    </button>
                  </>
                )}

                {c.status === "Approved" && (
                  <>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
                      <Home size={12} /> Feature
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]">
                      <Archive size={12} /> Archive
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
