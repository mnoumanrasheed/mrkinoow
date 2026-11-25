/**
 * BRAND & STOREFRONT CONFIGURATION
 * Verified luxury orchard launch details for Mr. Kinoow.
 * Static website architecture: orders are directed via verified WhatsApp conversation.
 */
export const siteConfig = {
  brand: 'Mr. Kinoow',
  slogan: 'From Our Farm to Your Doorstep.',
  email: '', // Configurable email address
  whatsapp: '923130468211', // Verified WhatsApp number (03130468211) in international format
  whatsappDisplay: '0313 0468211',
  whatsappDirectUrl: 'https://wa.me/923130468211',
  instagram: 'https://www.instagram.com/mr.kinoow/',
  facebook: 'https://www.facebook.com/profile.php?id=61596274775405',
  tiktok: 'https://www.tiktok.com/@mr..kinoow?lang=en',
  linkedin: 'https://www.linkedin.com/company/mr-kinoow',
  location: 'Punjab, Pakistan',

  courier: {
    partner: 'Leopards Courier',
    heading: 'Complimentary Nationwide Delivery',
    description: 'Free delivery across Pakistan via Leopards Courier.',
    freeDelivery: true,
  },

  farming: {
    heading: 'From Our Own Farm',
    description: 'Grown and selected at our own farm, without artificial polishing or added preservatives.',
    promise: 'From our own farm. Thoughtfully selected and packed.',
  },

  transparency: {
    heading: 'See Your Order Prepared',
    description: 'A harvesting and packing video is shared with every order via WhatsApp.',
  },

  cta: {
    heading: 'Bring Home the Harvest',
    supporting: 'Thoughtfully selected on our own farm, carefully packed, and delivered to your doorstep.',
    buttonText: 'Explore Our Selections',
  },

  products: [
    {
      id: 'premium-kinnow-10kg',
      collectionNumber: '01',
      title: 'The Royal Kinnow Collection',
      categoryEyebrow: 'LARGER FRUIT SELECTION',
      weight: '10 KG',
      netWeightNotice: '10 KG NET FRUIT WEIGHT',
      packagingNote: 'Packaging weight excluded.',
      weightLabel: '10kg Royal Kinnow Collection Box',
      price: 2599,
      image: '/images/box-10kg.svg',
      imageAlt: 'The Royal Kinnow Collection 10 kg box',
      description: 'For those who prefer a larger kinnow. Our Royal Collection brings together carefully selected, generously sized fruit from our own farm, packed with care and delivered to your doorstep.',
      highlights: ['10 KG Net Fruit', 'Larger Kinnows', 'Free Delivery'],
      sizeDescription: 'Larger kinnows compared with the Golden Collection.',
    },
    {
      id: 'orchard-select-10kg',
      collectionNumber: '02',
      title: 'The Golden Kinnow Collection',
      categoryEyebrow: 'CLASSIC FRUIT SELECTION',
      weight: '10 KG',
      netWeightNotice: '10 KG NET FRUIT WEIGHT',
      packagingNote: 'Packaging weight excluded.',
      weightLabel: '10kg Golden Kinnow Collection Box',
      price: 2499,
      image: '/images/box-5kg.svg',
      imageAlt: 'The Golden Kinnow Collection 10 kg box',
      description: 'A classic choice for everyday enjoyment. Our Golden Collection features comparatively smaller kinnows from the same farm, selected and packed with the same attention to care and freshness.',
      highlights: ['10 KG Net Fruit', 'Classic Size Kinnows', 'Free Delivery'],
      sizeDescription: 'Comparatively smaller kinnows from the same farm.',
    }
  ],

  founders: [
    {
      name: 'Dr Ebbad Nazir',
      role: 'Founder & CEO',
      image: '/images/founder.png',
      bio: 'Guiding the vision, brand standards and orchard-to-doorstep experience of Mr. Kinoow.',
      initials: 'EN',
    },
    {
      name: 'M. Nouman',
      role: 'Co-Founder & Managing Director',
      image: '/images/co-founder.png',
      bio: 'Leading operational excellence, farm harvesting standards and customer fulfillment nationwide.',
      initials: 'MN',
    },
  ],
};

// Keeps bags saved by the earlier collection naming compatible with the current product.
export const productIdAliases = { 'malta-10kg': 'orchard-select-10kg' };

export const formatPrice = (value) => `Rs. ${Number(value).toLocaleString('en-PK')}`;

/**
 * Builds the verified WhatsApp order message for cart entries.
 * Meets exact Phase 8 business requirements.
 */
export function generateWhatsAppOrderMessage(entries, total) {
  const itemsText = entries.map(p =>
    `• ${p.title} (${p.weight}) x ${p.qty} — Unit Price: ${formatPrice(p.price)} — Subtotal: ${formatPrice(p.price * p.qty)}`
  ).join('\n');

  return `Hello Mr. Kinoow!

I would like to place an order.

ORDER DETAILS

${itemsText}

Total: ${formatPrice(total)}

Net Fruit Weight: 10 KG per box (packaging excluded)

Delivery: FREE across Pakistan via ${siteConfig.courier.partner}

Harvesting and packing reference video: Included with every order through WhatsApp.

CUSTOMER DETAILS

Name: 
City: 
Full Delivery Address: 
Contact Number: 

Please confirm availability, order details and delivery arrangements.

Thank you!`;
}
