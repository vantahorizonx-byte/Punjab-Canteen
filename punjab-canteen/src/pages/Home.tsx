import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin, Navigation, Phone, Star } from 'lucide-react';
import Button from '../components/Button';
import HeroVisual from '../components/HeroVisual';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Stars from '../components/Stars';
import TiltCard from '../components/TiltCard';
import { categories, formatPrice, getItem, parathaIntro, parathas } from '../data/menu';
import { directionsUrl, restaurant, telHref } from '../data/restaurant';
import { galleryImages } from '../data/gallery';
import { positiveThemes } from '../data/reviews';
import { usePageMeta } from '../hooks/usePageMeta';

const chip = 'inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm text-cream';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-16 pt-10 md:px-8 lg:min-h-[calc(100vh-72px)] lg:grid-cols-12 lg:gap-4 lg:py-12">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold leading-[0.92] tracking-tight"
          >
            <span className="block text-[clamp(3.1rem,11.5vw,8.2rem)]">Punjab</span>
            <span className="block text-[clamp(3.1rem,11.5vw,8.2rem)] text-saffron">Canteen</span>
            <span className="font-hindi-display mt-3 block text-[clamp(1.9rem,5.5vw,3.6rem)] leading-tight text-gold-soft">
              {restaurant.nameHi}
            </span>
          </motion.h1>
          <p className="mt-6 max-w-lg font-display text-xl italic text-cream/85 md:text-2xl">{restaurant.tagline}</p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            <li className={chip}><Star size={15} className="fill-gold text-gold" aria-hidden /> {restaurant.rating} ★</li>
            <li className={chip}>{restaurant.reviewCount} Reviews</li>
            <li className={chip}>{restaurant.priceRange}</li>
            <li className={chip}><MapPin size={15} className="text-gold" aria-hidden /> {restaurant.area}</li>
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/menu" variant="saffron">View Menu</Button>
            <Button href={telHref} variant="outlineLight"><Phone size={16} aria-hidden /> Call Restaurant</Button>
            <Button href={directionsUrl} external variant="outlineLight"><Navigation size={16} aria-hidden /> Get Directions</Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <HeroVisual />
          <TiltCard className="absolute -bottom-2 left-0 hidden w-36 md:block lg:-left-6 lg:w-44">
            <img
              src="/images/exterior-night.jpg"
              alt="Punjab Canteen entrance at night"
              width={480}
              height={638}
              className="aspect-[3/4] rounded-2xl border-4 border-cream object-cover shadow-2xl"
            />
          </TiltCard>
        </div>
      </div>
      <div className="zigzag" />
    </section>
  );
}

