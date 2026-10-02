import { Link } from 'react-router-dom';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'saffron' | 'maroon' | 'outlineLight' | 'outlineDark' | 'cream';

const variants: Record<Variant, string> = {
  saffron: 'bg-saffron text-charcoal hover:bg-gold-soft shadow-[0_8px_24px_-8px_rgba(245,158,11,0.7)]',
  maroon: 'bg-maroon text-cream hover:bg-maroon-dark',
  cream: 'bg-cream text-maroon hover:bg-white',
  outlineLight: 'border-2 border-cream/70 text-cream hover:bg-cream hover:text-charcoal',
  outlineDark: 'border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 active:scale-[0.98]';

type Props = {
  variant?: Variant;
  to?: string;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export default function Button({ variant = 'saffron', to, href, external, className = '', children, ariaLabel, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} aria-label={ariaLabel}>{children}</Link>;
  if (href)
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  return <button className={cls} aria-label={ariaLabel} {...rest}>{children}</button>;
}
