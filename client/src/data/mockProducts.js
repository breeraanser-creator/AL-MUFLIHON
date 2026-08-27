export const INITIAL_PRODUCTS = [
  {
    _id: 'prod-001',
    name: 'Al-Muflihon Imperial Royal Plum Thobe',
    sku: 'AMF-THB-001',
    description: 'Mastercrafted traditional Saudi cut thobe in bespoke imperial plum with subtle tonal embroidery on the collar and cuffs. Tailored from breathable luxury linen-cotton blend.',
    price: 8999,
    discountPrice: 7499,
    category: 'Thobes',
    subCategory: 'Royal Modest Wear',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Imperial Plum', hexCode: '#601D49' },
      { name: 'Warm Cream', hexCode: '#FDF4D2' },
      { name: 'Onyx Black', hexCode: '#1A1A1A' }
    ],
    fabric: 'Linen & Egyptian Giza Cotton Blend',
    careInstructions: 'Dry clean recommended. Gentle hand wash inside out in cold water.',
    stock: 35,
    rating: 4.9,
    numReviews: 28,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    _id: 'prod-002',
    name: 'Noor-e-Kashmir Handwoven Embroidered Shawl',
    sku: 'AMF-SHW-002',
    description: 'Heritage handwoven pure wool shawl featuring subtle rose-gold and sage tilla borders. Designed for prestigious occasions and unmatched warmth with regal poise.',
    price: 14500,
    discountPrice: 12999,
    category: 'Luxury Shawls',
    subCategory: 'Heritage Accessories',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L'],
    colors: [
      { name: 'Imperial Plum', hexCode: '#601D49' },
      { name: 'Soft Rose', hexCode: '#EA9D9D' },
      { name: 'Sage Green', hexCode: '#8BBB92' }
    ],
    fabric: '100% Pure Fine Wool & Cashmere',
    careInstructions: 'Strictly dry clean only. Store in protective garment bag.',
    stock: 20,
    rating: 5.0,
    numReviews: 19,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    _id: 'prod-003',
    name: 'Zahra Velvet & Silk Embellished Abaya',
    sku: 'AMF-ABY-003',
    description: 'Opulent flowing abaya crafted with delicate plum silk-velvet accents and hand-sewn metallic lace detailing. Comes with a matching premium chiffon sheila scarf.',
    price: 11999,
    discountPrice: 9999,
    category: 'Abayas',
    subCategory: 'Occasion Wear',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Imperial Plum', hexCode: '#601D49' },
      { name: 'Ivory Cream', hexCode: '#FDF4D2' },
      { name: 'Blush Rose', hexCode: '#EA9D9D' }
    ],
    fabric: 'Nida Fabric with Velvet Accents',
    careInstructions: 'Dry clean only. Steam iron lightly from 6 inches away.',
    stock: 28,
    rating: 4.8,
    numReviews: 42,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    _id: 'prod-004',
    name: 'Sultan Pure Linen Kurta Trouser Set',
    sku: 'AMF-KRT-004',
    description: 'Elegantly tailored men’s kurta suit with band collar and mother-of-pearl buttons. Breathable, crisp fabric perfect for festive gatherings and Friday prayers.',
    price: 6499,
    discountPrice: 5499,
    category: 'Kurta Collection',
    subCategory: 'Menswear',
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Warm Cream', hexCode: '#FDF4D2' },
      { name: 'Sage Green', hexCode: '#8BBB92' },
      { name: 'Imperial Plum', hexCode: '#601D49' }
    ],
    fabric: 'Pure Irish Linen',
    careInstructions: 'Machine wash gentle or hand wash. Medium iron with steam.',
    stock: 50,
    rating: 4.7,
    numReviews: 31,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    _id: 'prod-005',
    name: 'Al-Muflihon Signature Crest Cufflinks & Ring Set',
    sku: 'AMF-ACC-005',
    description: 'Hand-cast solid brass cufflinks and matching signet ring with engraved Al-Muflihon monogram in antiqued gold and plum enamel inlay.',
    price: 3499,
    discountPrice: 2999,
    category: 'Accessories',
    subCategory: 'Jewelry',
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Custom'],
    colors: [
      { name: 'Antique Gold', hexCode: '#D4AF37' },
      { name: 'Silver Polished', hexCode: '#C0C0C0' }
    ],
    fabric: 'Cast Brass & Enamel',
    careInstructions: 'Avoid direct spray of perfumes and water. Wipe with microfibre cloth.',
    stock: 60,
    rating: 4.9,
    numReviews: 15,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false
  },
  {
    _id: 'prod-006',
    name: 'Breeze Pastel Silk Scarf Collection',
    sku: 'AMF-SCF-006',
    description: 'Featherlight modal-silk blend hijab and neck scarf in soothing rose and sage hues. Breathable weave with non-slip finish for all-day comfort.',
    price: 2499,
    discountPrice: 1999,
    category: 'Accessories',
    subCategory: 'Scarves & Hijabs',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L'],
    colors: [
      { name: 'Soft Rose', hexCode: '#EA9D9D' },
      { name: 'Sage Green', hexCode: '#8BBB92' },
      { name: 'Warm Cream', hexCode: '#FDF4D2' }
    ],
    fabric: '70% Modal, 30% Mulberry Silk',
    careInstructions: 'Hand wash in cold water with mild silk detergent.',
    stock: 45,
    rating: 4.8,
    numReviews: 22,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false
  }
];
