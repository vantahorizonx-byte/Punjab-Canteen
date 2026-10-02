import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

// Heavy 3D code is only downloaded for the Home hero.
const Hero3D = lazy(() => import('./Hero3D'));

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticPlate() {
  return (
    <div className="grid h-full w-full place-items-center">
      <img
        src="/images/thali-steel.jpg"
        alt="Steel thali with naan, chhole, dal makhani, raita and a sweet"
        width={422}
        height={473}
        className="aspect-square w-[78%] rounded-full border-[6px] border-gold object-cover shadow-2xl"
      />
    </div>
  );
}

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    // Defer 3D until the browser is idle so text + LCP render first.
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    idle(() => setReady(true));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full">
      <div className="glow-saffron absolute -inset-10" aria-hidden />
      {reduce || !ready ? (
        <StaticPlate />
      ) : (
        <Boundary fallback={<StaticPlate />}>
          <Suspense fallback={<StaticPlate />}>
            <Hero3D active={visible} />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
