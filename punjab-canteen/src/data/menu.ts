/** Complete menu. Edit prices/items here; the Menu page, search and Home highlights update automatically. */
export type MenuItem = { name: string; price: number; seasonal?: boolean };
export type MenuCategory = { id: string; label: string; note?: string; items: MenuItem[] };
export type ParathaRow = { name: string; simple: number; thali: number };

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const categories: MenuCategory[] = [
  {
    id: 'shorba',
    label: 'Shorba',
    items: [
      { name: 'Tamatar Shorba', price: 150 },
      { name: 'Palak Shorba', price: 150 },
      { name: 'Dal Dhaniya Shorba', price: 150 },
    ],
  },
  {
    id: 'papad-chaats',
    label: 'Papad & Chaats',
    items: [
      { name: 'Masala Papad', price: 80 },
      { name: 'Aloo Tikki Chhole Chaat', price: 150 },
      { name: 'Dahl Papdi Chaat', price: 150 },
      { name: 'Dahi Bhalla Papdi Chaat', price: 160 },
      { name: 'Samosa Chhole Chaat', price: 160 },
    ],
  },
  {
    id: 'starters',
    label: 'Indian Starters',
    items: [
      { name: 'Amritsari Paneer Tikka', price: 280 },
      { name: 'Pahadi Paneer Tikka', price: 280 },
      { name: 'Malai Paneer Tikka', price: 290 },
      { name: 'Tandoori Soya Chaap Tikka', price: 250 },
      { name: 'Malai Soya Chaap Tikka', price: 270 },
      { name: 'Pahadi Soya Chaap Tikka', price: 250 },
      { name: 'Schezwan Paneer Chilli', price: 300 },
      { name: 'Hara Bhara Kebab', price: 260 },
      { name: 'Tandoori Mushroom Cheese Tikka', price: 290 },
      { name: 'Punjab Canteen Platter', price: 780 },
    ],
  },
  { id: 'parathas', label: 'Hatke Parathas', items: [] }, // rendered from `parathas` below
  {
    id: 'specials',
    label: 'Punjab Canteen Specials',
    items: [
      { name: 'Chur Chur Naan Thali', price: 340 },
      { name: 'Tandoori Kulcha Chhole', price: 300 },
      { name: 'Tandoori Kulcha Dal Makhani', price: 300 },
      { name: 'Chhole Bhature', price: 260 },
      { name: 'Sarson Ka Saag, Makki Di Roti', price: 290, seasonal: true },
    ],
  },
  {
    id: 'kulcha-thalis',
    label: 'Stuffed Kulcha Thalis',
    note: 'Modification of Thalis is not allowed.',
    items: [
      { name: 'Aloo Kulcha Thali', price: 310 },
      { name: 'Gobhi Kulcha Thali', price: 310 },
      { name: 'Mix Kulcha Thali', price: 320 },
      { name: 'Paneer Kulcha Thali', price: 330 },
      { name: 'Cheese & Onion Kulcha Thali', price: 330 },
      { name: 'Cheese & Garlic Kulcha Thali', price: 330 },
    ],
  },
];

export const parathaIntro = {
  simple: {
    title: 'Simply Paratha',
    parts: ['Paratha', 'Aloo ki sabzi (thin gravy)', 'Boondi Raita', 'Salad'],
  },
  thali: {
    title: 'Paratha Thali',
    parts: ['Paratha', 'Aloo ki sabzi (thin gravy)', 'Chhole', 'Dal Makhani', 'Boondi Raita', 'Salad'],
  },
  note: 'Thali modifications are not allowed.',
};

export const parathas: ParathaRow[] = [
  { name: 'Aloo Paratha', simple: 180, thali: 270 },
  { name: 'Aloo Gobhi Paratha', simple: 180, thali: 270 },
  { name: 'Aloo Cheese Paratha', simple: 190, thali: 280 },
  { name: 'Gobhi Paratha', simple: 180, thali: 270 },
  { name: 'Onion Paratha', simple: 180, thali: 270 },
  { name: 'Mooli Paratha', simple: 180, thali: 270 },
  { name: 'Methi Paratha', simple: 180, thali: 270 },
  { name: 'Green Peas Paratha', simple: 190, thali: 280 },
  { name: 'Hari Mirch Paratha', simple: 180, thali: 270 },
  { name: 'Paneer Paratha', simple: 200, thali: 290 },
  { name: 'Cheese Paratha', simple: 200, thali: 290 },
  { name: 'Cheese Chilli Paratha', simple: 200, thali: 290 },
  { name: 'Cheese Garlic Paratha', simple: 200, thali: 290 },
  { name: 'Paneer Chilli Paratha', simple: 200, thali: 290 },
  { name: 'Paneer Cheese Garlic Paratha', simple: 210, thali: 300 },
  { name: 'Sweet Corn Methi Paratha', simple: 200, thali: 290 },
  { name: 'Sweet Corn Cheese Paratha', simple: 210, thali: 300 },
  { name: 'Mushroom Paratha', simple: 200, thali: 290 },
  { name: 'Mushroom Paneer Paratha', simple: 210, thali: 300 },
  { name: 'Mushroom Cheese Paratha', simple: 210, thali: 300 },
  { name: 'Lasooni Dal Paratha', simple: 180, thali: 270 },
  { name: 'Mixed Vegetable Paratha', simple: 200, thali: 290 },
  { name: 'Aloo Schezwan Paratha', simple: 190, thali: 280 },
  { name: 'Paneer Schezwan Paratha', simple: 200, thali: 290 },
  { name: 'Mutter Paneer Paratha', simple: 210, thali: 300 },
  { name: 'Vegetable Dillwala Paratha', simple: 200, thali: 290 },
  { name: 'Paneer Bhurji Paratha', simple: 210, thali: 300 },
];

export const getItem = (catId: string, name: string) =>
  categories.find((c) => c.id === catId)?.items.find((i) => i.name === name);
