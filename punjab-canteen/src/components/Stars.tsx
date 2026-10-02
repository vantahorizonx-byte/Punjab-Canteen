import { Star } from 'lucide-react';

/** Renders a fractional star rating (e.g. 4.4) using a clipped gold overlay. */
export default function Stars({ value, size = 18 }: { value: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (fill: string, stroke: string) => (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill={fill} stroke={stroke} aria-hidden />
      ))}
    </span>
  );
  return (
    <span className="relative inline-block" role="img" aria-label={`${value} out of 5 stars`}>
      {row('transparent', 'currentColor')}
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <span className="block w-max text-gold">{row('#D4A017', '#D4A017')}</span>
      </span>
    </span>
  );
}
