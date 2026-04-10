"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useTheme } from "@/lib/ThemeContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useTheme();
  const marginLeft = sidebarCollapsed ? 64 : 240;

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft,
          transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
