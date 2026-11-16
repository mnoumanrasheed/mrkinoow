/**
 * ONLY EDIT THIS FILE TO CUSTOMIZE THE BRAND.
 * Product prices and descriptions below are the current storefront details.
 * Website is frontend-only. No database, payment gateway or order collection server.
 */
export const siteConfig = {
  brand: 'Mr. Kinoow',
  slogan: 'From our orchards to your doorstep.',
  email: '', // e.g. hello@yourdomain.com
  whatsapp: '', // digits with country code e.g. 923001234567 ; blank hides WhatsApp order button
  instagram: '', // full HTTPS URL
  facebook: '', // full HTTPS URL
  location: 'Punjab, Pakistan',
  products: [
    {
      id: 'premium-kinnow-10kg',
      title: 'Premium Export Kinnow',
      weight: '10 KG',
      weightLabel: '10kg Premium Export Kinnow Box',
      price: 2499,
      image: '/images/box-10kg.svg',
      subtitle: '45-48 juicy kinnow from our own farm. Export quality, 100% natural, no artificial preservatives, premium packing and free delivery.',
    },
    {
      id: 'malta-10kg',
      title: 'Premium Malta',
      weight: '10 KG',
      weightLabel: '10kg Malta Orange Box',
      price: 2399,
      image: '/images/box-5kg.svg',
      subtitle: 'Around 60 naturally sweet Malta oranges from our own farm. Fully juicy, naturally unpolished, no artificial preservatives, premium packing and free delivery.',
    },
  ],
  founders: [
    {
      name: 'Founder Name',
      role: 'Founder & Executive Director',
      image: '/images/founder.png',
      bio: 'Shaping the vision, identity and future of Mr. Kinoow.',
      initials: '01',
    },
    {
      name: 'Co-Founder Name',
      role: 'Co-Founder',
      image: '/images/co-founder.png',
      bio: 'Bringing the experience to life, from careful selection to the customer.',
      initials: '02',
    },
  ],
};

export const formatPrice = (value) => `Rs. ${Number(value).toLocaleString('en-PK')}`;
