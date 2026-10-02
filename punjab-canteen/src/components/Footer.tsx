import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { directionsUrl, navLinks, restaurant, telHref } from '../data/restaurant';
import Button from './Button';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="zigzag" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-bold">{restaurant.name}</p>
          <p className="font-hindi-display mt-1 text-xl text-saffron">{restaurant.nameHi}</p>
          <address className="mt-6 flex gap-3 text-sm not-italic leading-relaxed text-cream/75">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
            <span>{restaurant.addressLines.join(' ')}</span>
          </address>
          <a href={telHref} className="mt-4 flex items-center gap-3 text-sm text-cream/90 hover:text-saffron">
            <Phone size={18} className="text-gold" aria-hidden /> {restaurant.phoneDisplay}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-display text-lg text-gold">Quick links</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/75 transition-colors hover:text-saffron">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-display text-lg text-gold">Visit today</p>
          <p className="mt-4 text-sm text-cream/75">Listed closing time {restaurant.listedClosing}. Call before you travel to confirm.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={telHref} variant="saffron"><Phone size={16} aria-hidden /> Call Restaurant</Button>
            <Button href={directionsUrl} external variant="outlineLight">Get Directions</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">© {restaurant.name}</div>
    </footer>
  );
}
