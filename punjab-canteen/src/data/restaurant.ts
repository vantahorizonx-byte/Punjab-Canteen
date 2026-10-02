/**
 * SINGLE SOURCE OF TRUTH for restaurant details.
 * Edit this file to change the name, phone, address, rating, etc. everywhere on the site.
 */
export const restaurant = {
  name: 'Punjab Canteen',
  nameHi: 'पंजाब कैंटीन',
  tagline: 'Authentic Punjabi Flavours in Wakad',
  area: 'Wakad, Pune',

  phoneDisplay: '077991 18212',
  phoneTel: '+917799118212', // used for tel: links

  addressLines: [
    'Shop No 1, 2, SOLITAIRE PARADISE,',
    'Kaspate Wasti Rd,',
    'Shankar Kalat Nagar,',
    'Wakad,',
    'Pimpri-Chinchwad,',
    'Pune, Maharashtra 411057',
  ],

  priceRange: '₹200–₹400 per person',
  rating: 4.4,
  reviewCount: 68,
  listedClosing: '11:00 PM',
};

export const addressOneLine =
  'Punjab Canteen, Shop No 1, 2, Solitaire Paradise, Kaspate Wasti Rd, Shankar Kalat Nagar, Wakad, Pimpri-Chinchwad, Pune, Maharashtra 411057';

export const telHref = `tel:${restaurant.phoneTel}`;

/** Opens Google Maps directions (app on phones) to the restaurant address. No coordinates needed. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOneLine)}`;

/** Opens a Google Maps search for the restaurant (used for "see reviews"). */
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Punjab Canteen Wakad Pune')}`;

const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY;
/** Uses the official Embed API when a key is set; otherwise the key-less embed. */
export const mapEmbedUrl = mapsKey
  ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${encodeURIComponent(addressOneLine)}`
  : `https://www.google.com/maps?q=${encodeURIComponent(addressOneLine)}&output=embed`;

export const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/location', label: 'Location' },
  { to: '/contact', label: 'Contact' },
];
