"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Link2, Image, BarChart3, Archive, Zap,
  LogOut, Bell, Settings, ChevronRight, Sun, Moon,
  Menu, X, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { clsx } from "clsx";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/links",     icon: Link2,           label: "Smart Links" },
  { href: "/campaigns", icon: Image,           label: "Creatives"   },
  { href: "/analytics", icon: BarChart3,       label: "Analytics"   },
  { href: "/audit",     icon: Archive,         label: "Audit Log"   },
];

/** Icon-only tooltip wrapper */
function NavTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip">
      {children}
      <div
        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity z-50"
        style={{ background: "var(--bg-overlay)", border: "1px solid var(--border)", color: "var(--text-primary)", boxShadow: "var(--shadow-dropdown)" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { theme, toggleTheme, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useTheme();

  const FULL_W      = 240;
  const ICON_W      = 64;
  const effectiveW  = sidebarCollapsed ? ICON_W : FULL_W;

  /* ── helpers ── */
  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <>
      {/* Mobile hamburger (shown when drawer is closed on small screens) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl lg:hidden"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-primary)", boxShadow: "var(--shadow-card)" }}
      >
        <Menu size={18} />
      </button>

      {/* Backdrop – mobile only */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden"
        style={{
          width: effectiveW,
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
          boxShadow: "var(--shadow-card)",
          /* On mobile, slide in/out; on lg+ always visible */
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* ── Logo row ── */}
        <div
          className="flex items-center gap-3 px-4 flex-shrink-0"
          style={{ height: 60, borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#0fd3c3)" }}
          >
            <Zap size={15} className="text-white" />
          </div>

          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="text-sm font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>LaunchPad</div>
              <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>Marketing Portal</div>
            </div>
          )}

          {/* Collapse / close buttons */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Desktop collapse toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg transition-colors hover:bg-black/10"
              style={{ color: "var(--text-muted)" }}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
            </button>
            {/* Mobile close */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex lg:hidden p-1.5 rounded-lg transition-colors hover:bg-black/10"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Nav items ── */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {!sidebarCollapsed && (
            <div className="px-3 pb-2">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                Main
              </span>
            </div>
          )}

          {NAV.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            const item = (
              <Link
                key={href}
                href={href}
                onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                className={clsx(
                  "flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative",
                  sidebarCollapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"
                )}
                style={
                  active
                    ? { background: "rgba(99,102,241,0.13)", border: "1px solid rgba(99,102,241,0.28)", color: "var(--brand-primary)" }
                    : { color: "var(--text-secondary)", border: "1px solid transparent" }
                }
              >
                {active && !sidebarCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: "var(--brand-primary)" }} />
                )}
                <Icon size={16} className={active ? "" : "opacity-60"} />
                {!sidebarCollapsed && <span className="flex-1 truncate">{label}</span>}
                {!sidebarCollapsed && active && <ChevronRight size={13} className="opacity-40" />}
              </Link>
            );

            return sidebarCollapsed
              ? <NavTooltip key={href} label={label}>{item}</NavTooltip>
              : item;
          })}
        </nav>

        {/* ── Bottom controls ── */}
        <div className="px-2 pb-4 space-y-0.5 flex-shrink-0" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>

          {/* Theme toggle */}
          {sidebarCollapsed ? (
            <NavTooltip label={theme === "dark" ? "Light mode" : "Dark mode"}>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-full py-2.5 rounded-xl transition-all"
                style={{ color: "var(--text-secondary)", border: "1px solid transparent" }}
              >
                {theme === "dark" ? <Sun size={16} className="opacity-70" /> : <Moon size={16} className="opacity-70" />}
              </button>
            </NavTooltip>
          ) : (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all"
              style={{ color: "var(--text-secondary)", border: "1px solid transparent" }}
            >
              {theme === "dark"
                ? <Sun size={16} className="opacity-70" />
                : <Moon size={16} className="opacity-70" />}
              <span className="flex-1 text-left">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              {/* Mini toggle pill */}
              <div
                className="w-9 h-5 rounded-full relative transition-colors flex-shrink-0"
                style={{ background: theme === "dark" ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.18)" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                  style={{
                    background: "var(--brand-primary)",
                    left: theme === "dark" ? "2px" : "calc(100% - 18px)",
                  }}
                />
              </div>
            </button>
          )}

          {/* Notifications */}
          {sidebarCollapsed ? (
            <NavTooltip label="Notifications">
              <button className="flex items-center justify-center w-full py-2.5 rounded-xl relative" style={{ color: "var(--text-secondary)" }}>
                <Bell size={16} className="opacity-70" />
                <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "#ff6b6b" }} />
              </button>
            </NavTooltip>
          ) : (
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-black/5" style={{ color: "var(--text-secondary)" }}>
              <Bell size={16} className="opacity-60" />
              <span className="flex-1 text-left">Notifications</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(255,107,107,0.18)", color: "#ff6b6b" }}>3</span>
            </button>
          )}

          {/* Settings */}
          {sidebarCollapsed ? (
            <NavTooltip label="Settings">
              <button className="flex items-center justify-center w-full py-2.5 rounded-xl" style={{ color: "var(--text-secondary)" }}>
                <Settings size={16} className="opacity-70" />
              </button>
            </NavTooltip>
          ) : (
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-black/5" style={{ color: "var(--text-secondary)" }}>
              <Settings size={16} className="opacity-60" />
              <span>Settings</span>
            </button>
          )}

          {/* User row */}
          <div
            className={clsx("mt-2 pt-3 flex items-center gap-3", sidebarCollapsed ? "justify-center px-0" : "px-2")}
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 cursor-pointer"
              style={{ background: "linear-gradient(135deg,#6366f1,#0fd3c3)", color: "#fff", fontSize: 10 }}
              onClick={() => router.push("/login")}
              title="Sign out"
            >
              JD
            </div>

            {!sidebarCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>Jane Doe</div>
                  <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>Head of Marketing</div>
                </div>
                <button
                  onClick={() => router.push("/login")}
                  className="p-1.5 rounded-lg transition-colors hover:bg-black/10"
                  style={{ color: "var(--text-muted)" }}
                  title="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* ── Desktop always-on (ensures space is pushed) ── */}
      {/* We use a shim div on lg+ so main content shifts correctly */}
    </>
  );
}
