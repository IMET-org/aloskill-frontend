"use client";

import { Badge, SectionHeader } from "../Components";

const sections = [
  { title: "Homepage Banner", icon: "🖼️", desc: "Hero banners and call-to-actions", count: 3 },
  { title: "Featured Courses", icon: "⭐", desc: "Spotlight section on homepage", count: 6 },
  { title: "Blog Management", icon: "📝", desc: "Articles and announcements", count: 14 },
  { title: "Testimonials", icon: "💬", desc: "Student success stories", count: 8 },
  { title: "FAQ Management", icon: "❓", desc: "Common questions & answers", count: 24 },
  { title: "Static Pages", icon: "📄", desc: "Terms, Privacy, Refund Policy", count: 5 },
  { title: "SEO Settings", icon: "🔍", desc: "Meta tags and optimization", count: null },
  { title: "Email Templates", icon: "✉️", desc: "Welcome, receipt, approval", count: 12 },
];

export default function CMSPage() {
  return (
    <div className='animate-page-enter'>
      <SectionHeader
        title='CMS & Content'
        sub='Manage all website content, pages and marketing'
      />

      <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4'>
        {sections.map(s => (
          <div
            key={s.title}
            className='group relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl p-[22px] cursor-pointer transition-all duration-200 hover:border-[#da7c36]/30 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'
          >
            {/* Icon */}
            <div className='text-[28px] mb-3 transition-transform duration-200 group-hover:scale-110 origin-left'>
              {s.icon}
            </div>

            {/* Title */}
            <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-1.5">
              {s.title}
            </div>

            {/* Description */}
            <div className='text-[12px] text-[#3d5a80] mb-3.5 leading-relaxed'>{s.desc}</div>

            {/* Footer */}
            <div className='flex justify-between items-center'>
              {s.count !== null ? <Badge variant='gray'>{s.count} items</Badge> : <div />}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['Outfit'] text-[12px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78] ml-auto">
                Manage →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
