import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';
import { galleryImages } from '../data/gallery';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Gallery() {
  usePageMeta(
    'Gallery – Punjab Canteen, Wakad, Pune',
    'Photos of Punjab Canteen in Wakad, Pune: the entrance, the dining area and thalis served in katoris.',
  );
  const [open, setOpen] = useState<number | null>(null);
  const [feature, ...rest] = galleryImages;

  const tile = (i: number, className = '') => {
    const g = galleryImages[i];
    return (
      <button
        type="button"
        onClick={() => setOpen(i)}
        aria-label={`Open photo: ${g.caption}`}
        className={`group relative block w-full overflow-hidden rounded-2xl bg-charcoal ${className}`}
      >
        <img
          src={g.src}
          alt={g.alt}
          width={g.w}
          height={g.h}
          loading={i === 0 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="text-left text-sm text-cream">{g.caption}</span>
          <ZoomIn size={18} className="text-saffron" aria-hidden />
        </span>
      </button>
    );
  };

  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <h1 className="font-display text-5xl font-extrabold md:text-7xl">
            Gallery <span className="font-hindi-display text-3xl text-saffron md:text-5xl">गैलरी</span>
          </h1>
          <p className="mt-3 max-w-xl text-cream/75">Tap any photo to view it larger. Use the arrow keys to move between photos.</p>
        </div>
        <div className="zigzag" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-5">
            {tile(0, 'aspect-[4/5] lg:col-span-2 lg:aspect-auto lg:h-full')}
            <div className="columns-2 gap-4 lg:col-span-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
              {rest.map((r, k) => (
                <div key={r.id}>{tile(k + 1)}</div>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="mt-10 text-center text-xs text-charcoal/55">{feature.caption} and more. Photos can be swapped in /public/images.</p>
      </section>

      <Lightbox images={galleryImages} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </>
  );
}
