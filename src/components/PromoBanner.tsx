import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Tag } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory, closeProductDetail } = useShop();

  const handleShopCollection = () => {
    closeProductDetail();
    setSelectedCategory('all');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1C1A18] text-white shadow-2xl">
          
          {/* Background Atmospheric Visual */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="/src/assets/images/mink_resort_banner_1790941066935.jpg"
              alt="Mink Collection Resort Showcase"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#171513] via-[#171513]/90 to-transparent" />

          {/* Banner Content Container */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-2xl">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#D4AF37] mb-6">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Summer Capsule • 15% Off with Code MINK15</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal tracking-tight text-white leading-tight mb-4">
              Refresh Your Collection
            </h2>

            {/* Supporting Copy */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light">
              Discover our latest arrivals and find something made for you. From handcrafted natural raffia slides to pure French flax linen apparel, each piece is shaped for everyday elegance.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleShopCollection}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-neutral-900 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#F3E5D8] transition-all shadow-md group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <span className="text-xs text-neutral-400 font-light">
                Complimentary 2-3 Day US Express Shipping Included
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
