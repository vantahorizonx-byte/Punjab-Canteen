import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import Home from './pages/Home';

// Code-split every non-home page.
const MenuPage = lazy(() => import('./pages/MenuPage'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Location = lazy(() => import('./pages/Location'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[100] rounded bg-saffron px-4 py-2 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1 pb-20 md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/location" element={<Location />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
