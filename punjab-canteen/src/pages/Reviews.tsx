import { ExternalLink, Info } from 'lucide-react';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import Stars from '../components/Stars';
import { cautionTheme, positiveThemes } from '../data/reviews';
import { mapsSearchUrl, restaurant } from '../data/restaurant';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Reviews() {
  usePageMeta(
    'Reviews – Punjab Canteen, Wakad, Pune (4.4★)',
    'Punjab Canteen is rated 4.4 from 68 reviews. See what guests tend to mention: parathas, kulchas, paneer, portions and service.',
  );
  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl font-extrabold md:text-7xl">
              Reviews <span className="font-hindi-display text-3xl text-saffron md:text-5xl">समीक्षा</span>
            </h1>
            <p className="mt-4 max-w-md text-cream/75">A summary of what guests tend to mention about Punjab Canteen.</p>
          </div>
          <div className="lg:justify-self-end">
            <p className="font-display text-[7rem] font-extrabold leading-none text-saffron md:text-[9rem]">{restaurant.rating}</p>
            <Stars value={restaurant.rating} size={26} />
            <p className="mt-3 text-lg">{restaurant.reviewCount} reviews</p>
          </div>
        </div>
        <div className="zigzag" />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="flex items-start gap-2 text-sm text-charcoal/65">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
          The rating and review count are the figures supplied for this restaurant and are not updated live. The themes below are summaries, not customer quotes.
        </p>

        <h2 className="mt-10 font-display text-3xl font-bold text-maroon md:text-4xl">What guests tend to mention</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {positiveThemes.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-gold/40 bg-white p-6">
                  <h3 className="font-display text-xl font-bold text-charcoal">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{t.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-maroon/30 bg-maroon/5 p-6 md:p-8">
          <h3 className="font-display text-2xl font-bold text-maroon">{cautionTheme.title}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-charcoal/80">{cautionTheme.body}</p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href={mapsSearchUrl} external variant="maroon">
            Read reviews on Google Maps <ExternalLink size={15} aria-hidden />
          </Button>
          <Button to="/menu" variant="outlineDark">View Menu</Button>
        </div>
      </section>
    </>
  );
}
