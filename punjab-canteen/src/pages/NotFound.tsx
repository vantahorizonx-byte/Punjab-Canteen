import Button from '../components/Button';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found – Punjab Canteen', 'This page could not be found.');
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 text-center">
      <p className="font-display text-8xl font-extrabold text-saffron">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-maroon">This page is not on the menu</h1>
      <div className="mt-8 flex justify-center gap-3">
        <Button to="/" variant="maroon">Home</Button>
        <Button to="/menu" variant="outlineDark">View Menu</Button>
      </div>
    </section>
  );
}
