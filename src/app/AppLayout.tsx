import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";

export function AppLayout() {
  return (
    <div className="h-screen flex bg-bg-deepest text-text-primary relative overflow-hidden">
      {/* Ambient glows — subtle depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-40"
          style={{ background: "var(--glow-cyan)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30"
          style={{ background: "var(--glow-violet)" }}
        />
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-bg-base">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
