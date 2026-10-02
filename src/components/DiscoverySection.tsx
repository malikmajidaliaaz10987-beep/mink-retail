import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Flame, Sparkles, Clock } from 'lucide-react';

export const DiscoverySection: React.FC = () => {
  const { products, recentlyViewed } = useShop();
  const [activeTab, setActiveTab] = useState<'trending' | 'recommended' | 'recent'>('trending');

  const displayedProducts = useMemo(() => {
    if (activeTab === 'trending') {
      return products.filter(p => p.isTrending).slice(0, 4);
    }
    if (activeTab === 'recommended') {
      // Pick top-rated items
      return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
    }
    if (activeTab === 'recent') {
      const recentList = recentlyViewed
        .map(id => products.find(p => p.id === id))
        .filter((p): p is typeof products[0] => Boolean(p));
      return recentList.length > 0 ? recentList.slice(0, 4) : products.slice(0, 4);
    }
    return products.slice(0, 4);
  }, [activeTab, products, recentlyViewed]);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Discovery Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
              Curated For You
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
              Product Discovery
            </h2>
          </div>

          {/* Interactive Discovery Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F6] border border-neutral-200 rounded-full w-fit">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'trending'
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab('recommended')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'recommended'
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A3704C]" />
              <span>Recommended</span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'recent'
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Recently Viewed</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
