import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategory, closeProductDetail, openProductDetail, products } = useShop();

  const handleShopNow = () => {
    closeProductDetail();
    setActiveView('shop');
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreNewArrivals = () => {
    closeProductDetail();
    const el = document.getElementById('new-arrivals-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setActiveView('shop');
    }
  };

  const signatureSlide = products.find(p => p.id === 'mink-amalfi-medallion-slide') || products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#F4F1EA] to-[#FAF9F6] py-12 md:py-20 lg:py-24 border-b border-neutral-200/60">
      {/* Subtle organic background element */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C49773]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-neutral-200/40 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Collection Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-300/80 shadow-xs mb-6 text-xs font-semibold text-neutral-800 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#A3704C]" />
              <span>New 2026 Resort & Summer Collection</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3704C]"></span>
              <span className="text-[#A3704C]">Handcrafted Quality</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#121212] leading-[1.12] mb-6 font-normal">
              Discover Your <br />
              <span className="italic font-light text-[#A3704C]">Everyday Style</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed mb-8">
              Shop carefully selected products designed to bring quality, style, and value to your everyday life.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-shop-now-button"
                onClick={handleShopNow}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#121212] text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-black transition-all shadow-md hover:shadow-lg active:scale-[0.99] group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-button"
                onClick={handleExploreNewArrivals}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white border border-neutral-300 text-neutral-800 text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-neutral-50 hover:border-neutral-400 transition-all shadow-xs"
              >
                <span>Explore New Arrivals</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-neutral-300/60 w-full flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-neutral-900">4.9/5 Rating</span>
                <span className="text-neutral-400">•</span>
                <span>1,400+ Verified US Reviews</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A3704C]" />
                <span className="font-medium text-neutral-900">100% Satisfaction Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Primary Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 aspect-[4/5] border-4 border-white">
              <img
                src="/src/assets/images/mink_hero_slide_1790941017286.jpg"
                alt="Mink Retail handcrafted signature cutout leather slides"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Card Overlay inside image */}
              <div className="absolute bottom-5 left-5 right-5 text-white bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-300 font-semibold block mb-0.5">
                  Signature Edition
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-white">The Mink Signature Cutout Slide</h3>
                    <p className="text-xs text-neutral-300">$148 • Free US Delivery</p>
                  </div>
                  <button
                    onClick={() => openProductDetail(signatureSlide)}
                    className="px-3.5 py-1.5 bg-white text-neutral-900 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Luxury Detail Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-5 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-neutral-200/80 max-w-[210px] hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold text-neutral-900 tracking-wide uppercase">Handcrafted</span>
              </div>
              <p className="text-xs text-neutral-600 leading-snug">
                Premium French linen & Italian calfskin with memory foam comfort insole.
              </p>
            </motion.div>

            {/* Floating US Shipping Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-neutral-200/80 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-neutral-200 flex items-center justify-center text-lg">
                🇺🇸
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">US Fast Dispatch</p>
                <p className="text-[11px] text-neutral-500">Ships direct from California</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
