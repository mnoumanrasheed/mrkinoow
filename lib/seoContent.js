// Editorial page intent only. Approved product specifications live in siteConfig.js.
export const citrusPages = {
  oranges: {
    title: 'Buy Fresh Kinnow Online in Pakistan',
    description: 'Explore Royal and Golden Kinnow collections from Mr. Kinoow. Choose larger or classic-size kinnows in 10 kg boxes, with free delivery across Pakistan.',
    heading: 'Sunshine, beautifully boxed.',
    intro: 'Two thoughtfully selected kinnow collections, grown on our own farm and delivered fresh to your doorstep.',
    sections: [
      { heading: 'Two collections, distinguished by size', text: 'The Royal Kinnow Collection contains larger kinnows. The Golden Kinnow Collection contains comparatively smaller kinnows from the same farm. Both receive the same attention to selection, packing and presentation.' },
      { heading: 'A full 10 KG of fruit', text: 'Each box contains 10 KG net fruit weight. The box and all other packaging are excluded from that weight. Because fruit size varies naturally, Mr. Kinoow does not publish or guarantee an exact number of kinnows per box.' },
      { heading: 'From our own farm', text: 'Both collections are grown and selected at our own farm. The fruit is presented without artificial polishing or added preservatives.' },
      { heading: 'Ordering and delivery', text: 'Add your preferred collection to the bag to prepare a WhatsApp order enquiry. Delivery is free across Pakistan via Leopards Courier, and a harvesting and packing video is shared with every order via WhatsApp.' },
    ],
    sources: [],
    productIds: ['premium-kinnow-10kg', 'orchard-select-10kg'],
  },
  kinnow: {
    title: 'Kinnow Collection in Pakistan | 10 KG Boxes',
    description: 'Compare Royal larger-size and Golden classic-size kinnows from Mr. Kinoow, available in 10 kg net fruit boxes with free delivery across Pakistan.',
    heading: 'Choose your kinnow collection.',
    intro: 'Royal and Golden are two size selections from the same Mr. Kinoow farm. Choose the fruit size you prefer; the care, net fruit weight and delivery benefit remain consistent.',
    sections: [
      { heading: 'Royal: the larger fruit selection', text: 'The Royal Kinnow Collection is for those who prefer a larger kinnow. Each box contains 10 KG net fruit weight, excluding packaging.' },
      { heading: 'Golden: the classic fruit selection', text: 'The Golden Kinnow Collection features comparatively smaller kinnows from the same farm. Each box contains 10 KG net fruit weight, excluding packaging.' },
      { heading: 'The same care for both collections', text: 'Neither collection uses artificial polishing or added preservatives. Royal describes fruit size only; it does not claim different flavour, sweetness, nutrition or quality.' },
      { heading: 'A transparent WhatsApp order', text: 'The shopping bag prepares an order enquiry for WhatsApp. Availability and order details are confirmed there, and a harvesting and packing video is shared with every order.' },
    ],
    sources: [],
    productIds: ['premium-kinnow-10kg', 'orchard-select-10kg'],
  },
  // Legacy public URL retained as a clear collection notice; it is not linked or indexed.
  malta: {
    title: 'Current Mr. Kinoow Collection Update',
    description: 'Mr. Kinoow currently offers Royal and Golden Kinnow Collections. Malta is not part of the current collection.',
    heading: 'Our current collection is kinnow.',
    intro: 'Malta is not part of the current Mr. Kinoow collection. This page is retained only so an older link does not lead to an error.',
    sections: [
      { heading: 'Explore the current collection', text: 'Choose the Royal Kinnow Collection for larger kinnows or the Golden Kinnow Collection for comparatively smaller kinnows. Both contain 10 KG net fruit weight, excluding packaging.' },
      { heading: 'Order through WhatsApp', text: 'Current availability and order details are confirmed through WhatsApp. Delivery is free across Pakistan via Leopards Courier.' },
    ],
    sources: [],
    productIds: [],
    legacy: true,
  },
};

export const productDetails = {
  'premium-kinnow-10kg': {
    guide: 'kinnow',
    title: 'The Royal Kinnow Collection — 10 KG Box',
    description: 'Choose larger kinnows in the Royal Kinnow Collection: 10 kg net fruit weight for Rs. 2,599, with free delivery across Pakistan.',
    use: 'Choose Royal when you prefer larger kinnows. The distinction from Golden is fruit size; no exact fruit count is published or guaranteed.',
    imageNote: 'Royal Kinnow Collection packaging illustration.',
  },
  'orchard-select-10kg': {
    guide: 'kinnow',
    title: 'The Golden Kinnow Collection — 10 KG Box',
    description: 'Choose classic-size kinnows in the Golden Kinnow Collection: 10 kg net fruit weight for Rs. 2,499, with free delivery across Pakistan.',
    use: 'Choose Golden when you prefer comparatively smaller kinnows. The distinction from Royal is fruit size; no exact fruit count is published or guaranteed.',
    imageNote: 'Golden Kinnow Collection packaging illustration.',
  },
};
