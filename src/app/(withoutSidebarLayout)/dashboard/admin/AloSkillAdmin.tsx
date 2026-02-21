"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const T = {
  navy: "#050d1a",
  navyMid: "#0a1628",
  navyCard: "#0d1f3c",
  navyBorder: "#1a3158",
  navyHover: "#122448",
  orange: "#da7c36",
  orangeDark: "#d15100",
  orangeLight: "#fc9759",
  orangeGlow: "rgba(218,124,54,0.15)",
  orangeGlowStrong: "rgba(218,124,54,0.25)",
  text: "#e8f0fe",
  textMuted: "#7a9cc4",
  textDim: "#3d5a80",
  green: "#00e5a0",
  greenBg: "rgba(0,229,160,0.1)",
  red: "#ff4757",
  redBg: "rgba(255,71,87,0.1)",
  blue: "#4a9eff",
  blueBg: "rgba(74,158,255,0.1)",
  gold: "#ffc107",
  goldBg: "rgba(255,193,7,0.1)",
  purple: "#b47aff",
  purpleBg: "rgba(180,122,255,0.1)",
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES (injected)
═══════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Outfit', sans-serif;
    background: #050d1a;
    color: #e8f0fe;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #050d1a; }
  ::-webkit-scrollbar-thumb { background: #1a3158; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #da7c36; }

  .alo-sidebar {
    background: linear-gradient(180deg, #070f1e 0%, #050d1a 100%);
    border-right: 1px solid #1a3158;
    width: 260px;
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    z-index: 50;
    overflow: hidden;
  }

  .alo-sidebar.collapsed { width: 68px; }

  .alo-nav-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    color: #3d5a80;
    font-size: 13.5px;
    font-weight: 500;
    transition: all 0.18s;
    border: 1px solid transparent;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
  }

  .alo-nav-item:hover {
    background: #0d1f3c;
    color: #7a9cc4;
    border-color: #1a3158;
  }

  .alo-nav-item.active {
    background: rgba(218,124,54,0.12);
    color: #fc9759;
    border-color: rgba(218,124,54,0.3);
    box-shadow: 0 0 20px rgba(218,124,54,0.08);
  }

  .alo-nav-item.active .nav-icon {
    color: #da7c36;
    filter: drop-shadow(0 0 6px rgba(218,124,54,0.6));
  }

  .alo-card {
    background: #0d1f3c;
    border: 1px solid #1a3158;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }

  .alo-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%);
    pointer-events: none;
  }

  .alo-kpi-card {
    background: #0d1f3c;
    border: 1px solid #1a3158;
    border-radius: 16px;
    padding: 22px;
    cursor: default;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .alo-kpi-card:hover {
    border-color: #2a4a78;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  }

  .alo-kpi-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent, #da7c36);
    opacity: 0.4;
    transition: opacity 0.25s;
  }

  .alo-kpi-card:hover::after { opacity: 1; }

  .alo-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 9px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    border: none;
    text-decoration: none;
  }

  .alo-btn-primary {
    background: linear-gradient(135deg, #da7c36, #d15100);
    color: white;
    box-shadow: 0 4px 14px rgba(218,124,54,0.25);
  }

  .alo-btn-primary:hover {
    box-shadow: 0 6px 20px rgba(218,124,54,0.45);
    transform: translateY(-1px);
  }

  .alo-btn-ghost {
    background: transparent;
    color: #7a9cc4;
    border: 1px solid #1a3158;
  }

  .alo-btn-ghost:hover {
    background: #0d1f3c;
    color: #e8f0fe;
    border-color: #2a4a78;
  }

  .alo-btn-danger {
    background: rgba(255,71,87,0.1);
    color: #ff4757;
    border: 1px solid rgba(255,71,87,0.2);
  }

  .alo-btn-danger:hover {
    background: rgba(255,71,87,0.2);
  }

  .alo-btn-success {
    background: rgba(0,229,160,0.1);
    color: #00e5a0;
    border: 1px solid rgba(0,229,160,0.2);
  }

  .alo-btn-success:hover { background: rgba(0,229,160,0.2); }

  .alo-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    font-family: 'DM Mono', monospace;
  }

  .badge-green { background: rgba(0,229,160,0.1); color: #00e5a0; border: 1px solid rgba(0,229,160,0.2); }
  .badge-red { background: rgba(255,71,87,0.1); color: #ff4757; border: 1px solid rgba(255,71,87,0.2); }
  .badge-orange { background: rgba(218,124,54,0.12); color: #fc9759; border: 1px solid rgba(218,124,54,0.25); }
  .badge-blue { background: rgba(74,158,255,0.1); color: #4a9eff; border: 1px solid rgba(74,158,255,0.2); }
  .badge-gold { background: rgba(255,193,7,0.1); color: #ffc107; border: 1px solid rgba(255,193,7,0.2); }
  .badge-purple { background: rgba(180,122,255,0.1); color: #b47aff; border: 1px solid rgba(180,122,255,0.2); }
  .badge-gray { background: rgba(122,156,196,0.08); color: #7a9cc4; border: 1px solid rgba(122,156,196,0.15); }

  .alo-table { width: 100%; border-collapse: collapse; }
  .alo-table thead th {
    background: #070f1e;
    color: #3d5a80;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 13px 18px;
    text-align: left;
    border-bottom: 1px solid #1a3158;
    font-family: 'DM Mono', monospace;
  }
  .alo-table tbody tr {
    border-bottom: 1px solid rgba(26,49,88,0.5);
    transition: background 0.15s;
  }
  .alo-table tbody tr:hover { background: rgba(13,31,60,0.6); }
  .alo-table tbody tr:last-child { border-bottom: none; }
  .alo-table tbody td { padding: 15px 18px; font-size: 13.5px; color: #e8f0fe; }

  .alo-input {
    background: #070f1e;
    border: 1px solid #1a3158;
    border-radius: 9px;
    padding: 10px 14px;
    font-size: 13.5px;
    color: #e8f0fe;
    font-family: 'Outfit', sans-serif;
    outline: none;
    width: 100%;
    transition: border 0.18s, box-shadow 0.18s;
  }
  .alo-input:focus {
    border-color: #da7c36;
    box-shadow: 0 0 0 3px rgba(218,124,54,0.12);
  }
  .alo-input::placeholder { color: #3d5a80; }

  .alo-select {
    background: #070f1e;
    border: 1px solid #1a3158;
    border-radius: 9px;
    padding: 10px 14px;
    font-size: 13.5px;
    color: #e8f0fe;
    font-family: 'Outfit', sans-serif;
    outline: none;
    cursor: pointer;
    transition: border 0.18s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%233d5a80' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
  .alo-select:focus { border-color: #da7c36; }

  .alo-textarea {
    background: #070f1e;
    border: 1px solid #1a3158;
    border-radius: 9px;
    padding: 10px 14px;
    font-size: 13.5px;
    color: #e8f0fe;
    font-family: 'Outfit', sans-serif;
    outline: none;
    width: 100%;
    resize: vertical;
    transition: border 0.18s;
  }
  .alo-textarea:focus {
    border-color: #da7c36;
    box-shadow: 0 0 0 3px rgba(218,124,54,0.12);
  }

  .page-enter { animation: pageEnter 0.3s cubic-bezier(0.4,0,0.2,1); }
  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pulse-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #00e5a0;
    box-shadow: 0 0 8px #00e5a0;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }

  .glow-orange { filter: drop-shadow(0 0 8px rgba(218,124,54,0.7)); }
  .glow-green { filter: drop-shadow(0 0 8px rgba(0,229,160,0.7)); }

  .slide-panel {
    position: fixed; inset: 0; z-index: 100;
    display: flex; justify-content: flex-end;
    background: rgba(5,13,26,0.8);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .slide-panel-inner {
    width: 480px;
    background: #070f1e;
    border-left: 1px solid #1a3158;
    height: 100vh;
    overflow-y: auto;
    animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .stat-ring {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    position: relative;
  }

  .progress-bar {
    height: 5px; border-radius: 5px;
    background: #1a3158;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 5px;
    background: linear-gradient(90deg, #074079, #da7c36);
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  .toggle-switch {
    width: 42px; height: 23px; border-radius: 12px;
    cursor: pointer; position: relative;
    transition: background 0.2s;
    border: none;
    flex-shrink: 0;
  }
  .toggle-knob {
    width: 17px; height: 17px; border-radius: 50%; background: white;
    position: absolute; top: 3px;
    transition: left 0.2s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  }

  .tab-nav {
    display: flex; gap: 2px;
    background: #070f1e;
    border-radius: 10px;
    padding: 4px;
    border: 1px solid #1a3158;
  }

  .tab-item {
    padding: 8px 18px; border-radius: 7px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: all 0.18s; border: none;
    font-family: 'Outfit', sans-serif;
    white-space: nowrap;
  }

  .tab-item.active {
    background: #0d1f3c;
    color: #fc9759;
    border: 1px solid rgba(218,124,54,0.25);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .tab-item:not(.active) {
    background: transparent;
    color: #3d5a80;
  }

  .tab-item:not(.active):hover { color: #7a9cc4; }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #e8f0fe;
    letter-spacing: -0.3px;
  }

  .section-sub {
    font-size: 13px;
    color: #3d5a80;
    margin-top: 3px;
  }

  .metric-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #3d5a80;
  }

  .metric-value {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: #e8f0fe;
  }

  .divider { height: 1px; background: #1a3158; }

  .nav-badge {
    background: #da7c36;
    color: white;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    font-family: 'DM Mono', monospace;
    min-width: 18px;
    text-align: center;
    margin-left: auto;
  }

  .avatar {
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    background: linear-gradient(135deg, #074079, #da7c36);
  }

  .topbar-action {
    width: 38px; height: 38px; border-radius: 9px;
    border: 1px solid #1a3158;
    background: #070f1e;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #3d5a80;
    transition: all 0.18s;
  }
  .topbar-action:hover { border-color: #2a4a78; color: #7a9cc4; }

  .chart-tooltip {
    background: #0d1f3c !important;
    border: 1px solid #1a3158 !important;
    border-radius: 10px !important;
    color: #e8f0fe !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 12px !important;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
  }
`;

/* ═══════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════ */
const Icon = ({ name, size = 16, color = "currentColor", style = {} }) => {
  const icons = {
    dashboard: <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' />,
    users: (
      <>
        <path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' />
      </>
    ),
    graduation: (
      <path d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' />
    ),
    book: (
      <path d='M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z' />
    ),
    bag: (
      <path d='M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z' />
    ),
    dollar: (
      <path d='M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' />
    ),
    trending: <path d='M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' />,
    star: (
      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
    ),
    award: (
      <>
        <circle
          cx='12'
          cy='8'
          r='7'
        />
        <path d='M8.21 13.89L7 23l5-3 5 3-1.21-9.12' />
      </>
    ),
    tag: (
      <path d='M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z' />
    ),
    check: <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />,
    globe: (
      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
    ),
    bar: <path d='M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z' />,
    bell: (
      <path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' />
    ),
    shield: (
      <path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' />
    ),
    settings: (
      <path d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' />
    ),
    gamepad: (
      <path d='M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z' />
    ),
    logout: (
      <path d='M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z' />
    ),
    menu: <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />,
    close: (
      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
    ),
    search: (
      <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
    ),
    eye: (
      <>
        <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
      </>
    ),
    plus: <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />,
    edit: (
      <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
    ),
    trash: (
      <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
    ),
    flag: <path d='M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z' />,
    download: <path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' />,
    zap: <path d='M7 2v11h3v9l7-12h-4l4-8z' />,
    arrowUp: <path d='M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z' />,
    arrowDown: <path d='M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z' />,
    chevronRight: <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />,
    refresh: (
      <path d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' />
    ),
    lock: (
      <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
    ),
    trophy: (
      <path d='M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.86 10.4 5 9.3 5 8zm14 0c0 1.3-.86 2.4-2 2.82V7h2v1z' />
    ),
    fire: (
      <path d='M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z' />
    ),
    creditcard: (
      <path d='M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' />
    ),
    mail: (
      <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
    ),
    phone: (
      <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
    ),
    home: <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />,
    archive: (
      <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z' />
    ),
  };
  return (
    <svg
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill={color}
      style={style}
    >
      {icons[name] || null}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const monthlyRevenue = [
  { m: "Aug", rev: 42000, enr: 380, platform: 12600 },
  { m: "Sep", rev: 56000, enr: 450, platform: 16800 },
  { m: "Oct", rev: 49000, enr: 410, platform: 14700 },
  { m: "Nov", rev: 67000, enr: 530, platform: 20100 },
  { m: "Dec", rev: 82000, enr: 620, platform: 24600 },
  { m: "Jan", rev: 71000, enr: 580, platform: 21300 },
  { m: "Feb", rev: 95000, enr: 710, platform: 28500 },
];

const categoryData = [
  { cat: "Dev", rev: 38000 },
  { cat: "Design", rev: 24000 },
  { cat: "Business", rev: 19000 },
  { cat: "Marketing", rev: 14000 },
  { cat: "Data", rev: 27000 },
];

const STUDENTS = [
  {
    id: 1,
    name: "Fatima Al-Hassan",
    email: "fatima@email.com",
    phone: "+971 50-000-0001",
    courses: 15,
    spend: "$890",
    pct: 98,
    badge: "Platinum",
    status: "Active",
    joined: "Sep 2023",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91 98000-00001",
    courses: 12,
    spend: "$680",
    pct: 95,
    badge: "Platinum",
    status: "Active",
    joined: "Nov 2023",
  },
  {
    id: 3,
    name: "Aisha Rahman",
    email: "aisha@email.com",
    phone: "+880 1700-000001",
    courses: 8,
    spend: "$340",
    pct: 82,
    badge: "Gold",
    status: "Active",
    joined: "Jan 2024",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    email: "yuki@email.com",
    phone: "+81 90-0000-0001",
    courses: 6,
    spend: "$210",
    pct: 74,
    badge: "Gold",
    status: "Active",
    joined: "Feb 2024",
  },
  {
    id: 5,
    name: "Carlos Mendez",
    email: "carlos@email.com",
    phone: "+1 555-000102",
    courses: 3,
    spend: "$120",
    pct: 45,
    badge: "None",
    status: "Active",
    joined: "Mar 2024",
  },
  {
    id: 6,
    name: "Tom Bradley",
    email: "tom@email.com",
    phone: "+44 7700-000001",
    courses: 1,
    spend: "$29",
    pct: 10,
    badge: "None",
    status: "Suspended",
    joined: "Jun 2024",
  },
];

const INSTRUCTORS = [
  {
    id: 1,
    name: "James Carter",
    email: "james@email.com",
    courses: 14,
    students: 3420,
    revenue: 68400,
    rating: 4.9,
    commission: 30,
    badge: "Platinum",
    status: "Approved",
    kyc: "Verified",
    pending: 2400,
  },
  {
    id: 2,
    name: "Sofia Lin",
    email: "sofia@email.com",
    courses: 9,
    students: 2100,
    revenue: 42000,
    rating: 4.8,
    commission: 30,
    badge: "Gold",
    status: "Approved",
    kyc: "Verified",
    pending: 1100,
  },
  {
    id: 3,
    name: "Ravi Patel",
    email: "ravi@email.com",
    courses: 7,
    students: 1800,
    revenue: 31500,
    rating: 4.7,
    commission: 25,
    badge: "Gold",
    status: "Approved",
    kyc: "Verified",
    pending: 0,
  },
  {
    id: 4,
    name: "Emma Walsh",
    email: "emma@email.com",
    courses: 5,
    students: 980,
    revenue: 16200,
    rating: 4.6,
    commission: 30,
    badge: "None",
    status: "Pending",
    kyc: "Pending",
    pending: 0,
  },
  {
    id: 5,
    name: "Omar Sheikh",
    email: "omar@email.com",
    courses: 2,
    students: 340,
    revenue: 4800,
    rating: 4.2,
    commission: 30,
    badge: "None",
    status: "Pending",
    kyc: "Pending",
    pending: 0,
  },
];

const COURSES = [
  {
    id: 1,
    title: "Full-Stack Web Dev Bootcamp",
    instructor: "James Carter",
    cat: "Development",
    status: "Approved",
    enr: 1240,
    rev: 24800,
    rating: 4.9,
    pct: 74,
    price: 29,
    featured: true,
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Sofia Lin",
    cat: "Design",
    status: "Approved",
    enr: 980,
    rev: 18600,
    rating: 4.8,
    pct: 68,
    price: 24,
    featured: false,
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Ravi Patel",
    cat: "Data",
    status: "Approved",
    enr: 870,
    rev: 15400,
    rating: 4.7,
    pct: 81,
    price: 19,
    featured: true,
  },
  {
    id: 4,
    title: "Digital Marketing Pro",
    instructor: "Emma Walsh",
    cat: "Marketing",
    status: "Pending",
    enr: 0,
    rev: 0,
    rating: 0,
    pct: 0,
    price: 34,
    featured: false,
  },
  {
    id: 5,
    title: "React Native for Beginners",
    instructor: "James Carter",
    cat: "Development",
    status: "Draft",
    enr: 0,
    rev: 0,
    rating: 0,
    pct: 0,
    price: 22,
    featured: false,
  },
  {
    id: 6,
    title: "Financial Modeling Excel",
    instructor: "Omar Sheikh",
    cat: "Business",
    status: "Rejected",
    enr: 0,
    rev: 0,
    rating: 0,
    pct: 0,
    price: 29,
    featured: false,
  },
];

const BOOKS = [
  {
    id: 1,
    title: "CSS Grid in Practice",
    author: "Sofia Lin",
    type: "Digital",
    price: 14,
    sales: 340,
    rev: 4760,
    stock: null,
    status: "Approved",
  },
  {
    id: 2,
    title: "Python Cheat Sheet Pro",
    author: "Ravi Patel",
    type: "Digital",
    price: 9,
    sales: 820,
    rev: 7380,
    stock: null,
    status: "Approved",
  },
  {
    id: 3,
    title: "The UX Playbook",
    author: "Sofia Lin",
    type: "Physical",
    price: 29,
    sales: 145,
    rev: 4205,
    stock: 48,
    status: "Approved",
  },
  {
    id: 4,
    title: "Marketing Fundamentals",
    author: "Emma Walsh",
    type: "Physical",
    price: 24,
    sales: 0,
    rev: 0,
    stock: 100,
    status: "Pending",
  },
];

const COUPONS = [
  {
    code: "SUMMER30",
    type: "Percentage",
    value: "30%",
    used: 142,
    limit: 500,
    expires: "Mar 31, 2025",
    scope: "Global",
    status: "Active",
  },
  {
    code: "JAMES10",
    type: "Percentage",
    value: "10%",
    used: 28,
    limit: 100,
    expires: "Feb 28, 2025",
    scope: "Instructor",
    status: "Active",
  },
  {
    code: "FLAT20",
    type: "Flat",
    value: "$20",
    used: 500,
    limit: 500,
    expires: "Jan 31, 2025",
    scope: "Global",
    status: "Expired",
  },
  {
    code: "WELCOME15",
    type: "Percentage",
    value: "15%",
    used: 89,
    limit: null,
    expires: "Dec 31, 2025",
    scope: "Global",
    status: "Active",
  },
];

const APPROVALS = [
  {
    id: "APR-001",
    type: "New Course",
    title: "Advanced React Patterns",
    by: "James Carter",
    date: "Feb 19, 2025",
    priority: "Normal",
  },
  {
    id: "APR-002",
    type: "New Instructor",
    title: "Prof. Amara Nwosu",
    by: "Self-registration",
    date: "Feb 18, 2025",
    priority: "High",
  },
  {
    id: "APR-003",
    type: "Book Approval",
    title: "CSS Grid in Practice v2",
    by: "Sofia Lin",
    date: "Feb 17, 2025",
    priority: "Normal",
  },
  {
    id: "APR-004",
    type: "Instructor KYC",
    title: "Ravi Patel — ID Verification",
    by: "System",
    date: "Feb 16, 2025",
    priority: "High",
  },
  {
    id: "APR-005",
    type: "Course Update",
    title: "Full-Stack Bootcamp v2.0",
    by: "James Carter",
    date: "Feb 15, 2025",
    priority: "Normal",
  },
];

const REVIEWS = [
  {
    id: 1,
    student: "Priya Sharma",
    course: "Full-Stack Bootcamp",
    rating: 5,
    comment: "Absolutely life-changing course. Best investment I've made in my education.",
    date: "Feb 18",
    reported: false,
  },
  {
    id: 2,
    student: "Carlos Mendez",
    course: "UI/UX Design Masterclass",
    rating: 4,
    comment: "Great content, some sections could use more depth but overall excellent.",
    date: "Feb 17",
    reported: false,
  },
  {
    id: 3,
    student: "spammer_bot",
    course: "Python for Data Science",
    rating: 1,
    comment: "SPAM! CLICK HERE!! BUY DISCOUNT AT XYZ.COM!!",
    date: "Feb 16",
    reported: true,
  },
  {
    id: 4,
    student: "Yuki Tanaka",
    course: "Digital Marketing Pro",
    rating: 5,
    comment: "Comprehensive and well-structured. Highly recommended for anyone starting out.",
    date: "Feb 15",
    reported: false,
  },
];

const PAYOUTS = [
  {
    id: "PAY-001",
    instructor: "James Carter",
    amount: 2400,
    method: "Bank Transfer",
    date: "Feb 18, 2025",
    status: "Pending",
  },
  {
    id: "PAY-002",
    instructor: "Sofia Lin",
    amount: 1100,
    method: "PayPal",
    date: "Feb 16, 2025",
    status: "Pending",
  },
  {
    id: "PAY-003",
    instructor: "Ravi Patel",
    amount: 3200,
    method: "Bank Transfer",
    date: "Feb 14, 2025",
    status: "Approved",
  },
];

const REFUNDS = [
  {
    id: "REF-001",
    student: "Tom Bradley",
    course: "React Native Basics",
    amount: 22,
    reason: "Content quality",
    date: "Feb 17, 2025",
    flagged: false,
  },
  {
    id: "REF-002",
    student: "Carlos Mendez",
    course: "Digital Marketing Pro",
    amount: 34,
    reason: "Wrong course",
    date: "Feb 15, 2025",
    flagged: false,
  },
  {
    id: "REF-003",
    student: "Unknown User",
    course: "Full-Stack Bootcamp",
    amount: 290,
    reason: "Dispute — Fraud Detection",
    date: "Feb 12, 2025",
    flagged: true,
  },
];

const TRANSACTIONS = [
  {
    id: "TXN-8821",
    type: "Enrollment",
    desc: "Priya Sharma — Python for Data Science",
    amount: +19,
    date: "Feb 19",
    status: "Success",
  },
  {
    id: "TXN-8820",
    type: "Payout",
    desc: "Ravi Patel — Monthly Payout",
    amount: -3200,
    date: "Feb 19",
    status: "Success",
  },
  {
    id: "TXN-8819",
    type: "Refund",
    desc: "Tom Bradley — React Native Basics",
    amount: -22,
    date: "Feb 18",
    status: "Success",
  },
  {
    id: "TXN-8818",
    type: "Enrollment",
    desc: "Yuki Tanaka — UI/UX Design Masterclass",
    amount: +24,
    date: "Feb 18",
    status: "Success",
  },
  {
    id: "TXN-8817",
    type: "Enrollment",
    desc: "Fatima Al-Hassan — Bootcamp Bundle",
    amount: +290,
    date: "Feb 17",
    status: "Flagged",
  },
];

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */
const Avatar = ({ name, size = 36, gradient = "135deg, #074079, #da7c36" }) => (
  <div
    className='avatar'
    style={{
      width: size,
      height: size,
      fontSize: size * 0.35,
      background: `linear-gradient(${gradient})`,
    }}
  >
    {name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </div>
);

const Badge = ({ children, variant = "gray" }) => (
  <span className={`alo-badge badge-${variant}`}>{children}</span>
);

const Toggle = ({ on }) => (
  <div
    className='toggle-switch'
    style={{ background: on ? "#da7c36" : "#1a3158" }}
  >
    <div
      className='toggle-knob'
      style={{ left: on ? 22 : 3 }}
    />
  </div>
);

const ProgressBar = ({ value, color }) => (
  <div
    className='progress-bar'
    style={{ flex: 1 }}
  >
    <div
      className='progress-fill'
      style={{
        width: `${value}%`,
        background: color || "linear-gradient(90deg, #074079, #da7c36)",
      }}
    />
  </div>
);

const KpiCard = ({ label, value, sub, icon, accentColor = "#da7c36", trend, trendUp }) => (
  <div
    className='alo-kpi-card'
    style={{ "--accent": accentColor }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
      }}
    >
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
        <Icon
          name={icon}
          size={19}
          color={accentColor}
        />
      </div>
      {trend && (
        <span
          className='alo-badge'
          style={{
            background: trendUp ? "rgba(0,229,160,0.08)" : "rgba(255,71,87,0.08)",
            color: trendUp ? "#00e5a0" : "#ff4757",
            border: `1px solid ${trendUp ? "rgba(0,229,160,0.2)" : "rgba(255,71,87,0.2)"}`,
          }}
        >
          <Icon
            name={trendUp ? "arrowUp" : "arrowDown"}
            size={10}
            color={trendUp ? "#00e5a0" : "#ff4757"}
          />
          {trend}
        </span>
      )}
    </div>
    <div
      className='metric-value'
      style={{ fontSize: 26, marginBottom: 2 }}
    >
      {value}
    </div>
    <div className='metric-label'>{label}</div>
    {sub && <div style={{ fontSize: 12, color: "#3d5a80", marginTop: 6 }}>{sub}</div>}
  </div>
);

const SectionHeader = ({ title, sub, action }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 24,
    }}
  >
    <div>
      <h1 className='section-title'>{title}</h1>
      {sub && <div className='section-sub'>{sub}</div>}
    </div>
    {action}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d1f3c",
        border: "1px solid #1a3158",
        borderRadius: 10,
        padding: "10px 14px",
      }}
    >
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
        <div
          key={i}
          style={{ color: p.color, fontSize: 13, fontWeight: 600 }}
        >
          {p.name}:{" "}
          {typeof p.value === "number" && p.value > 999 ? `$${p.value.toLocaleString()}` : p.value}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════ */
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "students", label: "Students", icon: "users", badge: 12 },
  { id: "instructors", label: "Instructors", icon: "graduation", badge: 2 },
  { id: "courses", label: "Courses", icon: "book" },
  { id: "books", label: "Books & Products", icon: "bag" },
  { id: "financial", label: "Financial", icon: "dollar" },
  { id: "reviews", label: "Reviews", icon: "star", badge: 7 },
  { id: "badges", label: "Badges & Ranking", icon: "award" },
  { id: "coupons", label: "Coupons", icon: "tag" },
  { id: "approvals", label: "Approvals", icon: "check", badge: 5 },
  { id: "cms", label: "CMS / Content", icon: "globe" },
  { id: "analytics", label: "Analytics", icon: "bar" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "gamification", label: "Gamification", icon: "gamepad" },
];

const Sidebar = ({ active, onNav, collapsed, setCollapsed }) => (
  <aside className={`alo-sidebar${collapsed ? " collapsed" : ""}`}>
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
        <Icon
          name='zap'
          size={18}
          color='white'
        />
      </div>
      {!collapsed && (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: "#e8f0fe",
              letterSpacing: "-0.3px",
            }}
          >
            AloSkill
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#3d5a80",
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            Admin Panel
          </div>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
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
        <Icon
          name='menu'
          size={16}
          color='#3d5a80'
        />
      </button>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
      {NAV.map(item => (
        <div
          key={item.id}
          className={`alo-nav-item${active === item.id ? " active" : ""}`}
          onClick={() => onNav(item.id)}
          title={collapsed ? item.label : undefined}
          style={{ justifyContent: collapsed ? "center" : "flex-start", marginBottom: 2 }}
        >
          <span
            className='nav-icon'
            style={{ flexShrink: 0, display: "flex" }}
          >
            <Icon
              name={item.icon}
              size={17}
              color={active === item.id ? "#da7c36" : "#3d5a80"}
            />
          </span>
          {!collapsed && (
            <>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span className='nav-badge'>{item.badge}</span>}
            </>
          )}
          {collapsed && item.badge && (
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
      ))}
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
        {!collapsed && (
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
              <div style={{ fontSize: 10, color: "#3d5a80", fontFamily: "'DM Mono', monospace" }}>
                FULL ACCESS
              </div>
            </div>
            <Icon
              name='logout'
              size={15}
              color='#3d5a80'
              style={{ cursor: "pointer", flexShrink: 0 }}
            />
          </>
        )}
      </div>
    </div>
  </aside>
);

/* ═══════════════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════════════ */
const Topbar = ({ page }) => {
  const labels = {
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
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#3d5a80", fontSize: 13 }}>AloSkill</span>
        <Icon
          name='chevronRight'
          size={14}
          color='#3d5a80'
        />
        <span style={{ color: "#e8f0fe", fontSize: 13, fontWeight: 600 }}>{labels[page]}</span>
      </div>

      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 16 }}>
        <div className='pulse-dot' />
        <span style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono', monospace" }}>
          LIVE
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ position: "relative", width: 240 }}>
        <Icon
          name='search'
          size={14}
          color='#3d5a80'
          style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          className='alo-input'
          placeholder='Quick search...'
          style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <div
          className='topbar-action'
          style={{ position: "relative" }}
        >
          <Icon
            name='bell'
            size={16}
          />
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
        <div className='topbar-action'>
          <Icon
            name='settings'
            size={16}
          />
        </div>
        <div style={{ width: 1, background: "#1a3158", height: 28, alignSelf: "center" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Avatar
            name='Super Admin'
            size={32}
            gradient='135deg, #da7c36, #d15100'
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e8f0fe", lineHeight: 1.2 }}>
              Super Admin
            </div>
            <div style={{ fontSize: 10, color: "#3d5a80", fontFamily: "'DM Mono', monospace" }}>
              OWNER
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: DASHBOARD
═══════════════════════════════════════════════════════ */
const Dashboard = () => {
  const kpis = [
    {
      label: "Total Students",
      value: "14,820",
      trend: "+12.4%",
      trendUp: true,
      icon: "users",
      accentColor: "#4a9eff",
    },
    {
      label: "Total Instructors",
      value: "348",
      trend: "+5.2%",
      trendUp: true,
      icon: "graduation",
      accentColor: "#00e5a0",
    },
    {
      label: "Total Courses",
      value: "1,204",
      trend: "+8.1%",
      trendUp: true,
      icon: "book",
      accentColor: "#da7c36",
    },
    {
      label: "Total Revenue",
      value: "$462,800",
      trend: "+22.3%",
      trendUp: true,
      icon: "dollar",
      accentColor: "#b47aff",
    },
    {
      label: "Total Orders",
      value: "28,540",
      trend: "+18.6%",
      trendUp: true,
      icon: "bag",
      accentColor: "#ffc107",
    },
    {
      label: "Refund Rate",
      value: "2.1%",
      trend: "-0.4%",
      trendUp: true,
      icon: "refresh",
      accentColor: "#ff4757",
    },
  ];

  const topCourses = [
    {
      name: "Full-Stack Web Dev Bootcamp",
      instructor: "James Carter",
      enr: 1240,
      rev: "$24,800",
      rating: 4.9,
    },
    {
      name: "UI/UX Design Masterclass",
      instructor: "Sofia Lin",
      enr: 980,
      rev: "$18,600",
      rating: 4.8,
    },
    {
      name: "Python for Data Science",
      instructor: "Ravi Patel",
      enr: 870,
      rev: "$15,400",
      rating: 4.7,
    },
    {
      name: "Digital Marketing Pro",
      instructor: "Emma Walsh",
      enr: 760,
      rev: "$12,200",
      rating: 4.6,
    },
  ];

  const pieData = [
    { name: "Courses", value: 72 },
    { name: "Books", value: 28 },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Platform Overview'
        sub='Real-time KPIs and performance metrics'
      />

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {kpis.map(k => (
          <KpiCard
            key={k.label}
            {...k}
          />
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Area chart */}
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#e8f0fe",
                }}
              >
                Revenue & Enrollment Trends
              </div>
              <div
                className='metric-label'
                style={{ marginTop: 3 }}
              >
                Last 7 months
              </div>
            </div>
            <select
              className='alo-select'
              style={{ width: "auto", fontSize: 12, padding: "6px 28px 6px 10px" }}
            >
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer
            width='100%'
            height={220}
          >
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient
                  id='g1'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='#4a9eff'
                    stopOpacity={0.25}
                  />
                  <stop
                    offset='100%'
                    stopColor='#4a9eff'
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id='g2'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='0%'
                    stopColor='#da7c36'
                    stopOpacity={0.25}
                  />
                  <stop
                    offset='100%'
                    stopColor='#da7c36'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#1a3158'
              />
              <XAxis
                dataKey='m'
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono', monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono', monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type='monotone'
                dataKey='rev'
                stroke='#4a9eff'
                strokeWidth={2}
                fill='url(#g1)'
                name='Revenue'
              />
              <Area
                type='monotone'
                dataKey='enr'
                stroke='#da7c36'
                strokeWidth={2}
                fill='url(#g2)'
                name='Enrollments'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie + KPIs */}
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 4,
            }}
          >
            Revenue Split
          </div>
          <div
            className='metric-label'
            style={{ marginBottom: 16 }}
          >
            Courses vs Books
          </div>
          <ResponsiveContainer
            width='100%'
            height={140}
          >
            <PieChart>
              <Pie
                data={pieData}
                cx='50%'
                cy='50%'
                innerRadius={42}
                outerRadius={65}
                paddingAngle={4}
                dataKey='value'
              >
                <Cell fill='#4a9eff' />
                <Cell fill='#da7c36' />
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0d1f3c",
                  border: "1px solid #1a3158",
                  borderRadius: 8,
                  color: "#e8f0fe",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div
                key={d.name}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: i === 0 ? "#4a9eff" : "#da7c36",
                  }}
                />
                <span style={{ fontSize: 12, color: "#7a9cc4" }}>
                  {d.name} <strong style={{ color: "#e8f0fe" }}>{d.value}%</strong>
                </span>
              </div>
            ))}
          </div>
          <div
            className='divider'
            style={{ margin: "16px 0" }}
          />
          {[
            { l: "Platform Rating", v: "4.8 ⭐" },
            { l: "Completion Rate", v: "68.4%" },
            { l: "Conversion Rate", v: "11.7%" },
          ].map(x => (
            <div
              key={x.l}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}
            >
              <span className='metric-label'>{x.l}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#e8f0fe" }}>{x.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 4,
            }}
          >
            Revenue by Category
          </div>
          <div
            className='metric-label'
            style={{ marginBottom: 20 }}
          >
            This month
          </div>
          <ResponsiveContainer
            width='100%'
            height={180}
          >
            <BarChart
              data={categoryData}
              barSize={28}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#1a3158'
              />
              <XAxis
                dataKey='cat'
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono', monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono', monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey='rev'
                fill='#da7c36'
                radius={[5, 5, 0, 0]}
                name='Revenue'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Courses mini */}
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Top Performing Courses
          </div>
          {topCourses.map((c, i) => (
            <div
              key={c.name}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  color: "#3d5a80",
                  width: 16,
                  textAlign: "right",
                }}
              >
                0{i + 1}
              </div>
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
                  {c.name}
                </div>
                <div style={{ fontSize: 11, color: "#3d5a80" }}>{c.instructor}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#00e5a0" }}>{c.rev}</div>
                <div style={{ fontSize: 11, color: "#3d5a80" }}>⭐ {c.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: STUDENTS
═══════════════════════════════════════════════════════ */
const Students = () => {
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState(null);
  const [filter, setFilter] = useState("all");

  const badgeVariant = { Platinum: "purple", Gold: "gold", None: "gray" };
  const filtered = STUDENTS.filter(s => {
    const m =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    if (filter === "active") return m && s.status === "Active";
    if (filter === "suspended") return m && s.status === "Suspended";
    return m;
  });

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Student Management'
        sub={`${STUDENTS.length} registered students`}
        action={
          <button className='alo-btn alo-btn-primary'>
            <Icon
              name='plus'
              size={14}
              color='white'
            />
            Add Student
          </button>
        }
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
          <Icon
            name='search'
            size={14}
            color='#3d5a80'
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className='alo-input'
            placeholder='Search students...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>
        <div className='tab-nav'>
          {["all", "active", "suspended"].map(f => (
            <button
              key={f}
              className={`tab-item${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <select
          className='alo-select'
          style={{ width: "auto" }}
        >
          <option>Sort: Enrollments</option>
          <option>Sort: Spend</option>
          <option>Sort: Completion</option>
        </select>
      </div>

      <div className='alo-card'>
        <div style={{ overflowX: "auto" }}>
          <table className='alo-table'>
            <thead>
              <tr>
                <th>Student</th>
                <th>Phone</th>
                <th>Courses</th>
                <th>Spend</th>
                <th>Completion</th>
                <th>Badge</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar
                        name={s.name}
                        size={34}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: "#3d5a80" }}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{ color: "#7a9cc4", fontSize: 12, fontFamily: "'DM Mono', monospace" }}
                  >
                    {s.phone}
                  </td>
                  <td>
                    <Badge variant='blue'>{s.courses}</Badge>
                  </td>
                  <td
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 600,
                      color: "#00e5a0",
                    }}
                  >
                    {s.spend}
                  </td>
                  <td>
                    <div style={{ display: "flex", align: "center", gap: 8, width: 120 }}>
                      <ProgressBar value={s.pct} />
                      <span
                        style={{
                          fontSize: 11,
                          color: "#7a9cc4",
                          fontFamily: "'DM Mono', monospace",
                          minWidth: 28,
                        }}
                      >
                        {s.pct}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={badgeVariant[s.badge]}>{s.badge}</Badge>
                  </td>
                  <td>
                    <Badge variant={s.status === "Active" ? "green" : "red"}>{s.status}</Badge>
                  </td>
                  <td
                    style={{ color: "#3d5a80", fontSize: 12, fontFamily: "'DM Mono', monospace" }}
                  >
                    {s.joined}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className='alo-btn alo-btn-ghost'
                        style={{ padding: "5px 10px" }}
                        onClick={() => setPanel(s)}
                      >
                        <Icon
                          name='eye'
                          size={13}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: "14px 18px",
            borderTop: "1px solid #1a3158",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "#3d5a80", fontFamily: "'DM Mono', monospace" }}>
            Showing {filtered.length} of {STUDENTS.length}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map(p => (
              <button
                key={p}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  border: "1px solid #1a3158",
                  background: p === 1 ? "#da7c36" : "#0d1f3c",
                  color: p === 1 ? "white" : "#7a9cc4",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Panel */}
      {panel && (
        <div
          className='slide-panel'
          onClick={() => setPanel(null)}
        >
          <div
            className='slide-panel-inner'
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #1a3158",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#e8f0fe",
                }}
              >
                Student Profile
              </div>
              <button
                onClick={() => setPanel(null)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <Icon
                  name='close'
                  size={18}
                  color='#3d5a80'
                />
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                <Avatar
                  name={panel.name}
                  size={56}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#e8f0fe",
                    }}
                  >
                    {panel.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#3d5a80" }}>{panel.email}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <Badge variant={panel.status === "Active" ? "green" : "red"}>
                      {panel.status}
                    </Badge>
                    <Badge variant={badgeVariant[panel.badge]}>{panel.badge}</Badge>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {[
                  { l: "Courses", v: panel.courses },
                  { l: "Total Spend", v: panel.spend },
                  { l: "Completion", v: `${panel.pct}%` },
                ].map(s => (
                  <div
                    key={s.l}
                    style={{
                      background: "#0d1f3c",
                      border: "1px solid #1a3158",
                      borderRadius: 10,
                      padding: "14px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#da7c36",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      className='metric-label'
                      style={{ marginTop: 4 }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <div
                  className='metric-label'
                  style={{ marginBottom: 8 }}
                >
                  Completion Progress
                </div>
                <div className='progress-bar'>
                  <div
                    className='progress-fill'
                    style={{ width: `${panel.pct}%` }}
                  />
                </div>
              </div>
              <div
                style={{
                  background: "#0d1f3c",
                  borderRadius: 12,
                  border: "1px solid #1a3158",
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  ["Phone", panel.phone],
                  ["Joined", panel.joined],
                  ["Badge", panel.badge],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #1a3158",
                    }}
                  >
                    <span className='metric-label'>{k}</span>
                    <span style={{ fontSize: 13, color: "#e8f0fe", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <button
                  className='alo-btn alo-btn-primary'
                  style={{ justifyContent: "center" }}
                >
                  Manual Enroll
                </button>
                <button
                  className='alo-btn alo-btn-ghost'
                  style={{ justifyContent: "center" }}
                >
                  Assign Badge
                </button>
                <button
                  className='alo-btn alo-btn-danger'
                  style={{ justifyContent: "center" }}
                >
                  {panel.status === "Active" ? "Suspend Account" : "Activate Account"}
                </button>
                <button
                  className='alo-btn alo-btn-ghost'
                  style={{ justifyContent: "center" }}
                >
                  Trigger Refund
                </button>
              </div>
              <div>
                <div
                  className='metric-label'
                  style={{ marginBottom: 8 }}
                >
                  Admin Note (Private)
                </div>
                <textarea
                  className='alo-textarea'
                  rows={3}
                  placeholder='Add internal note...'
                />
                <button
                  className='alo-btn alo-btn-primary'
                  style={{ marginTop: 8 }}
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: INSTRUCTORS
═══════════════════════════════════════════════════════ */
const Instructors = () => {
  const [panel, setPanel] = useState(null);
  const [comm, setComm] = useState(30);
  const badgeV = { Platinum: "purple", Gold: "gold", None: "gray" };

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Instructor Management'
        sub={`${INSTRUCTORS.length} instructors · ${INSTRUCTORS.filter(i => i.status === "Pending").length} pending`}
      />

      <div className='alo-card'>
        <div style={{ overflowX: "auto" }}>
          <table className='alo-table'>
            <thead>
              <tr>
                <th>Instructor</th>
                <th>Courses</th>
                <th>Students</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Commission</th>
                <th>Badge</th>
                <th>KYC</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {INSTRUCTORS.map(inst => (
                <tr key={inst.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar
                        name={inst.name}
                        size={34}
                        gradient='135deg, #da7c36, #d15100'
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{inst.name}</div>
                        <div style={{ fontSize: 12, color: "#3d5a80" }}>{inst.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant='blue'>{inst.courses}</Badge>
                  </td>
                  <td style={{ color: "#7a9cc4", fontFamily: "'DM Mono', monospace" }}>
                    {inst.students.toLocaleString()}
                  </td>
                  <td
                    style={{
                      fontWeight: 600,
                      color: "#00e5a0",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    ${inst.revenue.toLocaleString()}
                  </td>
                  <td>
                    <Badge variant='gold'>⭐ {inst.rating}</Badge>
                  </td>
                  <td>
                    <Badge variant='orange'>{inst.commission}%</Badge>
                  </td>
                  <td>
                    <Badge variant={badgeV[inst.badge]}>{inst.badge}</Badge>
                  </td>
                  <td>
                    <Badge variant={inst.kyc === "Verified" ? "green" : "gray"}>{inst.kyc}</Badge>
                  </td>
                  <td>
                    <Badge variant={inst.status === "Approved" ? "green" : "orange"}>
                      {inst.status}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className='alo-btn alo-btn-ghost'
                        style={{ padding: "5px 10px" }}
                        onClick={() => {
                          setPanel(inst);
                          setComm(inst.commission);
                        }}
                      >
                        <Icon
                          name='eye'
                          size={13}
                        />
                      </button>
                      {inst.status === "Pending" && (
                        <>
                          <button
                            className='alo-btn alo-btn-success'
                            style={{ padding: "5px 10px" }}
                          >
                            ✓
                          </button>
                          <button
                            className='alo-btn alo-btn-danger'
                            style={{ padding: "5px 10px" }}
                          >
                            ✗
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {panel && (
        <div
          className='slide-panel'
          onClick={() => setPanel(null)}
        >
          <div
            className='slide-panel-inner'
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #1a3158",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#e8f0fe",
                }}
              >
                Instructor Profile
              </div>
              <button
                onClick={() => setPanel(null)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <Icon
                  name='close'
                  size={18}
                  color='#3d5a80'
                />
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                <Avatar
                  name={panel.name}
                  size={56}
                  gradient='135deg, #da7c36, #d15100'
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#e8f0fe",
                    }}
                  >
                    {panel.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#3d5a80" }}>{panel.email}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <Badge variant={panel.status === "Approved" ? "green" : "orange"}>
                      {panel.status}
                    </Badge>
                    <Badge variant={badgeV[panel.badge]}>{panel.badge}</Badge>
                    <Badge variant={panel.kyc === "Verified" ? "blue" : "gray"}>
                      KYC: {panel.kyc}
                    </Badge>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                {[
                  { l: "Courses", v: panel.courses },
                  { l: "Students", v: panel.students.toLocaleString() },
                  { l: "Revenue", v: `$${panel.revenue.toLocaleString()}` },
                  { l: "Rating", v: `⭐ ${panel.rating}` },
                ].map(s => (
                  <div
                    key={s.l}
                    style={{
                      background: "#0d1f3c",
                      border: "1px solid #1a3158",
                      borderRadius: 10,
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#da7c36",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      className='metric-label'
                      style={{ marginTop: 3 }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              {/* Commission setter */}
              <div
                style={{
                  background: "rgba(218,124,54,0.08)",
                  border: "1px solid rgba(218,124,54,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fc9759", marginBottom: 12 }}>
                  Set Commission Rate
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    className='alo-input'
                    type='number'
                    value={comm}
                    onChange={e => setComm(Number(e.target.value))}
                    style={{ maxWidth: 90 }}
                    min={0}
                    max={100}
                  />
                  <span style={{ color: "#7a9cc4" }}>%</span>
                  <button
                    className='alo-btn alo-btn-primary'
                    style={{ marginLeft: "auto" }}
                  >
                    Update
                  </button>
                </div>
              </div>
              {/* Financial summary */}
              <div
                style={{
                  background: "#0d1f3c",
                  border: "1px solid #1a3158",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  ["Total Revenue", `$${panel.revenue.toLocaleString()}`],
                  ["Platform Commission", `${panel.commission}%`],
                  [
                    "Instructor Earnings",
                    `$${Math.round(panel.revenue * (1 - panel.commission / 100)).toLocaleString()}`,
                  ],
                  ["Pending Payout", `$${panel.pending.toLocaleString()}`],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid #1a3158",
                    }}
                  >
                    <span className='metric-label'>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#e8f0fe" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}
              >
                {panel.status === "Pending" ? (
                  <>
                    <button
                      className='alo-btn alo-btn-success'
                      style={{ justifyContent: "center" }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className='alo-btn alo-btn-danger'
                      style={{ justifyContent: "center" }}
                    >
                      ✗ Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='alo-btn alo-btn-danger'
                      style={{ justifyContent: "center" }}
                    >
                      Suspend
                    </button>
                    <button
                      className='alo-btn alo-btn-ghost'
                      style={{ justifyContent: "center" }}
                    >
                      Assign Badge
                    </button>
                  </>
                )}
              </div>
              <button
                className='alo-btn alo-btn-success'
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Icon
                  name='dollar'
                  size={13}
                  color='#00e5a0'
                />
                Manual Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: COURSES
═══════════════════════════════════════════════════════ */
const Courses = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const statusV = { Approved: "green", Pending: "orange", Draft: "gray", Rejected: "red" };
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
    <div className='page-enter'>
      <SectionHeader
        title='Course Management'
        sub='Review, approve and curate all courses'
      />
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className='tab-nav'>
          {["all", "approved", "pending", "draft", "rejected"].map(s => (
            <button
              key={s}
              className={`tab-item${statusFilter === s ? " active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
              <span style={{ opacity: 0.6, fontSize: 11 }}>({counts[s]})</span>
            </button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <Icon
            name='search'
            size={14}
            color='#3d5a80'
            style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className='alo-input'
            placeholder='Search courses...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 34, width: 220 }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map(c => (
          <div
            key={c.id}
            className='alo-card'
            style={{ overflow: "hidden" }}
          >
            {/* Card header band */}
            <div
              style={{
                background: "linear-gradient(135deg, #0a1628, #0d1f3c)",
                padding: "16px 20px",
                borderBottom: "1px solid #1a3158",
                position: "relative",
              }}
            >
              {c.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "#da7c36",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderBottomLeftRadius: 8,
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.5px",
                  }}
                >
                  FEATURED
                </div>
              )}
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Badge variant={statusV[c.status]}>{c.status}</Badge>
                <span
                  style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono', monospace" }}
                >
                  {c.cat}
                </span>
              </div>
            </div>
            <div style={{ padding: "18px 20px" }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#e8f0fe",
                  marginBottom: 4,
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </div>
              <div style={{ fontSize: 12, color: "#3d5a80", marginBottom: 16 }}>
                by {c.instructor}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                {[
                  { l: "Students", v: c.enr.toLocaleString() },
                  { l: "Revenue", v: c.rev ? `$${c.rev.toLocaleString()}` : "$0" },
                  { l: "Rating", v: c.rating || "—" },
                  { l: "Price", v: `$${c.price}` },
                ].map(s => (
                  <div
                    key={s.l}
                    style={{ textAlign: "center" }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#e8f0fe",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      className='metric-label'
                      style={{ marginTop: 2 }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              {c.pct > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}
                  >
                    <span className='metric-label'>Completion Rate</span>
                    <span
                      style={{ fontSize: 11, color: "#da7c36", fontFamily: "'DM Mono', monospace" }}
                    >
                      {c.pct}%
                    </span>
                  </div>
                  <ProgressBar value={c.pct} />
                </div>
              )}
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                <button
                  className='alo-btn alo-btn-ghost'
                  style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                >
                  <Icon
                    name='eye'
                    size={12}
                  />
                  View
                </button>
                {c.status === "Pending" && (
                  <>
                    <button
                      className='alo-btn alo-btn-success'
                      style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className='alo-btn alo-btn-danger'
                      style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                    >
                      ✗ Reject
                    </button>
                  </>
                )}
                {c.status === "Approved" && (
                  <>
                    <button
                      className='alo-btn alo-btn-ghost'
                      style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                    >
                      <Icon
                        name='home'
                        size={12}
                      />
                      Feature
                    </button>
                    <button
                      className='alo-btn alo-btn-ghost'
                      style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                    >
                      <Icon
                        name='archive'
                        size={12}
                      />
                      Archive
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
};

/* ═══════════════════════════════════════════════════════
   PAGE: BOOKS
═══════════════════════════════════════════════════════ */
const Books = () => (
  <div className='page-enter'>
    <SectionHeader
      title='Books & Products'
      sub='Manage digital and physical book inventory'
      action={
        <button className='alo-btn alo-btn-primary'>
          <Icon
            name='plus'
            size={14}
            color='white'
          />
          Add Book
        </button>
      }
    />
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}
    >
      {[
        { l: "Total Books", v: "312", color: "#4a9eff" },
        { l: "Digital Sales", v: "1,160", color: "#00e5a0" },
        { l: "Physical Stock", v: "148", color: "#da7c36" },
        { l: "Total Revenue", v: "$12,140", color: "#b47aff" },
      ].map(s => (
        <div
          key={s.l}
          className='alo-kpi-card'
          style={{ "--accent": s.color }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              color: s.color,
              marginBottom: 4,
            }}
          >
            {s.v}
          </div>
          <div className='metric-label'>{s.l}</div>
        </div>
      ))}
    </div>
    <div className='alo-card'>
      <div style={{ overflowX: "auto" }}>
        <table className='alo-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Type</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Revenue</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {BOOKS.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.title}</td>
                <td style={{ color: "#7a9cc4" }}>{b.author}</td>
                <td>
                  <Badge variant={b.type === "Digital" ? "blue" : "orange"}>{b.type}</Badge>
                </td>
                <td style={{ fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>${b.price}</td>
                <td>
                  <Badge variant='gray'>{b.sales}</Badge>
                </td>
                <td
                  style={{ color: "#00e5a0", fontFamily: "'DM Mono',monospace", fontWeight: 600 }}
                >
                  ${b.rev.toLocaleString()}
                </td>
                <td
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    color: b.stock === null ? "#3d5a80" : b.stock < 20 ? "#ff4757" : "#7a9cc4",
                  }}
                >
                  {b.stock === null ? "∞" : b.stock}
                </td>
                <td>
                  <Badge variant={b.status === "Approved" ? "green" : "orange"}>{b.status}</Badge>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className='alo-btn alo-btn-ghost'
                      style={{ padding: "5px 10px", fontSize: 12 }}
                    >
                      Edit
                    </button>
                    {b.status === "Pending" && (
                      <button
                        className='alo-btn alo-btn-success'
                        style={{ padding: "5px 10px", fontSize: 12 }}
                      >
                        Approve
                      </button>
                    )}
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

/* ═══════════════════════════════════════════════════════
   PAGE: FINANCIAL
═══════════════════════════════════════════════════════ */
const Financial = () => {
  const [tab, setTab] = useState("overview");
  const typeV = { Enrollment: "green", Payout: "blue", Refund: "orange" };

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Financial Management'
        sub='Revenue, payouts, refunds and transaction tracking'
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}
      >
        {[
          { l: "Total Revenue", v: "$462,800", color: "#4a9eff", icon: "dollar" },
          { l: "This Month", v: "$95,000", color: "#00e5a0", icon: "trending" },
          { l: "Platform Earnings", v: "$138,840", color: "#da7c36", icon: "zap" },
          { l: "Pending Payouts", v: "$3,500", color: "#ff4757", icon: "refresh" },
        ].map(s => (
          <KpiCard
            key={s.l}
            label={s.l}
            value={s.v}
            icon={s.icon}
            accentColor={s.color}
          />
        ))}
      </div>

      <div
        className='tab-nav'
        style={{ marginBottom: 20, width: "fit-content" }}
      >
        {["overview", "payouts", "refunds", "transactions"].map(t => (
          <button
            key={t}
            className={`tab-item${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 24,
            }}
          >
            Revenue vs Payouts vs Platform
          </div>
          <ResponsiveContainer
            width='100%'
            height={280}
          >
            <BarChart
              data={monthlyRevenue}
              barSize={18}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#1a3158'
              />
              <XAxis
                dataKey='m'
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono',monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#3d5a80", fontFamily: "'DM Mono',monospace" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey='rev'
                fill='#4a9eff'
                radius={[4, 4, 0, 0]}
                name='Total Revenue'
              />
              <Bar
                dataKey='platform'
                fill='#da7c36'
                radius={[4, 4, 0, 0]}
                name='Platform Earnings'
              />
              <Bar
                dataKey='enr'
                fill='#1a3158'
                radius={[4, 4, 0, 0]}
                name='Enrollments'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "payouts" && (
        <div className='alo-card'>
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #1a3158",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
              }}
            >
              Payout Requests
            </div>
            <Badge variant='orange'>
              {PAYOUTS.filter(p => p.status === "Pending").length} Pending
            </Badge>
          </div>
          <table className='alo-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Instructor</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {PAYOUTS.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#3d5a80" }}>
                    {p.id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.instructor}</td>
                  <td
                    style={{ color: "#00e5a0", fontFamily: "'DM Mono',monospace", fontWeight: 600 }}
                  >
                    ${p.amount.toLocaleString()}
                  </td>
                  <td style={{ color: "#7a9cc4", fontSize: 13 }}>{p.method}</td>
                  <td style={{ color: "#3d5a80", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
                    {p.date}
                  </td>
                  <td>
                    <Badge variant={p.status === "Pending" ? "orange" : "green"}>{p.status}</Badge>
                  </td>
                  <td>
                    {p.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          className='alo-btn alo-btn-success'
                          style={{ padding: "5px 12px", fontSize: 12 }}
                        >
                          Approve
                        </button>
                        <button
                          className='alo-btn alo-btn-danger'
                          style={{ padding: "5px 12px", fontSize: 12 }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "refunds" && (
        <div className='alo-card'>
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #1a3158",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
              }}
            >
              Refund Requests
            </div>
            <Badge variant='red'>{REFUNDS.filter(r => r.flagged).length} Flagged</Badge>
          </div>
          <table className='alo-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {REFUNDS.map(r => (
                <tr
                  key={r.id}
                  style={{ background: r.flagged ? "rgba(255,71,87,0.04)" : undefined }}
                >
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#3d5a80" }}>
                    {r.flagged && (
                      <Icon
                        name='flag'
                        size={12}
                        color='#ff4757'
                        style={{ marginRight: 4, display: "inline" }}
                      />
                    )}
                    {r.id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.student}</td>
                  <td style={{ color: "#7a9cc4", fontSize: 13 }}>{r.course}</td>
                  <td
                    style={{ color: "#ff4757", fontFamily: "'DM Mono',monospace", fontWeight: 600 }}
                  >
                    ${r.amount}
                  </td>
                  <td style={{ color: "#7a9cc4", fontSize: 13 }}>{r.reason}</td>
                  <td style={{ color: "#3d5a80", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
                    {r.date}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className='alo-btn alo-btn-success'
                        style={{ padding: "5px 12px", fontSize: 12 }}
                      >
                        Approve
                      </button>
                      <button
                        className='alo-btn alo-btn-danger'
                        style={{ padding: "5px 12px", fontSize: 12 }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "transactions" && (
        <div className='alo-card'>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a3158" }}>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
              }}
            >
              Transaction Log
            </div>
          </div>
          <table className='alo-table'>
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(t => (
                <tr key={t.id}>
                  <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#3d5a80" }}>
                    {t.id}
                  </td>
                  <td>
                    <Badge variant={typeV[t.type]}>{t.type}</Badge>
                  </td>
                  <td style={{ color: "#7a9cc4", fontSize: 13 }}>{t.desc}</td>
                  <td
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontWeight: 700,
                      color: t.amount > 0 ? "#00e5a0" : "#ff4757",
                    }}
                  >
                    {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td style={{ color: "#3d5a80", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
                    {t.date}
                  </td>
                  <td>
                    <Badge variant={t.status === "Success" ? "green" : "red"}>{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: REVIEWS
═══════════════════════════════════════════════════════ */
const Reviews = () => (
  <div className='page-enter'>
    <SectionHeader
      title='Reviews & Ratings'
      sub='Moderate and manage all platform reviews'
    />
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}
    >
      {[
        { l: "Total Reviews", v: "8,420", color: "#4a9eff" },
        { l: "Platform Rating", v: "4.8 ⭐", color: "#ffc107" },
        { l: "Reported", v: "14", color: "#ff4757" },
        { l: "Auto-Flagged", v: "7", color: "#b47aff" },
      ].map(s => (
        <div
          key={s.l}
          className='alo-kpi-card'
          style={{ "--accent": s.color }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              color: s.color,
              marginBottom: 4,
            }}
          >
            {s.v}
          </div>
          <div className='metric-label'>{s.l}</div>
        </div>
      ))}
    </div>
    <div className='alo-card'>
      {REVIEWS.map((r, i) => (
        <div
          key={r.id}
          style={{
            padding: "20px 24px",
            borderBottom: i < REVIEWS.length - 1 ? "1px solid #1a3158" : "none",
            background: r.reported ? "rgba(255,71,87,0.03)" : undefined,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar
                name={r.student}
                size={32}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#e8f0fe" }}>{r.student}</div>
                <div style={{ fontSize: 12, color: "#3d5a80" }}>
                  {r.course} · {r.date}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {r.reported && <Badge variant='red'>🚩 Reported</Badge>}
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <svg
                    key={s}
                    viewBox='0 0 24 24'
                    width={14}
                    height={14}
                    fill={s <= r.rating ? "#ffc107" : "#1a3158"}
                  >
                    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: 13.5,
              color: r.reported ? "#7a9cc4" : "#7a9cc4",
              marginBottom: 14,
              lineHeight: 1.5,
              fontStyle: r.reported ? "italic" : undefined,
            }}
          >
            {r.comment}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className='alo-btn alo-btn-success'
              style={{ fontSize: 12, padding: "5px 14px" }}
            >
              <Icon
                name='check'
                size={12}
                color='#00e5a0'
              />
              Approve
            </button>
            <button
              className='alo-btn alo-btn-danger'
              style={{ fontSize: 12, padding: "5px 14px" }}
            >
              <Icon
                name='trash'
                size={12}
                color='#ff4757'
              />
              Delete
            </button>
            {!r.reported && (
              <button
                className='alo-btn alo-btn-ghost'
                style={{ fontSize: 12, padding: "5px 14px" }}
              >
                <Icon
                  name='flag'
                  size={12}
                />
                Flag
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   PAGE: BADGES
═══════════════════════════════════════════════════════ */
const Badges = () => {
  const radarData = [
    { s: "Rating", v: 90 },
    { s: "Revenue", v: 85 },
    { s: "Completion", v: 72 },
    { s: "Feedback", v: 88 },
    { s: "Activity", v: 78 },
  ];
  const badgeRules = [
    {
      badge: "Gold",
      color: "#ffc107",
      criteria: "Rating ≥ 4.5 · Revenue ≥ $5K · Completion ≥ 70%",
    },
    {
      badge: "Platinum",
      color: "#b47aff",
      criteria: "Rating ≥ 4.8 · Revenue ≥ $20K · Completion ≥ 85%",
    },
    { badge: "Premium", color: "#da7c36", criteria: "Manual admin assignment only" },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Badges & Ranking System'
        sub='Configure automated badge assignment and performance criteria'
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Badge Rules
          </div>
          {badgeRules.map(b => (
            <div
              key={b.badge}
              style={{
                padding: "16px",
                borderRadius: 12,
                background: "#070f1e",
                border: `1px solid ${b.color}30`,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: b.color }}>
                  🏅 {b.badge} Badge
                </div>
                <button
                  className='alo-btn alo-btn-ghost'
                  style={{ padding: "4px 10px", fontSize: 12 }}
                >
                  Edit
                </button>
              </div>
              <div style={{ fontSize: 12, color: "#7a9cc4", fontFamily: "'DM Mono',monospace" }}>
                {b.criteria}
              </div>
            </div>
          ))}
          <button
            className='alo-btn alo-btn-primary'
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            + Add Badge Rule
          </button>
        </div>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 4,
            }}
          >
            Instructor Score Radar
          </div>
          <div
            className='metric-label'
            style={{ marginBottom: 16 }}
          >
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
      <div
        className='alo-card'
        style={{ padding: 24 }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#e8f0fe",
            marginBottom: 20,
          }}
        >
          Automation Controls
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            ["Auto Badge Upgrade", "Upgrade when criteria met", true],
            ["Auto Badge Downgrade", "Downgrade on performance drop", true],
            ["Manual Override", "Admin can override automation", true],
          ].map(([l, s, on]) => (
            <div
              key={l}
              style={{
                background: "#070f1e",
                border: "1px solid #1a3158",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe", marginBottom: 4 }}>
                  {l}
                </div>
                <div style={{ fontSize: 11, color: "#3d5a80" }}>{s}</div>
              </div>
              <Toggle on={on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: COUPONS
═══════════════════════════════════════════════════════ */
const Coupons = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Coupons & Discounts'
        sub='Create and manage promotional campaigns'
        action={
          <button
            className='alo-btn alo-btn-primary'
            onClick={() => setShowForm(!showForm)}
          >
            <Icon
              name='plus'
              size={14}
              color='white'
            />
            New Coupon
          </button>
        }
      />

      {showForm && (
        <div
          className='alo-card'
          style={{ padding: 24, marginBottom: 20, borderColor: "rgba(218,124,54,0.3)" }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Create New Coupon
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              ["Coupon Code", "text", "e.g. SAVE20"],
              ["Discount Value", "number", "e.g. 20"],
              ["Usage Limit", "number", "Blank = unlimited"],
            ].map(([l, t, p]) => (
              <div key={l}>
                <div
                  className='metric-label'
                  style={{ marginBottom: 6 }}
                >
                  {l}
                </div>
                <input
                  className='alo-input'
                  type={t}
                  placeholder={p}
                />
              </div>
            ))}
            <div>
              <div
                className='metric-label'
                style={{ marginBottom: 6 }}
              >
                Type
              </div>
              <select className='alo-select'>
                <option>Percentage</option>
                <option>Flat</option>
              </select>
            </div>
            <div>
              <div
                className='metric-label'
                style={{ marginBottom: 6 }}
              >
                Expiry Date
              </div>
              <input
                className='alo-input'
                type='date'
              />
            </div>
            <div>
              <div
                className='metric-label'
                style={{ marginBottom: 6 }}
              >
                Scope
              </div>
              <select className='alo-select'>
                <option>Global</option>
                <option>Instructor-specific</option>
                <option>Referral</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className='alo-btn alo-btn-primary'>Create Coupon</button>
            <button
              className='alo-btn alo-btn-ghost'
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className='alo-card'>
        <table className='alo-table'>
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Discount</th>
              <th>Usage</th>
              <th>Scope</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {COUPONS.map(c => (
              <tr key={c.code}>
                <td
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontWeight: 700,
                    color: "#da7c36",
                    fontSize: 14,
                  }}
                >
                  {c.code}
                </td>
                <td>
                  <Badge variant='blue'>{c.type}</Badge>
                </td>
                <td
                  style={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, color: "#00e5a0" }}
                >
                  {c.value}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ProgressBar value={c.limit ? (c.used / c.limit) * 100 : 50} />
                    <span
                      style={{
                        fontSize: 11,
                        color: "#7a9cc4",
                        fontFamily: "'DM Mono',monospace",
                        minWidth: 50,
                      }}
                    >
                      {c.used}/{c.limit ?? "∞"}
                    </span>
                  </div>
                </td>
                <td>
                  <Badge variant='gray'>{c.scope}</Badge>
                </td>
                <td style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#3d5a80" }}>
                  {c.expires}
                </td>
                <td>
                  <Badge variant={c.status === "Active" ? "green" : "red"}>{c.status}</Badge>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className='alo-btn alo-btn-ghost'
                      style={{ padding: "5px 10px", fontSize: 12 }}
                    >
                      <Icon
                        name='edit'
                        size={12}
                      />
                    </button>
                    <button
                      className='alo-btn alo-btn-danger'
                      style={{ padding: "5px 10px", fontSize: 12 }}
                    >
                      <Icon
                        name='trash'
                        size={12}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: APPROVALS
═══════════════════════════════════════════════════════ */
const Approvals = () => {
  const typeIcon = {
    "New Course": "📘",
    "New Instructor": "👤",
    "Book Approval": "📕",
    "Instructor KYC": "🔐",
    "Course Update": "✏️",
  };

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Approval Workflow'
        sub={`${APPROVALS.length} items awaiting your review`}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {APPROVALS.map(item => (
          <div
            key={item.id}
            className='alo-card'
            style={{
              padding: "18px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              borderColor: item.priority === "High" ? "rgba(255,71,87,0.25)" : undefined,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#070f1e",
                border: "1px solid #1a3158",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {typeIcon[item.type]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                <Badge variant='blue'>{item.type}</Badge>
                {item.priority === "High" && <Badge variant='red'>🔴 High Priority</Badge>}
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#e8f0fe",
                  marginBottom: 3,
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                {item.by} · {item.date} · {item.id}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                className='alo-btn alo-btn-ghost'
                style={{ fontSize: 12 }}
              >
                Review
              </button>
              <button
                className='alo-btn alo-btn-success'
                style={{ fontSize: 12 }}
              >
                ✓ Approve
              </button>
              <button
                className='alo-btn alo-btn-danger'
                style={{ fontSize: 12 }}
              >
                ✗ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: CMS
═══════════════════════════════════════════════════════ */
const CMS = () => {
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

  return (
    <div className='page-enter'>
      <SectionHeader
        title='CMS & Content'
        sub='Manage all website content, pages and marketing'
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {sections.map(s => (
          <div
            key={s.title}
            className='alo-card'
            style={{ padding: 22, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(218,124,54,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#1a3158";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
                marginBottom: 5,
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: 12, color: "#3d5a80", marginBottom: 14, lineHeight: 1.4 }}>
              {s.desc}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {s.count !== null && <Badge variant='gray'>{s.count} items</Badge>}
              <button
                className='alo-btn alo-btn-ghost'
                style={{ fontSize: 12, padding: "5px 12px", marginLeft: "auto" }}
              >
                Manage →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: ANALYTICS
═══════════════════════════════════════════════════════ */
const Analytics = () => {
  const completionData = [
    { cat: "Dev", v: 74 },
    { cat: "Design", v: 68 },
    { cat: "Data", v: 81 },
    { cat: "Marketing", v: 55 },
    { cat: "Business", v: 63 },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Analytics & Reports'
        sub='Deep insights and downloadable CSV reports'
        action={
          <div style={{ display: "flex", gap: 10 }}>
            <button className='alo-btn alo-btn-ghost'>
              <Icon
                name='download'
                size={13}
              />
              Export CSV
            </button>
            <button className='alo-btn alo-btn-primary'>
              <Icon
                name='download'
                size={13}
                color='white'
              />
              Export PDF
            </button>
          </div>
        }
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}
      >
        {[
          { name: "Instructor Revenue Report", size: "128 KB", updated: "Today" },
          { name: "Student Activity Report", size: "342 KB", updated: "Today" },
          { name: "Course Completion Report", size: "94 KB", updated: "Yesterday" },
          { name: "Payment Report", size: "216 KB", updated: "Today" },
          { name: "Coupon Usage Report", size: "48 KB", updated: "Feb 18" },
          { name: "Refund Analysis Report", size: "72 KB", updated: "Feb 17" },
        ].map(r => (
          <div
            key={r.name}
            className='alo-card'
            style={{
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe", marginBottom: 3 }}>
                {r.name}
              </div>
              <div style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                {r.size} · {r.updated}
              </div>
            </div>
            <button
              className='alo-btn alo-btn-ghost'
              style={{ padding: "6px 12px", fontSize: 12, flexShrink: 0 }}
            >
              <Icon
                name='download'
                size={12}
              />
            </button>
          </div>
        ))}
      </div>
      <div
        className='alo-card'
        style={{ padding: 24 }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#e8f0fe",
            marginBottom: 4,
          }}
        >
          Course Completion Rate by Category
        </div>
        <div
          className='metric-label'
          style={{ marginBottom: 24 }}
        >
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
};

/* ═══════════════════════════════════════════════════════
   PAGE: NOTIFICATIONS
═══════════════════════════════════════════════════════ */
const Notifications = () => {
  const [channel, setChannel] = useState("email");
  const history = [
    {
      title: "February Newsletter",
      type: "Email",
      sent: "Feb 15",
      recipients: "14,820",
      opens: "8,240",
    },
    {
      title: "New Course: Python AI",
      type: "Push",
      sent: "Feb 12",
      recipients: "9,400",
      opens: "3,180",
    },
    {
      title: "Maintenance Notice",
      type: "In-App",
      sent: "Feb 10",
      recipients: "14,820",
      opens: "14,820",
    },
    {
      title: "Instructor Payout Week",
      type: "Email",
      sent: "Feb 7",
      recipients: "348",
      opens: "302",
    },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Notification Center'
        sub='Send broadcasts, alerts and custom notifications'
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Compose & Send
          </div>
          <div
            className='metric-label'
            style={{ marginBottom: 8 }}
          >
            Channel
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[
              ["email", "✉️ Email"],
              ["push", "📱 Push"],
              ["in-app", "🔔 In-App"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`alo-btn${channel === id ? " alo-btn-primary" : " alo-btn-ghost"}`}
                style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                onClick={() => setChannel(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div
              className='metric-label'
              style={{ marginBottom: 8 }}
            >
              Target Audience
            </div>
            <select className='alo-select'>
              <option>All Users</option>
              <option>All Students</option>
              <option>All Instructors</option>
              <option>Specific User</option>
            </select>
          </div>
          {channel === "email" && (
            <div style={{ marginBottom: 14 }}>
              <div
                className='metric-label'
                style={{ marginBottom: 8 }}
              >
                Subject Line
              </div>
              <input
                className='alo-input'
                placeholder='Enter email subject...'
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <div
              className='metric-label'
              style={{ marginBottom: 8 }}
            >
              Message
            </div>
            <textarea
              className='alo-textarea'
              rows={4}
              placeholder='Write your notification...'
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className='alo-btn alo-btn-primary'
              style={{ flex: 1, justifyContent: "center" }}
            >
              Send Now
            </button>
            <button className='alo-btn alo-btn-ghost'>Schedule</button>
          </div>
        </div>

        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Recent Broadcasts
          </div>
          {history.map(h => (
            <div
              key={h.title}
              style={{
                background: "#070f1e",
                borderRadius: 10,
                border: "1px solid #1a3158",
                padding: "14px",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe" }}>{h.title}</div>
                <Badge
                  variant={h.type === "Email" ? "blue" : h.type === "Push" ? "orange" : "green"}
                >
                  {h.type}
                </Badge>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                  📅 {h.sent}
                </span>
                <span style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                  👥 {h.recipients}
                </span>
                <span style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                  👁 {h.opens} opens
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: SECURITY
═══════════════════════════════════════════════════════ */
const Security = () => {
  const logs = [
    {
      admin: "Super Admin",
      action: "Approved instructor: James Carter",
      time: "Feb 19 · 10:24 AM",
      ip: "103.211.x.x",
    },
    {
      admin: "Finance Admin",
      action: "Processed payout: $3,200 → Ravi Patel",
      time: "Feb 19 · 9:42 AM",
      ip: "202.134.x.x",
    },
    {
      admin: "Moderator",
      action: "Deleted spam review on Full-Stack Bootcamp",
      time: "Feb 18 · 4:17 PM",
      ip: "119.18.x.x",
    },
    {
      admin: "Super Admin",
      action: "IP blocked: 45.93.201.xxx",
      time: "Feb 18 · 2:05 PM",
      ip: "103.211.x.x",
    },
    {
      admin: "Finance Admin",
      action: "Rejected refund REF-003 (fraud flagged)",
      time: "Feb 18 · 11:30 AM",
      ip: "202.134.x.x",
    },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Security & Control'
        sub='Roles, permissions, audit logs and fraud detection'
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Admin Roles
          </div>
          {[
            { role: "Super Admin", perms: "Full Access", color: "#ff4757", admins: 1 },
            { role: "Finance Admin", perms: "Financial Only", color: "#da7c36", admins: 2 },
            { role: "Moderator", perms: "Content & Reviews", color: "#00e5a0", admins: 3 },
          ].map(r => (
            <div
              key={r.role}
              style={{
                background: "#070f1e",
                border: "1px solid #1a3158",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: r.color }}>{r.role}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#3d5a80",
                    fontFamily: "'DM Mono',monospace",
                    marginTop: 2,
                  }}
                >
                  {r.perms}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge variant='gray'>
                  {r.admins} admin{r.admins > 1 ? "s" : ""}
                </Badge>
                <button
                  className='alo-btn alo-btn-ghost'
                  style={{ padding: "4px 10px", fontSize: 11 }}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
          <button
            className='alo-btn alo-btn-primary'
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            + Add Admin
          </button>
        </div>

        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            Security Controls
          </div>
          {[
            ["Two-Factor Authentication", "Required for all admins", true],
            ["IP Blocking", "Block suspicious IP addresses", true],
            ["AI Fraud Detection", "Monitor unusual transactions", true],
            ["Login Attempt Limit", "Lock after 5 failed attempts", true],
            ["Activity Logging", "Full audit trail", true],
          ].map(([l, s, on]) => (
            <div
              key={l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #1a3158",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe" }}>{l}</div>
                <div style={{ fontSize: 11, color: "#3d5a80", marginTop: 2 }}>{s}</div>
              </div>
              <Toggle on={on} />
            </div>
          ))}
        </div>
      </div>

      <div
        className='alo-card'
        style={{ padding: 24 }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#e8f0fe",
            marginBottom: 20,
          }}
        >
          Activity Audit Log
        </div>
        {logs.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              padding: "13px 0",
              borderBottom: i < logs.length - 1 ? "1px solid #1a3158" : "none",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#da7c36",
                flexShrink: 0,
                marginTop: 7,
                boxShadow: "0 0 6px rgba(218,124,54,0.5)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#e8f0fe" }}>
                <span style={{ fontWeight: 700, color: "#fc9759" }}>{l.admin}</span> — {l.action}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#3d5a80",
                  fontFamily: "'DM Mono',monospace",
                  marginTop: 3,
                }}
              >
                {l.time} · IP: {l.ip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: SETTINGS
═══════════════════════════════════════════════════════ */
const Settings = () => {
  const featureToggles = [
    ["Maintenance Mode", false],
    ["User Registration", true],
    ["Course Reviews", true],
    ["Referral System", true],
    ["Flash Sales", true],
    ["Gamification", true],
    ["AI Features", false],
    ["Physical Books", true],
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Platform Settings'
        sub='Configure global platform behaviour and integrations'
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {[
          {
            title: "💰 Commission & Revenue",
            fields: [
              ["Default Commission %", "number", "30"],
              ["Min Payout ($)", "number", "50"],
            ],
          },
          {
            title: "🌍 Currency & Tax",
            fields: [
              ["Default Currency", "select", ["USD", "EUR", "GBP", "BDT"]],
              ["Tax Rate %", "number", "0"],
            ],
          },
          {
            title: "💳 Payment Gateways",
            fields: [
              ["Stripe Secret Key", "password", "sk_live_..."],
              ["PayPal Client ID", "text", "AXxxxxx..."],
            ],
          },
          {
            title: "🔍 SEO & Meta",
            fields: [
              ["Site Title", "text", "AloSkill — Learn Skills Online"],
              ["Meta Description", "text", "Platform tagline..."],
            ],
          },
        ].map(s => (
          <div
            key={s.title}
            className='alo-card'
            style={{ padding: 24 }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
                marginBottom: 20,
              }}
            >
              {s.title}
            </div>
            {s.fields.map(([l, t, v]) => (
              <div
                key={l}
                style={{ marginBottom: 14 }}
              >
                <div
                  className='metric-label'
                  style={{ marginBottom: 7 }}
                >
                  {l}
                </div>
                {t === "select" ? (
                  <select className='alo-select'>
                    {v.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className='alo-input'
                    type={t}
                    placeholder={v}
                  />
                )}
              </div>
            ))}
            <button
              className='alo-btn alo-btn-primary'
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
            >
              Save Changes
            </button>
          </div>
        ))}
      </div>

      <div
        className='alo-card'
        style={{ padding: 24 }}
      >
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#e8f0fe",
            marginBottom: 20,
          }}
        >
          ⚙️ Feature Toggles
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {featureToggles.map(([l, on]) => (
            <div
              key={l}
              style={{
                background: "#070f1e",
                border: "1px solid #1a3158",
                borderRadius: 10,
                padding: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: on ? "#e8f0fe" : "#3d5a80" }}>
                {l}
              </span>
              <Toggle on={on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE: GAMIFICATION
═══════════════════════════════════════════════════════ */
const Gamification = () => {
  const leaderboard = [
    { rank: 1, name: "Fatima Al-Hassan", pts: 4820, streak: 42, medal: "🥇" },
    { rank: 2, name: "Priya Sharma", pts: 4210, streak: 38, medal: "🥈" },
    { rank: 3, name: "Yuki Tanaka", pts: 3940, streak: 31, medal: "🥉" },
    { rank: 4, name: "Aisha Rahman", pts: 3480, streak: 28, medal: "🎖️" },
    { rank: 5, name: "Carlos Mendez", pts: 2100, streak: 14, medal: "🎖️" },
  ];
  const achievements = [
    { name: "First Course", icon: "🌱", desc: "Complete first course", pts: 100 },
    { name: "Speed Learner", icon: "⚡", desc: "Finish course in under 3 days", pts: 250 },
    { name: "Perfect Score", icon: "💯", desc: "Score 100% on any quiz", pts: 300 },
    { name: "7-Day Streak", icon: "🔥", desc: "Learn 7 days in a row", pts: 200 },
    { name: "Top Reviewer", icon: "⭐", desc: "Write 10 helpful reviews", pts: 150 },
  ];

  return (
    <div className='page-enter'>
      <SectionHeader
        title='Gamification'
        sub='Leaderboards, points, achievements and rewards'
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}
      >
        {[
          { l: "Active Streaks", v: "3,240", icon: "🔥", color: "#da7c36" },
          { l: "Achievements Earned", v: "18,420", icon: "🏆", color: "#ffc107" },
          { l: "Points Redeemed", v: "124,800", icon: "⭐", color: "#b47aff" },
          { l: "Daily Active", v: "2,840", icon: "⚡", color: "#4a9eff" },
        ].map(s => (
          <div
            key={s.l}
            className='alo-kpi-card'
            style={{ "--accent": s.color, textAlign: "center" }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 22,
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                color: s.color,
              }}
            >
              {s.v}
            </div>
            <div
              className='metric-label'
              style={{ marginTop: 4 }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#e8f0fe",
              marginBottom: 20,
            }}
          >
            🏆 Student Leaderboard
          </div>
          {leaderboard.map((s, i) => (
            <div
              key={s.rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 0",
                borderBottom: i < leaderboard.length - 1 ? "1px solid #1a3158" : "none",
              }}
            >
              <div style={{ fontSize: 20, width: 28, textAlign: "center" }}>{s.medal}</div>
              <Avatar
                name={s.name}
                size={32}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe" }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#3d5a80", fontFamily: "'DM Mono',monospace" }}>
                  🔥 {s.streak}-day streak
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#da7c36",
                }}
              >
                {s.pts.toLocaleString()} pts
              </div>
            </div>
          ))}
        </div>

        <div
          className='alo-card'
          style={{ padding: 24 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "#e8f0fe",
              }}
            >
              🎯 Achievements
            </div>
            <button
              className='alo-btn alo-btn-primary'
              style={{ fontSize: 12, padding: "6px 12px" }}
            >
              + Add
            </button>
          </div>
          {achievements.map((a, i) => (
            <div
              key={a.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < achievements.length - 1 ? "1px solid #1a3158" : "none",
              }}
            >
              <div style={{ fontSize: 22 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e8f0fe" }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "#3d5a80" }}>{a.desc}</div>
              </div>
              <Badge variant='gold'>+{a.pts} pts</Badge>
              <button
                className='alo-btn alo-btn-ghost'
                style={{ padding: "4px 8px", fontSize: 11 }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const PAGES = {
    dashboard: <Dashboard />,
    students: <Students />,
    instructors: <Instructors />,
    courses: <Courses />,
    books: <Books />,
    financial: <Financial />,
    reviews: <Reviews />,
    badges: <Badges />,
    coupons: <Coupons />,
    approvals: <Approvals />,
    cms: <CMS />,
    analytics: <Analytics />,
    notifications: <Notifications />,
    security: <Security />,
    settings: <Settings />,
    gamification: <Gamification />,
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "#050d1a" }}>
        <Sidebar
          active={page}
          onNav={setPage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Topbar page={page} />
          <main
            key={page}
            style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}
          >
            {PAGES[page]}
          </main>
        </div>
      </div>
    </>
  );
}
