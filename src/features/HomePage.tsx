import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Network, Terminal, Shield, Flag, ArrowRight, Code2 } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";

const modules = [
  {
    to: "/network",
    icon: Network,
    title: "Network Fundamentals",
    desc: "OSI, TCP/IP, DNS, HTTP/S, routing",
    accent: "var(--accent-cyan)",
    glow: "var(--glow-cyan)",
    count: "42 lessons",
  },
  {
    to: "/linux",
    icon: Terminal,
    title: "Linux Command Line",
    desc: "Bash, permissions, processes, scripting",
    accent: "var(--accent-emerald)",
    glow: "var(--glow-emerald)",
    count: "38 lessons",
  },
  {
    to: "/programming",
    icon: Code2,
    title: "Programming",
    desc: "Java, Python, JavaScript — hands-on coding",
    accent: "var(--accent-amber)",
    glow: "rgba(251, 191, 36, 0.35)",
    count: "Java · soon more",
  },
  {
    to: "/pro",
    icon: Shield,
    title: "Pro / Security",
    desc: "OWASP, pentest, cryptography, red team",
    accent: "var(--accent-violet)",
    glow: "var(--glow-violet)",
    count: "56 lessons",
  },
  {
    to: "/ctf",
    icon: Flag,
    title: "CTF Arena",
    desc: "Real challenges, score, leaderboard",
    accent: "var(--accent-rose)",
    glow: "rgba(251, 113, 133, 0.35)",
    count: "∞",
  },
];

export function HomePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="font-mono text-sm mb-3 flex items-center gap-2">
          <span className="text-text-subtle">$</span>
          <span className="text-accent-cyan">./start_learning.sh</span>
          <span className="text-text-subtle">--mode=hardcore</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight text-text-primary">
          Become a pro in{" "}
          <span className="text-neon">Network, Code &amp; Security</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
          Interactive platform to learn networking, programming and security — offline, fast, professional.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((m, i) => (
          <motion.div
            key={m.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Link to={m.to} className="block">
              <GlassCard className="p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${m.glow}, transparent)`,
                      border: `1px solid ${m.accent}`,
                      boxShadow: `0 0 20px ${m.glow}`,
                    }}
                  >
                    <m.icon className="w-6 h-6" style={{ color: m.accent }} />
                  </div>
                  <span className="text-xs font-mono text-text-subtle">{m.count}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary group-hover:text-accent-cyan transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-text-muted mb-4 leading-relaxed">{m.desc}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Start now <ArrowRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
