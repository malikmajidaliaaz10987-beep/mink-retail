import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    openProductDetail,
    setActiveView,
    setSelectedCategory,
    setSearchQuery: setGlobalSearchQuery
  } = useShop();

  const [inputVal, setInputVal] = useState('');

  const quickPills = [
    'Amalfi Slide',
    'Raffia Sandals',
    'Woven Leather Tote',
    'Relaxed Linen Shirt',
    'Bellagio Sunglasses',
    'Pleated Trouser'
  ];

  const searchResults = useMemo(() => {
    if (!inputVal.trim()) return [];
    const q = inputVal.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q)
      );
    });
  }, [inputVal, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: typeof products[0]) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleSearchAll = () => {
    setIsSearchOpen(false);
    setGlobalSearchQuery(inputVal);
    setSelectedCategory('all');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-neutral-200"
        >
          {/* Search Input Box */}
          <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3 bg-[#FAF9F6]">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search handcrafted slides, linen apparel, bags, accessories..."
              className="flex-1 bg-transparent text-sm sm:text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            {inputVal && (
              <button
                onClick={() => setInputVal('')}
                className="p-1 text-neutral-400 hover:text-black rounded-full"
                aria-label="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 rounded-full text-xs font-semibold text-neutral-700 transition-colors"
            >
              Esc
            </button>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-4 sm:px-6 bg-white border-b border-neutral-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-neutral-400 font-medium shrink-0">Popular:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setInputVal(pill)}
                className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors whitespace-nowrap"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
            {!inputVal.trim() ? (
              <div className="text-center py-8">
                <p className="text-xs text-neutral-400 font-medium">
                  Type any keyword to search the Mink Retail collection...
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 max-w-sm mx-auto text-left text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl">
                    <p className="font-semibold text-neutral-800">Footwear</p>
                    <p className="text-[11px] text-neutral-500">Amalfi, Saint-Tropez, Capri slides</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl">
                    <p className="font-semibold text-neutral-800">Summer Resort</p>
                    <p className="text-[11px] text-neutral-500">Normandy flax linen shirts & trousers</p>
                  </div>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm font-semibold text-neutral-800">No results found for "{inputVal}"</p>
                <p className="text-xs text-neutral-500 mt-1">Try searching for "slide", "raffia", "linen", or "tote".</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span>Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}</span>
                  <button
                    onClick={handleSearchAll}
                    className="text-[#A3704C] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FAF9F6] border border-transparent hover:border-neutral-200 cursor-pointer transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-neutral-100"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#A3704C] tracking-wider">
                          {product.categoryName}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <div className="flex items-center text-amber-500 text-[11px]">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="ml-1 text-neutral-600 font-medium">{product.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-[#A3704C] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-neutral-900 block">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
