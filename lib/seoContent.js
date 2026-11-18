// Separate intent for each page; product specifications remain in siteConfig.js.
export const citrusPages = {
  oranges: {
    title: 'Oranges in Pakistan: Choose, Compare & Store Citrus',
    description: 'Compare kinnow and Malta oranges, learn what to check when selecting citrus, and explore Mr. Kinoow’s 10 kg boxes with an enquiry-based ordering process.',
    heading: 'A guide to oranges in Pakistan.',
    intro: 'Start with the fruit you enjoy, then choose the box that suits your household. This guide brings together the two citrus options in the Mr. Kinoow collection and practical questions to ask before ordering.',
    sections: [
      { heading: 'Kinnow and Malta: two choices in the collection', text: 'Mr. Kinoow lists Premium Export Kinnow and Premium Malta, both in 10 kg boxes. Kinnow is a mandarin; Malta is the orange product name used in this collection. Compare the individual product details rather than treating all orange-coloured citrus as the same fruit.' },
      { heading: 'How to select fresh oranges', text: 'Look for firm fruit without soft spots, visible mould or broken skin. Colour alone is not a reliable measure of eating quality. If buying a box remotely, ask about the current fruit size, condition and packing date before confirming the order.' },
      { heading: 'How to store oranges at home', text: 'Check the fruit when you unpack it and separate any damaged pieces. Keep fruit for near-term use away from direct sunlight in a ventilated container; wash it just before eating. Longer cold storage depends on the variety and condition of the fruit. A fixed shelf-life guarantee would be misleading.' },
      { heading: 'Before buying oranges online', text: 'Check the box weight, the amount you expect to use and the final delivery arrangement. On this website, adding a box to the bag prepares an enquiry. It does not reserve stock, take payment or confirm an order. Ask for the current price, availability and delivery coverage for your address.' },
    ],
    sources: [
      ['Orange quality — UC Davis Postharvest Research and Extension Center', 'https://postharvest.ucdavis.edu/produce-facts-sheets/orange'],
      ['Home storage guide — UC Davis', 'https://postharvest.ucdavis.edu/sites/g/files/dgvnsk12711/files/inline-files/230110.pdf'],
    ],
    productIds: ['premium-kinnow-10kg', 'malta-10kg'],
  },
  kinnow: {
    title: 'What Is Kinnow? Pakistan’s Mandarin Citrus Guide',
    description: 'Understand kinnow, how it differs from other oranges, and what seasonality means before enquiring about Mr. Kinoow’s premium 10 kg kinnow box.',
    heading: 'Kinnow, the mandarin in our collection.',
    intro: 'Looking for fresh kinnow is easier when you know what the name means. Explore the fruit, its place among Pakistan’s citrus varieties and the details of Mr. Kinoow’s 10 kg kinnow box.',
    sections: [
      { heading: 'What is kinnow?', text: 'Kinnow is a mandarin variety grown in Pakistan. Punjab’s Agriculture Department identifies it among the region’s citrus varieties. “Orange” is often used broadly in shopping conversations, but specifying kinnow helps distinguish the mandarin you want from other citrus choices.' },
      { heading: 'Kinnow vs orange', text: 'Kinnow identifies a particular mandarin variety; orange is a broader shopping term and can refer to sweet oranges as well. For the Mr. Kinoow collection, compare the Kinnow box with the separately listed Malta box. The product name, box weight and approximate fruit count are more useful than colour alone.' },
      { heading: 'Kinnow season in Pakistan', text: 'Citrus availability changes through the season and by variety. Punjab’s Agriculture Department describes a broader citrus harvest spanning November to April; that is not a promise that every variety or every Mr. Kinoow box is available throughout those months. Confirm the current kinnow picking and dispatch arrangements before ordering.' },
      { heading: 'Choosing a 10 kg kinnow box', text: 'The listed kinnow box contains approximately 45–48 fruit in 10 kg. Fruit size affects the count. Before confirming an enquiry, consider how quickly your household will use the fruit and ask for current availability, final price and delivery details.' },
    ],
    sources: [
      ['Citrus varieties — Punjab Agriculture Department', 'https://agripunjab.gov.pk/aari-cvCitrus'],
      ['Punjab citrus harvest background, 2018 study — Agriculture Department', 'https://www.agripunjab.gov.pk/system/files/Feasibility%20Study%20FCKJ%20Vol.%201.pdf'],
    ],
    productIds: ['premium-kinnow-10kg'],
  },
  malta: {
    title: 'Malta Oranges: Box Details & Buying Guide in Pakistan',
    description: 'Explore Mr. Kinoow’s Malta oranges, the listed 10 kg box and approximate fruit count, with practical questions to ask before an order enquiry in Pakistan.',
    heading: 'Choosing a box of Malta oranges.',
    intro: 'Premium Malta is the second citrus option in the Mr. Kinoow collection. Here is how to read the box details and decide what to confirm before sending an enquiry.',
    sections: [
      { heading: 'What the Malta listing tells you', text: 'The collection describes a 10 kg box of Malta oranges with around 60 fruit. That count is approximate, so compare boxes by weight as well as by the number of oranges. The listing does not identify a specific cultivar or promise a seed count.' },
      { heading: 'Malta or kinnow?', text: 'Both boxes have the same listed weight, but their approximate counts differ: around 60 Malta oranges versus 45–48 kinnow. Count alone does not establish sweetness or quality. If flavour, fruit size or ease of peeling matters to you, ask about the current batch before choosing.' },
      { heading: 'Reading the packaging illustration', text: 'The artwork shown with this listing is the existing citrus-box illustration. Its printed labels are not a specification of the Malta product. Use the written 10 kg product details, and request current packing information before confirming your enquiry.' },
      { heading: 'Planning your enquiry', text: 'Choose how many boxes you want, then use the shopping bag to prepare an enquiry. Confirm the current price, fruit availability and delivery arrangement for your address. The website does not take payment or confirm stock automatically.' },
    ],
    sources: [],
    productIds: ['malta-10kg'],
  },
};

export const productDetails = {
  'premium-kinnow-10kg': {
    guide: 'kinnow', count: 'Approximately 45–48 fruit',
    title: 'Premium Kinnow 10 kg Box — Pakistan Order Enquiry',
    description: 'View Mr. Kinoow’s Premium Export Kinnow 10 kg box, approximate 45–48 fruit count and indicative PKR price. Confirm availability and delivery by enquiry.',
    intro: 'A 10 kg kinnow box for households who want to plan their citrus purchase by weight. The listed fruit count is approximate and can vary with fruit size.',
    use: 'Before choosing a quantity, consider how much fruit you will use and how you will store the remainder. Read the kinnow guide for variety and season context, and the oranges guide for selection and storage advice.',
    imageNote: 'Citrus packaging illustration; actual packing should be confirmed with your enquiry.',
  },
  'malta-10kg': {
    guide: 'malta', count: 'Around 60 fruit',
    title: 'Premium Malta Oranges 10 kg Box — Pakistan Enquiry',
    description: 'Explore Mr. Kinoow’s Premium Malta 10 kg box with around 60 oranges and an indicative PKR price. Check final price, availability and delivery before ordering.',
    intro: 'A 10 kg box of Malta oranges, listed with around 60 fruit. Use the weight as the main comparison: the approximate count can change with the size of the oranges.',
    use: 'If you are comparing this box with the kinnow selection, both are listed at 10 kg. Ask about the current fruit size and batch before deciding; the difference in count does not by itself establish sweetness or quality.',
    imageNote: 'Existing citrus-box illustration. Printed Kinnow labels are not Malta specifications; the written listing is for 10 kg.',
  },
};
