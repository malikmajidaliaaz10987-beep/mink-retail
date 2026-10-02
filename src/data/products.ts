import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'mink-amalfi-medallion-slide',
    name: 'The Mink Signature Cutout Leather Slide',
    slug: 'mink-signature-cutout-leather-slide',
    tagline: 'Handcrafted artisan cutout leather slides with embossed mink insignia on cushioned footbed',
    price: 148,
    originalPrice: 185,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    category: 'footwear',
    categoryName: 'Footwear & Slides',
    images: [
      '/src/assets/images/mink_hero_slide_1790941017286.jpg',
      '/src/assets/images/mink_slide_cognac_1790941030740.jpg',
      '/src/assets/images/mink_slide_detail_1790941043774.jpg',
      '/src/assets/images/mink_slide_black_1790941055290.jpg'
    ],
    colors: [
      { name: 'Artisan Cognac & Waffle Towel', hex: '#8B5A2B' },
      { name: 'Noir Black Italian Leather', hex: '#1C1C1C' },
      { name: 'Warm Saddle Tan', hex: '#A3704C' }
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    rating: 4.9,
    reviewCount: 142,
    description: 'The defining icon of Mink Retail. Handcrafted from top-grade Italian calfskin leather, this slide features our signature intricate cutout upper band and an ergonomically padded leather insole embossed with the authentic "mink" logo. Styled effortlessly on coastal resort getaways or city strolls with unmatched memory-foam support.',
    highlights: [
      'Authentic "mink" logo embossed on cushioned vegetable-tanned leather insole',
      'Artisan interlocking cutout upper band with smooth hand-finished edges',
      'Plush 5mm high-resilience memory foam arch support for all-day wear',
      'Supple full-grain calfskin leather that softens beautifully with age',
      'Anti-slip grooved rubber outsole engineered for resort decking & pavement'
    ],
    materials: 'Upper: 100% Full-Grain Italian Calfskin. Insole & Lining: 100% Nappa Leather. Sole: Flexible Traction Rubber.',
    fit: 'True to US size. If between sizes or if you have a wider instep, we recommend sizing up one half size.',
    stock: 24,
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        location: 'Santa Monica, CA',
        rating: 5,
        date: 'September 14, 2026',
        title: 'Exquisite craftsmanship — better than designer pairs at 3x the price',
        comment: 'I ordered the Cognac Mink slides for my trip to Hawaii. The leather is buttery soft right out of the box, zero rubbing, and the embossed mink insole looks deeply luxurious. Got compliments everywhere.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Morgan Phillips',
        location: 'Dallas, TX',
        rating: 5,
        date: 'September 08, 2026',
        title: 'The insole padding is heavenly',
        comment: 'Usually flat slides hurt my arches after an hour, but Mink put real cushioning into these. Sturdy, elegant, and the packaging was immaculate.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-saint-tropez-cutout-slide',
    name: 'The Mink Noir Architectural Slide',
    slug: 'mink-noir-architectural-slide',
    tagline: 'Deep black Italian leather with signature geometric cutout upper and padded footbed',
    price: 135,
    originalPrice: 165,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    category: 'footwear',
    categoryName: 'Footwear & Slides',
    images: [
      '/src/assets/images/mink_slide_black_1790941055290.jpg',
      '/src/assets/images/mink_slide_detail_1790941043774.jpg',
      '/src/assets/images/mink_slide_cognac_1790941030740.jpg',
      '/src/assets/images/mink_hero_slide_1790941017286.jpg'
    ],
    colors: [
      { name: 'Noir Black & Natural Raffia', hex: '#1A1A1A' },
      { name: 'Cognac Brown & Raffia', hex: '#7A431D' },
      { name: 'Bespoke Latte & Cream', hex: '#D6C5B3' }
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    rating: 4.8,
    reviewCount: 98,
    description: 'A timeless silhouette reimagined with modern restraint. The Saint-Tropez Cutout Slide features a bold architectural H-cutout upper wrapped in smooth glove leather and filled with artisanal woven raffia from Madagascar. A staple for breezy linen trousers or sunlit patio dinners.',
    highlights: [
      'Artisanal hand-cut silhouette with hand-lacquered edge staining',
      'Natural wild-harvested Madagascan raffia weave',
      'Contoured leather footbed with tonal hot-stamp Mink insignia',
      'Ultra-lightweight heel tap for graceful walking cadence'
    ],
    materials: 'Upper: Premium smooth cowhide leather & 100% natural raffia. Insole: Nappa leather with padded heel cradle.',
    fit: 'True to standard US sizing. Relaxed width across instep.',
    stock: 18,
    reviews: [
      {
        id: 'rev-3',
        author: 'Camila Rodriguez',
        location: 'Miami, FL',
        rating: 5,
        date: 'September 12, 2026',
        title: 'Chicest summer staple in my closet',
        comment: 'The contrast of the black leather outline and the natural raffia texture is perfection. Looks gorgeous with white linen dresses and jeans alike.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-capri-raffia-slide',
    name: 'The Mink Capri Raffia Slide',
    slug: 'mink-capri-raffia-slide',
    tagline: 'Warm camel leather silhouette with honey woven raffia paneling',
    price: 135,
    originalPrice: 170,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isTrending: false,
    category: 'footwear',
    categoryName: 'Footwear & Slides',
    images: [
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Camel & Honey Raffia', hex: '#C19A6B' },
      { name: 'Espresso & Sand', hex: '#3E2723' },
      { name: 'Alabaster White', hex: '#F7F6F2' }
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    rating: 4.9,
    reviewCount: 76,
    description: 'The essence of golden-hour Riviera style. Crafted with smooth warm camel calfskin and structured natural raffia, the Capri slide offers an understated, luxurious look that elevates both poolside lounging and city excursions.',
    highlights: [
      'Micro-stitch detailing along the perimeter edges',
      'Breathable natural woven fiber promotes air circulation',
      'Mink dual-density cushioning absorbs step impact',
      'Treated water-resistant leather footbed'
    ],
    materials: 'Upper: Hand-dyed calf leather and raffia fiber. Sole: Leather-wrapped heel with non-slip composite base.',
    fit: 'True to size. Footbed softly molds to foot shape over initial wear.',
    stock: 31,
    reviews: [
      {
        id: 'rev-4',
        author: 'Sloane Taylor',
        location: 'Charleston, SC',
        rating: 5,
        date: 'August 28, 2026',
        title: 'Such high quality!',
        comment: 'The camel leather is warm and rich. The raffia doesn’t snag or fray. Mink has officially replaced my other high-end designer slides.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-riviera-sculpted-loop-slide',
    name: 'The Mink Riviera Sculpted Loop Slide',
    slug: 'mink-riviera-sculpted-loop-slide',
    tagline: 'Artisanal tubular loop weave in butter-soft blush nude leather',
    price: 155,
    originalPrice: 195,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    category: 'footwear',
    categoryName: 'Footwear & Slides',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Nude', hex: '#E8D3C5' },
      { name: 'Olive Sage', hex: '#7D8471' },
      { name: 'Rich Caramel', hex: '#9E5B32' }
    ],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    rating: 5.0,
    reviewCount: 64,
    description: 'Indulge in sculpted minimalism. The Riviera slide features seamless hand-rolled leather tubes artfully interwoven into a fluid, ergonomic cage across the instep. In an effortless blush nude tone that elongates the leg.',
    highlights: [
      'Padded tubular Italian calf leather straps for zero pinch points',
      'Subtle modern square toe silhouette',
      'Sculpted arch with reinforced leather mid-shank',
      'Individually boxed with cotton travel dust bag'
    ],
    materials: '100% Supple Italian Nappa Leather. Sole: Reinforced leather and vulcanized rubber.',
    fit: 'True to US size. Gently hugs the instep without stretching out.',
    stock: 14,
    reviews: [
      {
        id: 'rev-5',
        author: 'Vivienne Dupont',
        location: 'New York, NY',
        rating: 5,
        date: 'September 16, 2026',
        title: 'Wear these almost every single day',
        comment: 'The leather feels like butter against the skin. The looping is so artistic and high fashion. Definitely ordering the caramel next.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-positano-woven-tote',
    name: 'The Mink Positano Woven Leather Tote',
    slug: 'mink-positano-woven-tote',
    tagline: 'Hand-plaited vegetable calfskin with removable canvas pouch',
    price: 245,
    originalPrice: 295,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    category: 'bags',
    categoryName: 'Leather Bags',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#8C4820' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Oatmeal Taupe', hex: '#D1C7BD' }
    ],
    sizes: ['One Size (16" x 11" x 6")'],
    rating: 4.9,
    reviewCount: 112,
    description: 'An unstructured classic woven by skilled leather artisans. The Positano Tote features supple hand-braided leather strips that drape effortlessly over the shoulder. Includes an interior zippered organic cotton pouch to keep valuables secure.',
    highlights: [
      '100% hand-interlaced full grain leather',
      'Removable interior canvas zip organizer',
      'Reinforced shoulder drop of 9.5 inches',
      'Solid antique brass hardware accents'
    ],
    materials: 'Exterior: 100% Hand-woven calfskin. Interior pouch: 100% Organic Cotton Canvas.',
    fit: 'Generous capacity fits 13" laptop, Mink slide dust bags, sunglasses case, and everyday essentials.',
    stock: 20,
    reviews: [
      {
        id: 'rev-6',
        author: 'Jessica Miller',
        location: 'Scottsdale, AZ',
        rating: 5,
        date: 'September 02, 2026',
        title: 'The perfect summer & fall bag',
        comment: 'Smells of incredible rich leather. The craftsmanship is flawless and it holds everything without losing its relaxed silhouette.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-palma-linen-resort-shirt',
    name: 'The Mink Palma Relaxed Linen Shirt',
    slug: 'mink-palma-linen-resort-shirt',
    tagline: '100% Normandy flax linen tailored for an effortless breezy drape',
    price: 118,
    originalPrice: 140,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isTrending: false,
    category: 'apparel',
    categoryName: 'Apparel & Resort',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Crisp Coastal White', hex: '#FAF9F6' },
      { name: 'Washed Terracotta', hex: '#B86F58' },
      { name: 'Olive Grove', hex: '#636D53' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 54,
    description: 'Woven from long-staple French flax linen, pre-washed for irresistible softness that gets even better with time. Designed with a relaxed camp collar, mother-of-pearl buttons, and side slit hems that pair harmoniously with our signature slides.',
    highlights: [
      '100% Certified European Flax linen (160 GSM)',
      'Natural Mother-of-Pearl laser-engraved buttons',
      'Garment washed to eliminate shrinkage',
      'Breathable, moisture-wicking and naturally hypoallergenic'
    ],
    materials: '100% French Flax Linen.',
    fit: 'Relaxed easy fit. For a tailored silhouette, order one size down.',
    stock: 35,
    reviews: [
      {
        id: 'rev-7',
        author: 'Rachel Davis',
        location: 'Austin, TX',
        rating: 5,
        date: 'August 19, 2026',
        title: 'Breezy luxury in the Texas heat',
        comment: 'This shirt breathed so nicely during 90 degree weather. You can tell immediately it is genuine high-grade linen, not scratchy at all.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-bellagio-sunglasses',
    name: 'The Mink Bellagio Acetate Sunglasses',
    slug: 'mink-bellagio-sunglasses',
    tagline: 'Hand-polished Italian Mazzucchelli acetate with Category 3 UV400 lenses',
    price: 95,
    originalPrice: 120,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    isTrending: true,
    category: 'accessories',
    categoryName: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tortoise Shell', hex: '#593D2A' },
      { name: 'Gloss Black', hex: '#000000' },
      { name: 'Champagne Crystal', hex: '#E7DCB9' }
    ],
    sizes: ['One Size (51-20-145mm)'],
    rating: 4.9,
    reviewCount: 88,
    description: 'A softly squared silhouette that flatters every facial contour. Handcrafted from bio-acetate with five-barrel German hinges and optical-grade scratch-resistant lenses for crisp visual clarity.',
    highlights: [
      '100% UVA / UVB protection (UV400 Category 3)',
      'Custom five-barrel steel hinges for enduring durability',
      'Includes hard textured clamshell case and microfiber cleaning cloth',
      'Engraved discreet Mink logo on temple tip'
    ],
    materials: 'Mazzucchelli Bio-Acetate Frame, CR-39 Polarized Lenses.',
    fit: 'Medium universal fit. Sits comfortably without temple pinching.',
    stock: 42,
    reviews: [
      {
        id: 'rev-8',
        author: 'Brooke Hansen',
        location: 'Denver, CO',
        rating: 5,
        date: 'August 24, 2026',
        title: 'Stunning frame weight and clarity',
        comment: 'They feel weighty and expensive like Celine or Oliver Peoples, but at under $100. Best purchase of the season.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-sorento-calfskin-belt',
    name: 'The Mink Sorento Calfskin Belt',
    slug: 'mink-sorento-calfskin-belt',
    tagline: 'Sleek 30mm dress belt with solid brushed brass pin buckle',
    price: 78,
    originalPrice: 95,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    isTrending: false,
    category: 'accessories',
    categoryName: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Saddle Cognac', hex: '#7A3F1F' },
      { name: 'Matte Black', hex: '#1F1F1F' }
    ],
    sizes: ['S (30-32")', 'M (34-36")', 'L (38-40")', 'XL (42-44")'],
    rating: 4.7,
    reviewCount: 41,
    description: 'Precision beveled edges and double-sided top-grain leather ensure this belt delivers quiet elegance with tailored trousers or casual summer denim. Hand-stitched keeper loop with solid brass hardware.',
    highlights: [
      'Full grain vegetable-tanned leather develops rich patina',
      'Solid forged brass hardware with satin finish',
      '30mm versatile width',
      'Hand-burnished wax-sealed edges'
    ],
    materials: '100% Full-Grain Calfskin Leather with Solid Brass Buckle.',
    fit: 'Order your standard pant waist size for the ideal middle-hole fit.',
    stock: 25,
    reviews: [
      {
        id: 'rev-9',
        author: 'David Chen',
        location: 'Seattle, WA',
        rating: 5,
        date: 'July 30, 2026',
        title: 'Top notch leather patina',
        comment: 'Leather smells incredible and the brass buckle is solid metal. Matches the Mink saddle slides perfectly.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-cannes-pleated-trouser',
    name: 'The Mink Cannes Pleated Linen Trouser',
    slug: 'mink-cannes-pleated-trouser',
    tagline: 'High-waisted wide leg silhouette tailored in breathable Italian linen',
    price: 165,
    originalPrice: 198,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    category: 'apparel',
    categoryName: 'Apparel & Resort',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stone Sand', hex: '#D8D1C5' },
      { name: 'Oatmeal Natural', hex: '#ECE6DC' },
      { name: 'Midnight Charcoal', hex: '#2B2B2B' }
    ],
    sizes: ['US 2', 'US 4', 'US 6', 'US 8', 'US 10', 'US 12'],
    rating: 4.9,
    reviewCount: 52,
    description: 'Effortlessly polished. The Cannes Trouser features crisp front double pleats, an elongated wide leg that pools gently over Mink slides, and an elasticated hidden interior back waistband for supreme comfort.',
    highlights: [
      '100% Breathable medium-weight washed linen',
      'Discreet hidden interior back elastic for flexible fit',
      'Deep slanted side pockets and tailored back welt pockets',
      'Extended tab button closure with interior anchor button'
    ],
    materials: '100% Premium European Washed Linen.',
    fit: 'High rise with wide leg. 31" inseam tailored for slide sandals.',
    stock: 22,
    reviews: [
      {
        id: 'rev-10',
        author: 'Hannah Sterling',
        location: 'San Francisco, CA',
        rating: 5,
        date: 'September 10, 2026',
        title: 'Finally, wide leg linen pants that don’t look sloppy',
        comment: 'The tailoring on these is phenomenal. They hang beautifully and the hidden waist stretch means they fit whether standing or seated at dinner.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-ravello-crossbody-pouch',
    name: 'The Mink Ravello Minimalist Crossbody',
    slug: 'mink-ravello-crossbody-pouch',
    tagline: 'Featherlight structured leather phone & passport crossbody pouch',
    price: 110,
    originalPrice: 135,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    isTrending: true,
    category: 'bags',
    categoryName: 'Leather Bags',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tan Saddle', hex: '#94582C' },
      { name: 'Sleek Black', hex: '#141414' },
      { name: 'Warm Cream', hex: '#EDE8DF' }
    ],
    sizes: ['One Size (7.5" x 4.8" x 1.5")'],
    rating: 4.8,
    reviewCount: 67,
    description: 'Designed for streamlined travel and hands-free strolls. The Ravello Pouch comfortably accommodates any smartphone, hotel key, passport, and cards with three dedicated card slots and a magnetic top flap.',
    highlights: [
      'Smooth micro-grain calfskin leather with magnetic snap closure',
      'Adjustable slim leather shoulder strap (21-25" drop)',
      '3 exterior back card slots with RFID shielding',
      'Lightweight and discreet under jackets or over dresses'
    ],
    materials: '100% Calfskin with microfiber suede lining.',
    fit: 'Universal fit for all iPhone Pro Max and Android flagships.',
    stock: 28,
    reviews: [
      {
        id: 'rev-11',
        author: 'Lindsay Bell',
        location: 'Chicago, IL',
        rating: 5,
        date: 'August 14, 2026',
        title: 'My travel essential',
        comment: 'Took this across Italy and it held my passport, iPhone 16 Pro, cards, and lip balm with zero bulk. So elegant.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-monaco-monogram-slide',
    name: 'The Mink Monaco Monogram Slide',
    slug: 'mink-monaco-monogram-slide',
    tagline: 'Signature geometric stitched band with contrast trim',
    price: 140,
    originalPrice: 175,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isTrending: false,
    category: 'footwear',
    categoryName: 'Footwear & Slides',
    images: [
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Espresso & Sand', hex: '#2F1E12' },
      { name: 'Tuscan Tan', hex: '#9E5B32' }
    ],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    rating: 4.9,
    reviewCount: 47,
    description: 'A fresh statement slide showcasing Mink’s heritage edge embroidery and dual-textured woven linen panels. Designed for effortless grace from oceanside lunches to rooftop cocktail evenings.',
    highlights: [
      'Refined geometric embroidery over natural flax linen',
      'Contrasting saddle-stitched leather edge trim',
      'Triple-layer cushion core for all-day comfort',
      'Signature Mink hot-stamped leather sole'
    ],
    materials: 'Upper: 60% Linen, 40% Nappa Leather. Sole: Hand-stitched Leather & Rubber.',
    fit: 'True to US size.',
    stock: 19,
    reviews: [
      {
        id: 'rev-12',
        author: 'Allison Miller',
        location: 'Atlanta, GA',
        rating: 5,
        date: 'September 18, 2026',
        title: 'Unbelievable attention to detail',
        comment: 'The stitching is immaculate. Mink is on par with luxury French fashion houses without the ridiculous markup.',
        verified: true
      }
    ]
  },
  {
    id: 'mink-portofino-silk-scarf',
    name: 'The Mink Portofino Silk Twill Scarf',
    slug: 'mink-portofino-silk-scarf',
    tagline: '100% Mulberry silk twill hand-rolled in vintage geometric motifs',
    price: 68,
    originalPrice: 85,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    isTrending: true,
    category: 'accessories',
    categoryName: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Riviera Terracotta & Cream', hex: '#B8654D' },
      { name: 'Monochrome Navy & White', hex: '#1C2938' }
    ],
    sizes: ['One Size (27" x 27")'],
    rating: 4.9,
    reviewCount: 39,
    description: 'Woven from 16-momme pure mulberry silk with hand-rolled hems. Tie around your neck, hair, or wrap around the handles of your Mink Positano Woven Tote for instantaneous Mediterranean flair.',
    highlights: [
      '100% Grade 6A Mulberry Silk Twill',
      'Traditional hand-rolled and hand-stitched edges',
      'Lustrous sheen with supple drape',
      'Arrives in gold-embossed gift envelope'
    ],
    materials: '100% Pure Mulberry Silk Twill.',
    fit: 'Versatile 70cm x 70cm square.',
    stock: 30,
    reviews: [
      {
        id: 'rev-13',
        author: 'Kelsey Wright',
        location: 'Nashville, TN',
        rating: 5,
        date: 'August 11, 2026',
        title: 'Silky smooth and vibrant',
        comment: 'Tied this to my Mink Positano tote and it looked like something out of a luxury magazine shoot!',
        verified: true
      }
    ]
  }
];
