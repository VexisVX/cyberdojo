import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
  { title: "OWASP Top 10", desc: "The 10 most critical web vulnerabilities", color: "text-neon-purple" },
  { title: "XSS / SQLi / CSRF", desc: "Classic attacks with live demos", color: "text-neon-pink" },
  { title: "Wireshark Analysis", desc: "Inspect and analyze network traffic", color: "text-neon-cyan" },
  { title: "Recon with nmap", desc: "Scan networks, discover services", color: "text-neon-green" },
  { title: "Cryptography", desc: "Symmetric and asymmetric encryption", color: "text-neon-purple" },
  { title: "Bug Bounty Workflow", desc: "From recon to final report", color: "text-neon-pink" },
];

export function ProPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-neon-purple" />
          </div>
          <h1 className="text-3xl font-bold">Pro / Security</h1>
        </div>
        <p className="text-text-muted">Security, pentesting, cryptography — professional level</p>
      </motion.div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((t, i) => (
          <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }}>
            <Link to="#" className="block p-5 rounded-xl bg-bg-card/60 border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${t.color}`}>{t.title}</h3>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-neon-purple transition" />
              </div>
              <p className="text-sm text-text-muted">{t.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
