import { motion } from "framer-motion";
import { Flag, Trophy, Clock } from "lucide-react";

const challenges = [
  { title: "Web: SQL Injection 101", difficulty: "Easy", points: 100, color: "text-neon-green" },
  { title: "Crypto: Caesar Cipher", difficulty: "Easy", points: 100, color: "text-neon-green" },
  { title: "Network: Packet Analysis", difficulty: "Medium", points: 250, color: "text-neon-cyan" },
  { title: "Forensics: Hidden File", difficulty: "Medium", points: 250, color: "text-neon-cyan" },
  { title: "Reverse: Crack Me", difficulty: "Hard", points: 500, color: "text-neon-pink" },
  { title: "Pwn: Buffer Overflow", difficulty: "Hard", points: 500, color: "text-neon-pink" },
];

export function CtfPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center">
            <Flag className="w-5 h-5 text-neon-pink" />
          </div>
          <h1 className="text-3xl font-bold">CTF Arena</h1>
        </div>
        <p className="text-text-muted">Real challenges — earn points, climb the ranks</p>
      </motion.div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-bg-card/60 border border-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{c.title}</h3>
              <span className={`text-xs font-mono px-2 py-1 rounded bg-white/5 ${c.color}`}>{c.difficulty}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {c.points} pts</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 30 min</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
