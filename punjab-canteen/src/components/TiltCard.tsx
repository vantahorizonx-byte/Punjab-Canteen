import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

/** Subtle 3D tilt that follows the pointer. Disabled for reduced-motion users. */
export default function TiltCard({ children, className = '', max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}
