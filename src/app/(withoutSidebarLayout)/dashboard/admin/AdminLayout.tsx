"use client";

import { useState } from "react";
import styles from "./AdminDashboard.module.css";
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`${styles['root']} flex min-h-screen`} style={{ background: "#050d1a" }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div
        className="flex flex-col min-w-0 overflow-hidden"
        style={{ flex: 1 }}
      >
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main
          className={`${styles['pageEnter']} ${styles['mainContent']} flex-1 overflow-y-auto`}
          style={{ padding: "28px 28px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
