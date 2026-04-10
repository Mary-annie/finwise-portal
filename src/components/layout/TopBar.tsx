"use client";
import { Menu, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  const { theme, toggleTheme, setSidebarOpen } = useTheme();
  return (
    <div
      className="sticky top-0 z-30 flex items-center gap-4 px-6 lg:px-8"
      style={{
        height: 60,
        background: "var(--topbar-bg)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="flex lg:hidden p-2 rounded-xl transition-colors"
        style={{ color: "var(--text-muted)", background: "var(--bg-raised)", border: "1px solid var(--border)" }}
      >
        <Menu size={16} />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>{title}</h1>
        {subtitle && <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {actions}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl transition-all"
          style={{
            color: "var(--text-secondary)",
            background: "var(--bg-raised)",
            border: "1px solid var(--border)",
          }}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl transition-all"
          style={{ color: "var(--text-secondary)", background: "var(--bg-raised)", border: "1px solid var(--border)" }}
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full border-2" style={{ background: "#ff6b6b", borderColor: "var(--bg-raised)" }} />
        </button>
      </div>
    </div>
  );
}
