"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge, ProgressBar, SectionHeader } from "../Components";
import { COUPONS } from "../Data";

export default function CouponsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='animate-page-enter'>
      <SectionHeader
        title='Coupons & Discounts'
        sub='Create and manage promotional campaigns'
        action={
          <button
            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold transition-all bg-gradient-to-br from-[#da7c36] to-[#d15100] text-white shadow-[0_4px_14px_rgba(218,124,54,0.25)] hover:shadow-[0_6px_20px_rgba(218,124,54,0.45)] hover:-translate-y-px active:scale-95"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus
              size={14}
              color='white'
            />{" "}
            New Coupon
          </button>
        }
      />

      {showForm && (
        <div className='relative overflow-hidden bg-[#0d1f3c] border border-[#da7c36]/30 rounded-2xl p-6 mb-5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'>
          <div className="font-['Syne'] font-bold text-[15px] text-[#e8f0fe] mb-5">
            Create New Coupon
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3.5'>
            {[
              ["Coupon Code", "text", "e.g. SAVE20"],
              ["Discount Value", "number", "e.g. 20"],
              ["Usage Limit", "number", "Blank = unlimited"],
            ].map(([l, t, p]) => (
              <div key={String(l)}>
                <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-1.5'>
                  {l}
                </div>
                <input
                  className="w-full bg-[#070f1e] border border-[#1a3158] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#e8f0fe] font-['Outfit'] outline-none transition-all focus:border-[#da7c36] focus:shadow-[0_0_0_3px_rgba(218,124,54,0.12)] placeholder:text-[#3d5a80]"
                  type={String(t)}
                  placeholder={String(p)}
                />
              </div>
            ))}
            <div>
              <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-1.5'>
                Type
              </div>
              <select className="w-full bg-[#070f1e] border border-[#1a3158] rounded-lg px-3.5 py-2.5 pr-9 text-[13.5px] text-[#e8f0fe] font-['Outfit'] outline-none cursor-pointer transition-all focus:border-[#da7c36] appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%233d5a80%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]">
                <option>Percentage</option>
                <option>Flat</option>
              </select>
            </div>
            <div>
              <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-1.5'>
                Expiry Date
              </div>
              <input
                className="w-full bg-[#070f1e] border border-[#1a3158] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#e8f0fe] font-['Outfit'] outline-none transition-all focus:border-[#da7c36]"
                type='date'
              />
            </div>
            <div>
              <div className='font-mono text-[11px] uppercase tracking-widest text-[#3d5a80] mb-1.5'>
                Scope
              </div>
              <select className="w-full bg-[#070f1e] border border-[#1a3158] rounded-lg px-3.5 py-2.5 pr-9 text-[13.5px] text-[#e8f0fe] font-['Outfit'] outline-none cursor-pointer transition-all focus:border-[#da7c36] appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%233d5a80%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]">
                <option>Global</option>
                <option>Instructor-specific</option>
                <option>Referral</option>
              </select>
            </div>
          </div>
          <div className='flex gap-3 mt-4'>
            <button className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold transition-all bg-gradient-to-br from-[#da7c36] to-[#d15100] text-white shadow-[0_4px_14px_rgba(218,124,54,0.25)] hover:shadow-[0_6px_20px_rgba(218,124,54,0.45)] hover:-translate-y-px">
              Create Coupon
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-[9px] font-['Outfit'] text-[13px] font-semibold transition-all bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78]"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className='relative overflow-hidden bg-[#0d1f3c] border border-[#1a3158] rounded-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/2 before:to-transparent before:pointer-events-none'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-bottom border-[#1a3158]'>
                {["Code", "Type", "Discount", "Usage", "Scope", "Expires", "Status", "Actions"].map(
                  th => (
                    <th
                      key={th}
                      className='bg-[#070f1e] text-[#3d5a80] text-[11px] font-semibold uppercase tracking-widest px-[18px] py-[13px] text-left font-mono'
                    >
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-[#1a3158]/50'>
              {COUPONS.map(c => (
                <tr
                  key={c.code}
                  className='transition-colors hover:bg-[#0d1f3c]/60 group'
                >
                  <td className='px-[18px] py-[15px] font-mono font-bold text-[#da7c36] text-[14px]'>
                    {c.code}
                  </td>
                  <td className='px-[18px] py-[15px]'>
                    <Badge variant='blue'>{c.type}</Badge>
                  </td>
                  <td className='px-[18px] py-[15px] font-mono font-bold text-[#00e5a0]'>
                    {c.value}
                  </td>
                  <td className='px-[18px] py-[15px]'>
                    <div className='flex items-center gap-2 min-w-[120px]'>
                      <ProgressBar value={c.limit ? (c.used / c.limit) * 100 : 50} />
                      <span className='font-mono text-[11px] text-[#7a9cc4] min-w-[50px]'>
                        {c.used}/{c.limit ?? "∞"}
                      </span>
                    </div>
                  </td>
                  <td className='px-[18px] py-[15px]'>
                    <Badge variant='gray'>{c.scope}</Badge>
                  </td>
                  <td className='px-[18px] py-[15px] font-mono text-[12px] text-[#3d5a80]'>
                    {c.expires}
                  </td>
                  <td className='px-[18px] py-[15px]'>
                    <Badge variant={c.status === "Active" ? "green" : "red"}>{c.status}</Badge>
                  </td>
                  <td className='px-[18px] py-[15px]'>
                    <div className='flex gap-2'>
                      <button className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-transparent text-[#7a9cc4] border border-[#1a3158] hover:bg-[#0d1f3c] hover:text-[#e8f0fe] hover:border-[#2a4a78] transition-all'>
                        <Edit size={12} />
                      </button>
                      <button className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all'>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
