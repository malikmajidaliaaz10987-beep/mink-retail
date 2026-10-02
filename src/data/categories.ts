import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'footwear',
    name: 'Footwear & Slides',
    description: 'Iconic resort slides, raffia weave sandals, and padded calfskin flats handcrafted for sunlit days.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    itemCount: 5
  },
  {
    id: 'bags',
    name: 'Leather Bags',
    description: 'Artisanal hand-woven totes, minimalist phone pouches, and slouchy shoulder bags.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
    itemCount: 2
  },
  {
    id: 'apparel',
    name: 'Fashion & Linen',
    description: 'Effortless European linen shirts, wide-leg pleated trousers, and resort essentials.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    itemCount: 2
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Bio-acetate sunglasses, full-grain belts, and hand-rolled pure silk foulards.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    itemCount: 3
  }
];

export const TRUST_PILLARS = [
  {
    title: 'Fast US Shipping',
    subtitle: 'Free on orders $75+',
    detail: 'Dispatched from California within 24h via FedEx / UPS with tracking'
  },
  {
    title: 'Secure Checkout',
    subtitle: '256-Bit SSL Protection',
    detail: 'Bank-grade encryption supporting Apple Pay, Cards & PayPal'
  },
  {
    title: 'Easy 30-Day Returns',
    subtitle: 'Prepaid return label',
    detail: 'Try in the comfort of your home with effortless exchange & refunds'
  },
  {
    title: 'US Customer Concierge',
    subtitle: '7 Days a week',
    detail: 'Dedicated support team ready to assist with sizing & styling'
  }
];
