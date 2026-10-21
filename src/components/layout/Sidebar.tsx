import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Network, Terminal, Shield, Flag, Trophy, Settings, Home, Code2 } from "lucide-react";
import { cn } from "../../lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/network", label: "Network", icon: Network },
  { to: "/linux", label: "Linux", icon: Terminal },
  { to: "/programming", label: "Programming", icon: Code2 },
  { to: "/pro", label: "Pro / Security", icon: Shield },
  { to: "/ctf", label: "CTF Arena", icon: Flag },
  { to: "/progress", label: "Progress", icon: Trophy },
];

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-screen sidebar-bg flex flex-col z-20">
      <div className="p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center relative"
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              boxShadow: "0 0 24px var(--glow-cyan)",
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Terminal className="w-5 h-5 text-bg-deepest" strokeWidth={2.5} />
          </motion.div>
          <div>
            <div className="font-semibold text-text-primary tracking-tight">CyberDojo</div>
            <div className="text-[10px] text-text-subtle font-mono">v0.1.0</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group",
                isActive
                  ? "text-text-primary bg-bg-raised"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-raised/50"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                    style={{ background: "var(--accent-cyan)", boxShadow: "0 0 12px var(--glow-cyan)" }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 transition", isActive && "text-accent-cyan")} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border-subtle">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              isActive
                ? "text-text-primary bg-bg-raised"
                : "text-text-muted hover:text-text-primary hover:bg-bg-raised/50"
            )
          }
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
