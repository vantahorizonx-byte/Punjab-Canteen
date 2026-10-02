import { Navigation, Phone } from 'lucide-react';
import Button from '../components/Button';
import InfoCard from '../components/InfoCard';
import { directionsUrl, mapEmbedUrl, restaurant, telHref } from '../data/restaurant';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Location() {
  usePageMeta(
    'Location & Directions – Punjab Canteen, Solitaire Paradise, Wakad, Pune',
    'Find Punjab Canteen at Shop No 1, 2, Solitaire Paradise, Kaspate Wasti Rd, Shankar Kalat Nagar, Wakad, Pune 411057. Get directions or call 077991 18212.',
  );
  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <h1 className="font-display text-5xl font-extrabold md:text-7xl">
            Find us <span className="font-hindi-display text-3xl text-saffron md:text-5xl">पता</span>
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">
            Solitaire Paradise on Kaspate Wasti Rd, in Wakad. Open the map for turn-by-turn directions.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={directionsUrl} external variant="saffron"><Navigation size={16} aria-hidden /> Get Directions</Button>
            <Button href={telHref} variant="outlineLight"><Phone size={16} aria-hidden /> {restaurant.phoneDisplay}</Button>
          </div>
        </div>
        <div className="zigzag" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-12">
        <div className="overflow-hidden rounded-3xl border-4 border-gold bg-cream-dark shadow-warm lg:col-span-7">
          <iframe
            title="Map showing Punjab Canteen in Wakad, Pune"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[360px] w-full md:h-[520px] lg:h-full lg:min-h-[560px]"
          />
        </div>
        <InfoCard className="lg:col-span-5" />
      </section>
    </>
  );
}
