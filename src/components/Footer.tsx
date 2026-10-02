import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Instagram, 
  Facebook, 
  Share2, 
  ShieldCheck, 
  Truck, 
  ArrowUp,
  CreditCard
} from 'lucide-react';
import { CategoryId } from '../types';

export const Footer: React.FC = () => {
  const { 
    setActiveView, 
    setSelectedCategory, 
    closeProductDetail,
    setIsAboutOpen,
    setIsContactOpen,
    setIsFaqOpen,
    setIsOrderTrackingOpen
  } = useShop();

  const handleShopLink = (category: CategoryId | 'all') => {
    closeProductDetail();
    setSelectedCategory(category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-neutral-800">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-2xl tracking-[0.22em] font-normal uppercase text-white">
                MINK RETAIL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49773]"></span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mb-6">
              Mink Retail curates timeless handcrafted footwear, artisan resort slides, and relaxed lifestyle staples. Designed in New York, responsibly crafted with sustainable Mediterranean linen and fine Italian leathers.
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-medium">Follow Mink:</span>
              <div className="flex items-center gap-2 text-neutral-400">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="TikTok"
                >
                  <span className="text-xs font-bold">Tk</span>
                </a>
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:text-white hover:border-neutral-600 transition-colors"
                  aria-label="Pinterest"
                >
                  <span className="text-xs font-bold">P</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => handleShopLink('all')} className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('footwear')} className="hover:text-white transition-colors">
                  Footwear & Slides
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('bags')} className="hover:text-white transition-colors">
                  Leather Bags
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('apparel')} className="hover:text-white transition-colors">
                  Apparel & Resort
                </button>
              </li>
              <li>
                <button onClick={() => handleShopLink('accessories')} className="hover:text-white transition-colors">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">
                  FAQ & Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5 text-[#C49773]">
                  <span>Track Order</span>
                  <span className="text-[9px] bg-[#C49773]/20 px-1 py-0.5 rounded font-bold uppercase">Live</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">
                  About Mink
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">
                  Artisanal Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setIsFaqOpen(true)} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <span className="text-neutral-500">United States (USD $)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Payment Icons & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          
          {/* Copyright */}
          <div>
            <p>© 2026 Mink Retail. All rights reserved.</p>
          </div>

          {/* Payment Badges (Clean text/svg pill indicators) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              Visa
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              Mastercard
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              Amex
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              PayPal
            </span>
            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-semibold text-neutral-300">
              Shop Pay
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
