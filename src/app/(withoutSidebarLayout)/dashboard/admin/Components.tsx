"use client";

import styles from "./AdminDashboard.module.css";

// ═══════════════════════════════════════════════════════
//   AVATAR
// ═══════════════════════════════════════════════════════
export function Avatar({
  name,
  size = 36,
  gradient = "135deg, #074079, #da7c36",
}: {
  name: string;
  size?: number;
  gradient?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={styles['avatar']}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: `linear-gradient(${gradient})`,
        minWidth: size,
      }}
    >
      {initials}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   BADGE
// ═══════════════════════════════════════════════════════
const badgeMap: Record<string, string|undefined> = {
  green: styles['badgeGreen'],
  red: styles['badgeRed'],
  orange: styles['badgeOrange'],
  blue: styles['badgeBlue'],
  gold: styles['badgeGold'],
  purple: styles['badgePurple'],
  gray: styles['badgeGray'],
};

export function Badge({
  children,
  variant = "gray",
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  return (
    <span className={`${styles['badge']} ${badgeMap[variant] || styles['badgeGray']}`}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════
//   TOGGLE
// ═══════════════════════════════════════════════════════
export function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={styles['toggleSwitch']}
      style={{ background: on ? "#da7c36" : "#1a3158" }}
    >
      <div
        className={styles['toggleKnob']}
        style={{ left: on ? 22 : 3 }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   PROGRESS BAR
// ═══════════════════════════════════════════════════════
export function ProgressBar({ value, color }: { value: number; color?: string }) {
  return (
    <div className={styles['progressBar']}>
      <div
        className={styles['progressFill']}
        style={{
          width: `${value}%`,
          background: color || "linear-gradient(90deg, #074079, #da7c36)",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   KPI CARD
// ═══════════════════════════════════════════════════════
export function KpiCard({
  label,
  value,
  sub,
  icon,
  accentColor = "#da7c36",
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accentColor?: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className={styles['kpiCard']} style={{ "--accent": accentColor } as React.CSSProperties}>
      <div className="flex justify-between items-start mb-4">
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: `${accentColor}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={styles['badge']}
            style={{
              background: trendUp ? "rgba(0,229,160,0.08)" : "rgba(255,71,87,0.08)",
              color: trendUp ? "#00e5a0" : "#ff4757",
              border: `1px solid ${trendUp ? "rgba(0,229,160,0.2)" : "rgba(255,71,87,0.2)"}`,
            }}
          >
            {trend}
          </span>
        )}
      </div>
      <div className={styles['metricValue']} style={{ fontSize: 26, marginBottom: 2 }}>
        {value}
      </div>
      <div className={styles['metricLabel']}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#3d5a80", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   SECTION HEADER
// ═══════════════════════════════════════════════════════
export function SectionHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className={styles['sectionTitle']}>{title}</h1>
        {sub && <div className={styles['sectionSub']}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   CUSTOM CHART TOOLTIP
// ═══════════════════════════════════════════════════════
export function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles['chartTooltip']}>
      <div
        style={{
          color: "#7a9cc4",
          fontSize: 11,
          marginBottom: 6,
          fontFamily: "'DM Mono', monospace",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}:{" "}
          {typeof p.value === "number" && p.value > 999
            ? `$${p.value.toLocaleString()}`
            : p.value}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//   SLIDE PANEL
// ═══════════════════════════════════════════════════════
export function SlidePanel({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles['slidePanel']} onClick={onClose}>
      <div className={styles['slidePanelInner']} onClick={(e) => e.stopPropagation()}>
        <div
          className="flex justify-between items-center"
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #1a3158",
          }}
        >
          <div
            className={styles['syneFont']}
            style={{ fontWeight: 700, fontSize: 16, color: "#e8f0fe" }}
          >
            {title}
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="#3d5a80">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}
