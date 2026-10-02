import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '../data/gallery';

export default function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index! + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((index! - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  const img = open ? images[index!] : null;
  const btn = 'absolute grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur transition hover:bg-cream/25';

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${img.caption}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`${btn} right-4 top-4`}>
            <X size={22} />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            className={`${btn} left-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onChange((index! - 1 + images.length) % images.length);
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className={`${btn} right-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onChange((index! + 1) % images.length);
            }}
          >
            <ChevronRight size={24} />
          </button>
          <motion.figure
            key={img.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={img.src} alt={img.alt} className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-cream/80">
              {img.caption} · {index! + 1}/{images.length}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
