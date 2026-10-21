import { XTerm } from "../../components/terminal/XTerm";

export function LinuxPage() {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Linux Terminal</h1>
        <p className="text-text-muted mt-1 font-mono text-sm">
          $ real bash shell — press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neon-cyan">Ctrl+R</kbd> to restart
        </p>
      </div>
      <div className="flex-1 min-h-0 relative">
        <XTerm />
      </div>
    </div>
  );
}
