"use client";

import styles from "./AdminDashboard.module.css";
import { Bell, ChevronRight, Menu, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar } from "./Components";

const PAGE_LABELS: Record<string, string> = {
  "": "Dashboard",
  dashboard: "Dashboard",
  students: "Student Management",
  instructors: "Instructor Management",
  courses: "Course Management",
  books: "Books & Products",
  financial: "Financial Management",
  reviews: "Reviews & Ratings",
  badges: "Badges & Ranking",
  coupons: "Coupons & Discounts",
  approvals: "Approval Workflow",
  cms: "CMS / Content",
  analytics: "Analytics & Reports",
  notifications: "Notifications",
  security: "Security & Control",
  settings: "Platform Settings",
  gamification: "Gamification",
};

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const pageId = pathname === "/" ? "" : pathname.replace("/", "");
  const pageLabel = PAGE_LABELS[pageId] || "Dashboard";

  return (
    <header
      style={{
        height: 64,
        background: "#070f1e",
        borderBottom: "1px solid #1a3158",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className='lg:hidden'
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          color: "#7a9cc4",
          padding: 4,
        }}
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb */}
      <div className='flex items-center gap-2'>
        <span style={{ color: "#3d5a80", fontSize: 13 }}>AloSkill</span>
        <ChevronRight
          size={14}
          color='#3d5a80'
        />
        <span style={{ color: "#e8f0fe", fontSize: 13, fontWeight: 600 }}>{pageLabel}</span>
      </div>

      {/* Live indicator */}
      <div className='flex items-center gap-2 ml-4'>
        <div className={styles["pulseDot"]} />
        <span
          className={`${styles["monoText"]} hidden sm:block`}
          style={{ fontSize: 11, color: "#3d5a80" }}
        >
          LIVE
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div
        className='relative hidden md:block'
        style={{ width: 240 }}
      >
        <Search
          size={14}
          color='#3d5a80'
          style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          className={styles["input"]}
          placeholder='Quick search...'
          style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
        />
      </div>

      {/* Actions */}
      <div className='flex gap-2'>
        <div
          className={styles["topbarAction"]}
          style={{ position: "relative" }}
        >
          <Bell size={16} />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#da7c36",
              border: "2px solid #070f1e",
            }}
          />
        </div>
        <div className={`${styles["topbarAction"]} hidden sm:flex`}>
          <Settings size={16} />
        </div>
        <div
          style={{ width: 1, background: "#1a3158", height: 28, alignSelf: "center" }}
          className='hidden sm:block'
        />
        <div className='hidden sm:flex items-center gap-2'>
          <Avatar
            name='Super Admin'
            size={32}
            gradient='135deg, #da7c36, #d15100'
          />
          <div className='hidden md:block'>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e8f0fe", lineHeight: 1.2 }}>
              Super Admin
            </div>
            <div
              className={styles["monoText"]}
              style={{ fontSize: 10, color: "#3d5a80" }}
            >
              OWNER
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
