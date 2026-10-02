import { NavLink } from 'react-router-dom';
import { Home, MapPin, Phone, UtensilsCrossed } from 'lucide-react';
import { telHref } from '../data/restaurant';

const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium uppercase tracking-wider';

export default function MobileBar() {
  const link = ({ isActive }: { isActive: boolean }) => `${item} ${isActive ? 'text-saffron' : 'text-cream/80'}`;
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-gold/40 bg-charcoal pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <NavLink to="/" end className={link}><Home size={20} aria-hidden />Home</NavLink>
      <NavLink to="/menu" className={link}><UtensilsCrossed size={20} aria-hidden />Menu</NavLink>
      <a href={telHref} className="relative flex flex-1 items-center justify-center" aria-label="Call Punjab Canteen">
        <span className="-mt-6 grid h-14 w-14 place-items-center rounded-full border-4 border-charcoal bg-saffron text-charcoal shadow-lg">
          <Phone size={22} aria-hidden />
        </span>
        <span className="absolute bottom-1.5 text-[11px] font-medium uppercase tracking-wider text-cream/80">Call</span>
      </a>
      <NavLink to="/location" className={link}><MapPin size={20} aria-hidden />Map</NavLink>
    </nav>
  );
}
