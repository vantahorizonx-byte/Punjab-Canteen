# Punjab Canteen (पंजाब कैंटीन) – Website

React + Vite + TypeScript + Tailwind + Framer Motion + Lucide. 3D hero uses Three.js / React Three Fiber and is lazy-loaded on the Home page only.
No ordering, cart, checkout, payments, login, or backend. Supabase and Composio are not used.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # optional TypeScript check
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```
Requires Node 18+ (Node 20 recommended).

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: Add New > Project > import the repo. Framework preset: Vite (auto-detected). Build command `npm run build`, output `dist`.
3. Deploy. `vercel.json` already rewrites all routes to `index.html`, so /menu, /contact etc. work on refresh.
4. (Optional) CLI instead: `npm i -g vercel && vercel --prod`.
5. After you have the live domain, add it to `index.html` as `og:url`, `<link rel="canonical">`, and a `url` field inside the JSON-LD block, and make `og:image` an absolute URL (https://yourdomain/images/exterior-night.jpg).

## Environment variables (all optional)
Copy `.env.example` to `.env.local` for local use; on Vercel add them under Project > Settings > Environment Variables.
| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_MAPS_EMBED_KEY` | Google Maps Embed API key. Without it, the key-less embed is used. Restrict the key to your domain. |
| `VITE_FORM_ENDPOINT` | URL that accepts a JSON POST (Formspree, Getform, own API). Without it the contact form does not send and tells visitors to call. |
`VITE_` variables are public in the browser bundle. Never put private keys here.

## Where to change things
| What | File |
|---|---|
| Name, phone, address, rating, review count, price range, closing time, nav links, map/directions links | `src/data/restaurant.ts` |
| Menu items, prices, categories, paratha table, thali notes | `src/data/menu.ts` |
| Gallery photos + alt text + captions | `src/data/gallery.ts` and files in `public/images/` |
| Review themes | `src/data/reviews.ts` |
| Colours / fonts | `tailwind.config.js`, `index.html` (font link) |
| Page titles & descriptions | top of each file in `src/pages/` (`usePageMeta`) |
| Default SEO tags + structured data | `index.html` |
| 3D plate and floating spices | `src/components/Hero3D.tsx` |

## Structure
```
index.html  vercel.json  tailwind.config.js  vite.config.ts  .env.example
public/  favicon.svg  robots.txt  images/*.jpg
src/
  main.tsx  App.tsx  index.css
  data/        restaurant.ts  menu.ts  gallery.ts  reviews.ts
  hooks/       usePageMeta.ts
  components/  Navbar  MobileBar  Footer  Button  Reveal  TiltCard  Stars  SectionHeading
               InfoCard  Lightbox  HeroVisual  Hero3D (lazy)
  pages/       Home  MenuPage  About  Gallery  Reviews  Location  Contact  NotFound
```

## Notes
- The bundled photos are small (the longest side is ~600px). Replace them with the restaurant's original high-resolution photos, keeping file names, for a sharper result.
- Confirm that every bundled photo is of Punjab Canteen before presenting it as such.
- Rating and review count are supplied figures and are labelled that way. Structured data intentionally omits aggregateRating.
