/**
 * Gallery images. To replace a photo, drop a new file into /public/images and keep the same
 * file name (or change `src`). Update w/h to the real pixel size for best layout stability.
 */
export type GalleryImage = { id: string; src: string; alt: string; caption: string; w: number; h: number };

export const galleryImages: GalleryImage[] = [
  { id: 'exterior-night', src: '/images/exterior-night.jpg', alt: 'Punjab Canteen entrance in Wakad lit up at night with its neon sign', caption: 'The entrance after dark', w: 480, h: 638 },
  { id: 'thali-large', src: '/images/thali-large.jpg', alt: 'A large steel thali platter with a stuffed paratha, katoris of dal and sabzi, and a sweet', caption: 'A full thali platter', w: 515, h: 388 },
  { id: 'dining-truck', src: '/images/dining-truck.jpg', alt: 'Dining area with pink-topped tables and a painted truck-art front reading Punjab Canteen', caption: 'Truck-art dining area', w: 554, h: 554 },
  { id: 'thali-steel', src: '/images/thali-steel.jpg', alt: 'Round steel thali with naan, katoris of chhole and dal makhani, raita and a sweet', caption: 'Thali served in katoris', w: 422, h: 473 },
  { id: 'exterior-day', src: '/images/exterior-day.jpg', alt: 'Punjab Canteen storefront by day with planters and a colourful signboard', caption: 'The storefront by day', w: 335, h: 597 },
  { id: 'thali-spread', src: '/images/thali-spread.jpg', alt: 'Wooden platter with several bowls of dal, sabzi, rice, raita, roti and sweets', caption: 'A spread of katoris', w: 294, h: 171 },
  { id: 'dining-yellow', src: '/images/dining-yellow.jpg', alt: 'Indoor dining hall with wooden tables, yellow cushioned chairs and painted wall art', caption: 'Indoor seating', w: 259, h: 194 },
];
