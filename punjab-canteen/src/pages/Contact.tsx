import { useState } from 'react';
import type { FormEvent } from 'react';
import { Check, Copy, Navigation, Phone } from 'lucide-react';
import Button from '../components/Button';
import InfoCard from '../components/InfoCard';
import { directionsUrl, formEndpoint, restaurant, telHref } from '../data/restaurant';
import { usePageMeta } from '../hooks/usePageMeta';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

export default function Contact() {
  usePageMeta(
    'Contact Punjab Canteen – Call 077991 18212 | Wakad, Pune',
    'Call Punjab Canteen on 077991 18212 or get directions to Solitaire Paradise, Kaspate Wasti Rd, Wakad, Pune.',
  );
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formEndpoint) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('sent');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${form.name} ${form.phone}\n${form.message}`.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const field = 'mt-2 w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base';

  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <h1 className="font-display text-5xl font-extrabold md:text-7xl">
            Contact <span className="font-hindi-display text-3xl text-saffron md:text-5xl">संपर्क</span>
          </h1>
          <p className="mt-4 text-cream/75">{restaurant.name}</p>
          <p className="mt-2 font-display text-4xl font-bold text-saffron md:text-6xl">{restaurant.phoneDisplay}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={telHref} variant="saffron" className="!px-10 !py-5 !text-base"><Phone size={20} aria-hidden /> Call Now</Button>
            <Button href={directionsUrl} external variant="outlineLight" className="!py-5"><Navigation size={16} aria-hidden /> Get Directions</Button>
          </div>
        </div>
        <div className="zigzag" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-12">
        <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-warm md:p-8 lg:col-span-7" noValidate={false}>
          <h2 className="font-display text-3xl font-bold text-maroon">Send a message</h2>
          <p className="mt-2 text-sm text-charcoal/70">For quick answers, calling is fastest.</p>

          <div className="mt-6">
            <label htmlFor="c-name" className="text-sm font-semibold">Your name</label>
            <input id="c-name" name="name" required autoComplete="name" value={form.name} onChange={set('name')} className={field} />
          </div>
          <div className="mt-5">
            <label htmlFor="c-phone" className="text-sm font-semibold">Phone number</label>
            <input id="c-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} className={field} />
          </div>
          <div className="mt-5">
            <label htmlFor="c-msg" className="text-sm font-semibold">Message</label>
            <textarea id="c-msg" name="message" required rows={5} value={form.message} onChange={set('message')} className={field} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="submit" variant="maroon" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </Button>
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-maroon hover:bg-maroon/10">
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {copied ? 'Copied' : 'Copy message'}
            </button>
          </div>

          <div role="status" aria-live="polite" className="mt-5 text-sm">
            {status === 'unconfigured' && (
              <p className="rounded-xl bg-saffron/20 p-4 text-charcoal">
                This form is not connected to an inbox yet, so nothing was sent. Please call {restaurant.phoneDisplay} instead.
              </p>
            )}
            {status === 'sent' && <p className="rounded-xl bg-green-100 p-4 text-green-900">Thanks, your message was sent.</p>}
            {status === 'error' && (
              <p className="rounded-xl bg-red-100 p-4 text-red-900">Sorry, that did not send. Please call {restaurant.phoneDisplay}.</p>
            )}
          </div>
        </form>

        <InfoCard className="lg:col-span-5" />
      </section>
    </>
  );
}
