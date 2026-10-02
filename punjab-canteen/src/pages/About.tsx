import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import { categories, parathas } from '../data/menu';
import { restaurant } from '../data/restaurant';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta(
    'About Punjab Canteen – Punjabi Parathas, Kulchas & Paneer in Wakad, Pune',
    'Punjab Canteen serves Punjabi parathas, stuffed kulcha thalis, paneer and Indian starters in Wakad, Pune. Learn what to expect.',
  );
  const starters = categories.find((c) => c.id === 'starters')!.items.length;
  const kulchas = categories.find((c) => c.id === 'kulcha-thalis')!.items.length;

  const facts = [
    { n: String(parathas.length), l: 'paratha varieties' },
    { n: String(kulchas), l: 'stuffed kulcha thalis' },
    { n: String(starters), l: 'Indian starters' },
    { n: '₹200–400', l: 'per person' },
  ];

  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">
            About<br />Punjab Canteen
          </h1>
          <p className="font-hindi-display mt-3 text-3xl text-saffron md:text-4xl">{restaurant.nameHi}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            A Punjabi kitchen in Wakad, built around parathas, kulchas and paneer, with the familiar flavours of the region.
          </p>
        </div>
        <div className="zigzag" />
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <Reveal>
          <SectionHeading title="Food from Punjab, plated in katoris" />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/80">
            <p>
              The menu leans on Punjabi favourites: parathas stuffed with everything from aloo and gobhi to paneer, mushroom and cheese,
              kulchas served as full thalis, and tandoori starters built around paneer and soya chaap.
            </p>
            <p>
              Parathas come two ways. Order a Simply Paratha with aloo ki sabzi, boondi raita and salad, or step up to the Paratha Thali
              with chhole and dal makhani added. Kulcha thalis follow the same idea.
            </p>
            <p>
              The menu is vegetarian throughout, and the restaurant's signage carries the pure veg mark. Thalis are served as set plates, so
              modifications are not allowed.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <TiltCard>
            <img
              src="/images/dining-truck.jpg"
              alt="Dining area with pink-topped tables and a painted truck-art front reading Punjab Canteen"
              width={554}
              height={554}
              loading="lazy"
              className="aspect-square w-full rounded-[2rem] border-4 border-gold object-cover shadow-warm"
            />
          </TiltCard>
        </Reveal>
      </section>

      <section className="bg-maroon text-cream">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4 md:px-8">
          {facts.map((f) => (
            <div key={f.l} className="text-center">
              <dd className="font-display text-4xl font-extrabold text-gold-soft md:text-5xl">{f.n}</dd>
              <dt className="mt-1 text-sm text-cream/80">{f.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <img
            src="/images/dining-yellow.jpg"
            alt="Indoor dining hall with wooden tables, yellow chairs and painted wall art"
            width={259}
            height={194}
            loading="lazy"
            className="w-full rounded-[2rem] object-cover shadow-warm"
          />
        </Reveal>
        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <SectionHeading title="A colourful place to sit down">
            The dining room leans into Punjabi truck-art colour, with painted walls, pink-topped tables and a decorated truck front. Guest feedback
            describes the atmosphere as family-friendly and the staff as polite.
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/menu" variant="maroon">View Menu</Button>
            <Button to="/gallery" variant="outlineDark">See photos</Button>
          </div>
          <p className="mt-6 text-sm text-charcoal/60">
            Questions about the menu? <Link to="/contact" className="underline decoration-gold underline-offset-4 hover:text-maroon">Contact the restaurant</Link>.
          </p>
        </Reveal>
      </section>
    </>
  );
}
