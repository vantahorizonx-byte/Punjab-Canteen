import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Search, X } from 'lucide-react';
import { categories, formatPrice, parathaIntro, parathas } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { usePageMeta } from '../hooks/usePageMeta';
import { restaurant } from '../data/restaurant';

type Hit = { key: string; name: string; category: string; price?: number; simple?: number; thali?: number; seasonal?: boolean };

function ItemCard({ hit, i }: { hit: Hit; i: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18, rotateX: -12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.035, 0.35) }}
      style={{ transformPerspective: 800 }}
      className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-warm"
    >
      <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-maroon transition-transform duration-300 group-hover:scale-y-100" aria-hidden />
      <p className="text-xs font-medium text-charcoal/55">{hit.category}</p>
      <div className="mt-1 flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-bold leading-snug text-charcoal">{hit.name}</h3>
        {hit.price !== undefined ? (
          <p className="shrink-0 font-display text-2xl font-bold text-maroon">{formatPrice(hit.price)}</p>
        ) : null}
      </div>
      {hit.seasonal && (
        <span className="mt-3 inline-block rounded-full bg-saffron/20 px-3 py-1 text-xs font-semibold tracking-wider text-maroon">SEASONAL</span>
      )}
      {hit.simple !== undefined && (
        <dl className="mt-3 flex gap-6 text-sm">
          <div><dt className="text-charcoal/60">Simply</dt><dd className="font-display text-lg font-bold text-maroon">{formatPrice(hit.simple)}</dd></div>
          <div><dt className="text-charcoal/60">Thali</dt><dd className="font-display text-lg font-bold text-maroon">{formatPrice(hit.thali!)}</dd></div>
        </dl>
      )}
    </motion.li>
  );
}

function ParathaSection({ rows }: { rows: typeof parathas }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[parathaIntro.simple, parathaIntro.thali].map((p, i) => (
          <div key={p.title} className={`rounded-2xl p-6 ${i === 0 ? 'bg-maroon text-cream' : 'bg-charcoal text-cream'}`}>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-gold-soft">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-cream/85">{p.parts.join(' + ')}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 rounded-xl border border-maroon/30 bg-maroon/5 px-4 py-3 text-sm font-medium text-maroon" role="note">
        <Info size={18} aria-hidden /> {parathaIntro.note}
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-white">
        <table className="w-full text-left">
          <caption className="sr-only">Paratha prices: simply paratha and paratha thali</caption>
          <thead>
            <tr className="bg-charcoal text-cream">
              <th scope="col" className="px-4 py-4 text-sm font-semibold uppercase tracking-wider md:px-6">Parathas</th>
              <th scope="col" className="px-3 py-4 text-right text-sm font-semibold uppercase tracking-wider text-gold-soft md:px-6">Simply</th>
              <th scope="col" className="px-4 py-4 text-right text-sm font-semibold uppercase tracking-wider text-gold-soft md:px-6">Thali</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-charcoal/10 transition-colors odd:bg-cream/50 hover:bg-saffron/15">
                <th scope="row" className="px-4 py-3.5 font-display text-base font-bold md:px-6 md:text-lg">{r.name}</th>
                <td className="px-3 py-3.5 text-right font-display text-lg font-bold text-maroon md:px-6 md:text-xl">{formatPrice(r.simple)}</td>
                <td className="px-4 py-3.5 text-right font-display text-lg font-bold text-maroon md:px-6 md:text-xl">{formatPrice(r.thali)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MenuPage() {
  usePageMeta(
    'Punjab Canteen Menu & Prices – Parathas, Kulcha Thalis, Starters | Wakad, Pune',
    'Full Punjab Canteen menu with prices: shorba, chaats, paneer starters, 27 parathas, specials and stuffed kulcha thalis in Wakad, Pune.',
  );
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const active = categories.find((c) => c.id === params.get('cat'))?.id ?? categories[0].id;
  const cat = categories.find((c) => c.id === active)!;
  const query = q.trim().toLowerCase();

  const hits = useMemo<Hit[]>(() => {
    if (!query) return [];
    const out: Hit[] = [];
    categories.forEach((c) => {
      c.items.forEach((it: MenuItem) => {
        if (it.name.toLowerCase().includes(query))
          out.push({ key: `${c.id}-${it.name}`, name: it.name, category: c.label, price: it.price, seasonal: it.seasonal });
      });
    });
    parathas.forEach((p) => {
      if (p.name.toLowerCase().includes(query))
        out.push({ key: `p-${p.name}`, name: p.name, category: 'Hatke Parathas', simple: p.simple, thali: p.thali });
    });
    return out;
  }, [query]);

  const items: Hit[] = cat.items.map((it) => ({
    key: it.name,
    name: it.name,
    category: cat.label,
    price: it.price,
    seasonal: it.seasonal,
  }));

  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
          <h1 className="font-display text-5xl font-extrabold md:text-7xl">
            Menu <span className="font-hindi-display text-3xl text-saffron md:text-5xl">मेन्यू</span>
          </h1>
          <p className="mt-3 max-w-xl text-cream/75">
            Everything at {restaurant.name}, with prices. Call {restaurant.phoneDisplay} to ask about availability.
          </p>
          <div className="relative mt-8 max-w-xl">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/60" aria-hidden />
            <input
              id="menu-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes, e.g. paneer, kulcha, chhole"
              autoComplete="off"
              className="w-full rounded-full bg-cream py-4 pl-12 pr-12 text-base text-charcoal placeholder:text-charcoal/50"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-charcoal/70 hover:bg-charcoal/10">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        <div className="zigzag" />
      </section>

      <div className="sticky top-16 z-30 border-b border-gold/30 bg-cream/95 backdrop-blur md:top-[72px]">
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:justify-center md:px-8">
          {categories.map((c) => {
            const selected = !query && c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => {
                  setQ('');
                  setParams({ cat: c.id }, { replace: true });
                }}
                className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${selected ? 'text-cream' : 'text-charcoal/80 hover:text-maroon'}`}
              >
                {selected && (
                  <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14" aria-live="polite">
        {query ? (
          <>
            <p className="mb-6 text-charcoal/70">
              {hits.length} {hits.length === 1 ? 'dish' : 'dishes'} found for “{q.trim()}”
            </p>
            {hits.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-maroon/40 p-8 text-center text-charcoal/70">
                Nothing matched. Try a shorter word such as “paneer”, or clear the search.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
                <AnimatePresence>
                  {hits.map((h, i) => <ItemCard key={h.key} hit={h} i={i} />)}
                </AnimatePresence>
              </ul>
            )}
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-6 font-display text-3xl font-bold text-maroon md:text-4xl">{cat.label}</h2>
              {cat.id === 'parathas' ? (
                <ParathaSection rows={parathas} />
              ) : (
                <>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
                    {items.map((h, i) => <ItemCard key={h.key} hit={h} i={i} />)}
                  </ul>
                  {cat.note && (
                    <p className="mt-6 flex items-center gap-2 rounded-xl border border-maroon/30 bg-maroon/5 px-4 py-3 text-sm font-medium text-maroon" role="note">
                      <Info size={18} aria-hidden /> {cat.note}
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        <p className="mt-12 text-center text-xs text-charcoal/55">Prices in Indian rupees as supplied by the restaurant. Please confirm current prices when you visit.</p>
      </section>
    </>
  );
}
