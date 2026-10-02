import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';
import { CategoryId } from '../types';

export const CategoryGrid: React.FC = () => {
  const { setActiveView, setSelectedCategory, closeProductDetail } = useShop();

  const categories = [
    {
      id: 'footwear' as CategoryId,
      name: 'Footwear & Slides',
      subtitle: 'Artisanal Slides & Sandals',
      image: '/src/assets/images/mink_slide_cognac_1790941030740.jpg',
      badge: 'Signature Collection'
    },
    {
      id: 'bags' as CategoryId,
      name: 'Leather Bags',
      subtitle: 'Hand-Woven Totes & Pouches',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      badge: 'Artisan Crafted'
    },
    {
      id: 'apparel' as CategoryId,
      name: 'Fashion & Linen',
      subtitle: 'Relaxed Shirts & Trousers',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      badge: 'French Flax'
    },
    {
      id: 'accessories' as CategoryId,
      name: 'Accessories',
      subtitle: 'Bio-Acetate & Pure Silk',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      badge: 'Essential Accents'
    }
  ];

  const handleCategoryClick = (categoryId: CategoryId) => {
    closeProductDetail();
    setSelectedCategory(categoryId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="shop-by-category" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-md mt-3 md:mt-0 font-normal">
            Refined craftsmanship, breathable natural fibers, and timeless silhouettes tailored for everyday ease.
          </p>
        </div>

        {/* 4 Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-200 aspect-[3/4] text-left focus:outline-none transition-all duration-300 hover:shadow-xl"
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 group-hover:from-black/85 transition-colors" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-full">
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-white group-hover:text-[#F3E5D8] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 font-light">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all transform group-hover:rotate-45 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