const tileImages: Record<string, string> = {
  shorba: '/images/thali-spread.jpg',
  'papad-chaats': '/images/dining-yellow.jpg',
  starters: '/images/thali-large.jpg',
  parathas: '/images/thali-large.jpg',
  specials: '/images/thali-steel.jpg',
  'kulcha-thalis': '/images/thali-steel.jpg',
};

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading title="Six corners of the menu">
          From a bowl of shorba to stuffed kulcha thalis, browse everything with prices.
        </SectionHeading>
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = c.id === 'parathas' ? parathas.length : c.items.length;
          return (
            <li key={c.id}>
              <Reveal delay={(i % 3) * 0.08}>
                <TiltCard max={5}>
                  <Link
                    to={`/menu?cat=${c.id}`}
                    className="group relative flex h-44 items-end overflow-hidden rounded-3xl bg-charcoal p-6"
                  >
                    <img
                      src={tileImages[c.id]}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                    <div className="relative flex w-full items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-cream">{c.label}</h3>
                        <p className="text-sm text-gold-soft">{count} {c.id === 'parathas' ? 'varieties' : 'dishes'}</p>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron text-charcoal transition group-hover:rotate-45">
                        <ArrowUpRight size={18} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ParathaFeature() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const lowest = Math.min(...parathas.map((p) => p.simple));

  return (
    <section ref={ref} className="relative overflow-hidden bg-maroon text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="font-hindi-display text-2xl text-gold-soft">हटके पराठे</p>
          <h2 className="mt-1 font-display text-4xl font-bold leading-tight md:text-6xl">
            {parathas.length} parathas, two ways to eat them
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[parathaIntro.simple, parathaIntro.thali].map((p, i) => (
              <div key={p.title} className={`rounded-2xl p-5 ${i === 0 ? 'bg-maroon-dark' : 'bg-charcoal'}`}>
                <h3 className="font-display text-xl font-bold text-gold-soft">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">{p.parts.join(' + ')}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-cream/80">Simply Paratha plates start at {formatPrice(lowest)}.</p>
          <div className="mt-8">
            <Button to="/menu?cat=parathas" variant="saffron">See all parathas</Button>
          </div>
        </Reveal>

        <motion.div style={{ y }} className="relative mx-auto w-full max-w-md">
          <img
            src="/images/thali-large.jpg"
            alt="Large steel thali with a stuffed paratha and katoris of dal and sabzi"
            width={515}
            height={388}
            loading="lazy"
            className="w-full rounded-[2rem] border-4 border-gold object-cover shadow-2xl"
          />
          <img
            src="/images/thali-steel.jpg"
            alt="Steel thali with naan, chhole, dal makhani and a sweet"
            width={422}
            height={473}
            loading="lazy"
            className="absolute -bottom-10 -left-6 w-36 rounded-2xl border-4 border-cream object-cover shadow-2xl sm:w-44"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Highlights() {
  const picks = [
    { cat: 'starters', name: 'Punjab Canteen Platter' },
    { cat: 'specials', name: 'Chur Chur Naan Thali' },
    { cat: 'specials', name: 'Chhole Bhature' },
    { cat: 'kulcha-thalis', name: 'Paneer Kulcha Thali' },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading title="From the menu" hindi="मेन्यू से">A few dishes to start with. Prices as listed.</SectionHeading>
      </Reveal>
      <ul className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
        {picks.map((p) => {
          const it = getItem(p.cat, p.name);
          if (!it) return null;
          return (
            <li key={p.name}>
              <Link
                to={`/menu?cat=${p.cat}`}
                className="group flex items-baseline gap-4 py-6 transition-colors hover:bg-cream-dark/60 md:px-4"
              >
                <span className="font-display text-2xl font-bold text-charcoal transition-colors group-hover:text-maroon md:text-4xl">{it.name}</span>
                <span className="mb-1.5 hidden flex-1 border-b-2 border-dotted border-charcoal/30 sm:block" aria-hidden />
                <span className="ml-auto font-display text-2xl font-bold text-maroon md:text-4xl">{formatPrice(it.price)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function GalleryTeaser() {
  const picks = [galleryImages[1], galleryImages[2], galleryImages[3]];
  return (
    <section className="bg-cream-dark">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><SectionHeading title="Inside the canteen" hindi="कैंटीन के अंदर" /></Reveal>
          <Button to="/gallery" variant="outlineDark">Open gallery</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {picks.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.08} className={i === 0 ? 'col-span-2 md:col-span-1' : ''}>
              <figure className="overflow-hidden rounded-3xl">
                <img src={g.src} alt={g.alt} width={g.w} height={g.h} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105 md:aspect-[4/5]" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewTeaser() {
  return (
    <section className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-8xl font-extrabold leading-none text-saffron">{restaurant.rating}</p>
          <div className="mt-3 text-cream"><Stars value={restaurant.rating} size={22} /></div>
          <p className="mt-2 text-cream/75">{restaurant.reviewCount} reviews (supplied listing figures)</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-3xl font-bold md:text-4xl">What guests tend to mention</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {positiveThemes.map((t) => (
              <li key={t.title} className="rounded-full border border-gold/40 px-4 py-2 text-sm text-cream/90">{t.title}</li>
            ))}
          </ul>
          <div className="mt-8"><Button to="/reviews" variant="outlineLight">More on reviews</Button></div>
        </div>
      </div>
    </section>
  );
}

function VisitBand() {
  return (
    <section className="bg-saffron text-charcoal">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Hungry? Come to Wakad.</h2>
          <p className="mt-1 max-w-md text-charcoal/80">Solitaire Paradise, Kaspate Wasti Rd. Listed closing time {restaurant.listedClosing}.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={telHref} variant="maroon"><Phone size={16} aria-hidden /> Call {restaurant.phoneDisplay}</Button>
          <Button href={directionsUrl} external variant="outlineDark" className="!border-charcoal !text-charcoal hover:!bg-charcoal hover:!text-cream">Get Directions</Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    'Punjab Canteen (पंजाब कैंटीन) – Punjabi Restaurant in Wakad, Pune | Menu & Location',
    'Punjab Canteen in Wakad, Pune: Punjabi parathas, stuffed kulcha thalis, paneer starters and more. See the full menu with prices, location, and call 077991 18212.',
  );
  return (
    <>
      <Hero />
      <Categories />
      <ParathaFeature />
      <Highlights />
      <GalleryTeaser />
      <ReviewTeaser />
      <VisitBand />
    </>
  );
}
