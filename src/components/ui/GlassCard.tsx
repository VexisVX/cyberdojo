import { useRef, MouseEvent, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverLift = true,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={hoverLift ? { y: -3 } : undefined}
      className={cn("glass-card rounded-2xl", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
