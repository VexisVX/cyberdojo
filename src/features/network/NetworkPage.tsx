import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
  { title: "OSI Model", desc: "The 7 layers of networking, visualized", color: "text-neon-cyan" },
  { title: "TCP/IP Stack", desc: "Core protocols, handshake, ports", color: "text-neon-green" },
  { title: "DNS Explained", desc: "How domain names resolve to IPs", color: "text-neon-purple" },
  { title: "HTTP / HTTPS", desc: "TLS handshake, headers, status codes", color: "text-neon-pink" },
  { title: "Routing & NAT", desc: "Path selection, subnetting, NAT", color: "text-neon-cyan" },
  { title: "WebSocket", desc: "Real-time bidirectional communication", color: "text-neon-green" },
];

export function NetworkPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
            <Network className="w-5 h-5 text-neon-cyan" />
          </div>
          <h1 className="text-3xl font-bold">Network</h1>
        </div>
        <p className="text-text-muted">From OSI to HTTP/3 — everything about networking</p>
      </motion.div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }}>
            <Link to="#" className="block p-5 rounded-xl bg-bg-card/60 border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${t.color}`}>{t.title}</h3>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition" />
              </div>
              <p className="text-sm text-text-muted">{t.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
