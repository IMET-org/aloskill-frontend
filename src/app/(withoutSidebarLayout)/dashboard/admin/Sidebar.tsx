"use client";

import styles from "./AdminDashboard.module.css";
import {
  Award,
  BarChart2,
  Bell,
  BookOpen,
  CheckCircle,
  DollarSign,
  Gamepad2,
  Globe,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "./Components";
import { NAV_ITEMS } from "./Data";

const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: <LayoutDashboard size={17} />,
  students: <Users size={17} />,
  instructors: <GraduationCap size={17} />,
  courses: <BookOpen size={17} />,
  books: <ShoppingBag size={17} />,
  finance: <DollarSign size={17} />,
  reviews: <Star size={17} />,
  badges: <Award size={17} />,
  coupons: <Tag size={17} />,
  approvals: <CheckCircle size={17} />,
  cms: <Globe size={17} />,
  analytics: <BarChart2 size={17} />,
  notifications: <Bell size={17} />,
  security: <Shield size={17} />,
  settings: <Settings size={17} />,
  gamification: <Gamepad2 size={17} />,
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (v: boolean) => void;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeId = pathname === "/" ? "dashboard" : pathname.replace("/", "");

  const handleNav = (id: string) => {
    router.push(id === "dashboard" ? "/dashboard/admin" : `/dashboard/admin/${id}`);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles["sidebarOverlay"]}
          onClick={() => setMobileOpen && setMobileOpen(false)}
          style={{ display: "block" }}
        />
      )}

      <aside
        className={[
          styles["sidebar"],
          collapsed && !mobileOpen ? styles["sidebarCollapsed"] : "",
          mobileOpen ? styles["sidebarOpen"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 14px 16px",
            borderBottom: "1px solid #1a3158",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minHeight: 68,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #da7c36, #d15100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(218,124,54,0.4)",
            }}
          >
            <Zap
              size={18}
              color='white'
            />
          </div>
          {(!collapsed || mobileOpen) && (
            <>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  className={styles["syneFont"]}
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    color: "#e8f0fe",
                    letterSpacing: "-0.3px",
                  }}
                >
                  AloSkill
                </div>
                <div
                  className={styles["monoText"]}
                  style={{
                    fontSize: 10,
                    color: "#3d5a80",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  Admin Panel
                </div>
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen?.(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#3d5a80",
              padding: 4,
              flexShrink: 0,
              display: "flex",
            }}
          >
            <Menu
              size={16}
              color='#3d5a80'
            />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className={[styles["navItem"], isActive ? styles["navItemActive"] : ""].join(" ")}
                onClick={() => handleNav(item.id)}
                title={collapsed && !mobileOpen ? item.label : undefined}
                style={{ justifyContent: collapsed && !mobileOpen ? "center" : "flex-start" }}
              >
                <span
                  className={styles["navIcon"]}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    color: isActive ? "#da7c36" : "#3d5a80",
                    filter: isActive ? "drop-shadow(0 0 6px rgba(218,124,54,0.6))" : "none",
                  }}
                >
                  {NAV_ICONS[item.id]}
                </span>
                {(!collapsed || mobileOpen) && (
                  <>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <span className={styles["navBadge"]}>{item.badge}</span>}
                  </>
                )}
                {collapsed && !mobileOpen && item.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#da7c36",
                      fontSize: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Profile */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid #1a3158" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px",
              borderRadius: 10,
              background: "#0d1f3c",
              border: "1px solid #1a3158",
            }}
          >
            <Avatar
              name='Super Admin'
              size={34}
              gradient='135deg, #da7c36, #d15100'
            />
            {(!collapsed || mobileOpen) && (
              <>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#e8f0fe",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Super Admin
                  </div>
                  <div
                    className={styles["monoText"]}
                    style={{ fontSize: 10, color: "#3d5a80" }}
                  >
                    FULL ACCESS
                  </div>
                </div>
                <LogOut
                  size={15}
                  color='#3d5a80'
                  style={{ cursor: "pointer", flexShrink: 0 }}
                />
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
