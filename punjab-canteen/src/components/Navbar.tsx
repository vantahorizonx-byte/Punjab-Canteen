import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { navLinks, restaurant, telHref } from '../data/restaurant';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-charcoal/95 backdrop-blur supports-[backdrop-filter]:bg-charcoal/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <Link to="/" className="flex items-baseline gap-2.5" aria-label="Punjab Canteen home">
          <span className="font-display text-xl font-bold text-cream md:text-2xl">{restaurant.name}</span>
          <span className="font-hindi-display text-sm text-saffron md:text-base">{restaurant.nameHi}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-[13px] font-medium uppercase tracking-widest transition-colors ${
                  isActive ? 'text-saffron' : 'text-cream/80 hover:text-cream'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-saffron"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal transition hover:bg-gold-soft md:px-5 md:text-[13px]"
          >
            <Phone size={15} aria-hidden /> <span className="hidden min-[400px]:inline">Call Now</span>
            <span className="min-[400px]:hidden sr-only">Call Now</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-charcoal lg:hidden"
          >
            <div className="zigzag" />
            <ul className="mx-auto flex max-w-md flex-col px-6 py-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  className="border-b border-cream/10"
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-4 font-display text-3xl ${isActive ? 'text-saffron' : 'text-cream'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href={telHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-saffron py-4 text-sm font-semibold uppercase tracking-wider text-charcoal"
                >
                  <Phone size={18} aria-hidden /> Call {restaurant.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
