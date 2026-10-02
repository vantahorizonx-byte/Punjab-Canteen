import type { ReactNode } from 'react';

export default function SectionHeading({
  title,
  hindi,
  children,
  dark = false,
  center = false,
}: {
  title: string;
  hindi?: string;
  children?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className={`font-display text-4xl font-bold leading-tight md:text-5xl ${dark ? 'text-cream' : 'text-maroon'}`}>
        {title}
        {hindi && <span className="font-hindi-display ml-3 block text-xl text-saffron md:inline md:text-2xl">{hindi}</span>}
      </h2>
      {children && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${center ? 'mx-auto' : ''} ${dark ? 'text-cream/75' : 'text-charcoal/75'}`}>
          {children}
        </p>
      )}
    </div>
  );
}
