import { Clock, MapPin, Phone, Star, Wallet } from 'lucide-react';
import { restaurant, telHref } from '../data/restaurant';

/** Restaurant information card used on Location and Contact. All values come from data/restaurant.ts */
export default function InfoCard({ className = '' }: { className?: string }) {
  const row = 'flex gap-4 border-t border-charcoal/10 py-4 first:border-t-0';
  const icon = 'mt-1 shrink-0 text-maroon';
  return (
    <div className={`overflow-hidden rounded-3xl bg-white shadow-warm ${className}`}>
      <div className="zigzag" />
      <div className="p-6 md:p-8">
        <p className="font-display text-3xl font-bold text-maroon">{restaurant.name}</p>
        <p className="font-hindi-display text-xl text-saffron">{restaurant.nameHi}</p>
        <div className="mt-5">
          <div className={row}>
            <Star size={20} className={icon} aria-hidden />
            <p>
              <span className="font-semibold">{restaurant.rating} ★</span> · {restaurant.reviewCount} reviews
              <span className="block text-xs text-charcoal/60">Supplied listing figures</span>
            </p>
          </div>
          <div className={row}>
            <Wallet size={20} className={icon} aria-hidden />
            <p>{restaurant.priceRange}</p>
          </div>
          <div className={row}>
            <Clock size={20} className={icon} aria-hidden />
            <p>
              Listed closing time: <span className="font-semibold">{restaurant.listedClosing}</span>
            </p>
          </div>
          <div className={row}>
            <MapPin size={20} className={icon} aria-hidden />
            <address className="not-italic leading-relaxed">
              {restaurant.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
          </div>
          <div className={row}>
            <Phone size={20} className={icon} aria-hidden />
            <a href={telHref} className="font-semibold hover:text-maroon">{restaurant.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
