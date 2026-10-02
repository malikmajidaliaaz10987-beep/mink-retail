import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, ArrowUpDown, Check, ArrowRight } from 'lucide-react';

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  categoryFilter?: CategoryId | 'all';
  filterKey?: 'featured' | 'bestseller' | 'new' | 'trending';
  limit?: number;
  showViewAll?: boolean;
  sectionId?: string;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  title,
  subtitle,
  categoryFilter = 'all',
  filterKey,
  limit,
  showViewAll = true,
  sectionId
}) => {
  const { products, setActiveView, setSelectedCategory, closeProductDetail } = useShop();

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter !== 'all') {
      list = list.filter(p => p.category === categoryFilter);
    }

    if (filterKey === 'featured') {
      list = list.filter(p => p.isFeatured);
    } else if (filterKey === 'bestseller') {
      list = list.filter(p => p.isBestSeller);
    } else if (filterKey === 'new') {
      list = list.filter(p => p.isNew);
    } else if (filterKey === 'trending') {
      list = list.filter(p => p.isTrending);
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  }, [products, categoryFilter, filterKey, limit]);

  const handleViewAll = () => {
    closeProductDetail();
    setSelectedCategory(categoryFilter === 'all' ? 'all' : categoryFilter);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id={sectionId} className="py-16 md:py-20 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            {subtitle && (
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
                {subtitle}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
              {title}
            </h2>
          </div>

          {showViewAll && (
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-[#A3704C] transition-colors group"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

// Full Shop Catalog View with Interactive Filters, Sorting, and Search
export const ShopCatalogView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [saleOnly, setSaleOnly] = useState<boolean>(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categoriesList: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'footwear', label: 'Footwear & Slides' },
    { id: 'bags', label: 'Leather Bags' },
    { id: 'apparel', label: 'Fashion & Linen' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredAndSorted = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match = p.name.toLowerCase().includes(q) || 
                        p.description.toLowerCase().includes(q) || 
                        p.categoryName.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Price
        if (p.price > maxPrice) return false;
        // In stock
        if (inStockOnly && p.stock <= 0) return false;
        // Sale only
        if (saleOnly && !p.originalPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, saleOnly, sortBy]);

  return (
    <div className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-neutral-900 font-medium">The Mink Catalog</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="capitalize text-[#A3704C] font-semibold">{selectedCategory}</span>
            </>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal">
          {selectedCategory === 'all' 
            ? 'Complete Collection' 
            : categoriesList.find(c => c.id === selectedCategory)?.label || 'Shop'}
        </h1>
        <p className="text-neutral-600 text-sm mt-2 max-w-2xl">
          Handcrafted Mediterranean-inspired slides, vegetable-tanned leather bags, and relaxed European linen essentials with complimentary shipping on US orders $75+.
        </p>
      </div>

      {/* Filter & Sort Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right side controls: mobile filter trigger, sorting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-neutral-500 hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-neutral-300 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Area + Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <div className={`lg:block ${showFiltersMobile ? 'block' : 'hidden'} lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-neutral-200/80 h-fit`}>
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Filters
            </h3>
            {(maxPrice < 300 || inStockOnly || saleOnly || searchQuery) && (
              <button
                onClick={() => {
                  setMaxPrice(300);
                  setInStockOnly(false);
                  setSaleOnly(false);
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#A3704C] hover:underline font-medium"
              >
                Reset all
              </button>
            )}
          </div>

          {/* Search Filter inside catalog */}
          {searchQuery && (
            <div className="p-2.5 bg-neutral-100 rounded-lg flex items-center justify-between text-xs">
              <span>Matching: <strong>"{searchQuery}"</strong></span>
              <button onClick={() => setSearchQuery('')} className="text-neutral-500 hover:text-black">✕</button>
            </div>
          )}

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-neutral-700 mb-2">
              <span>Max Price</span>
              <span className="font-semibold text-neutral-900">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#121212] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>$50</span>
              <span>$175</span>
              <span>$300</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-3 border-t border-neutral-100">
            <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saleOnly}
                onChange={(e) => setSaleOnly(e.target.checked)}
                className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>Special Offers / On Sale</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Trust callout in sidebar */}
          <div className="p-4 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 text-xs text-neutral-600">
            <p className="font-semibold text-neutral-900 mb-1">Mink US Promise</p>
            <p className="text-[11px] leading-relaxed">
              Complimentary 2-3 business day domestic shipping on orders over $75 with easy 30-day prepaid returns.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 text-xs text-neutral-500 font-medium">
            Showing {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'item' : 'items'}
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
              <p className="text-base font-semibold text-neutral-800">No products match your filters</p>
              <p className="text-xs text-neutral-500 mt-1 mb-4">Try clearing some filters or changing your search terms.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(300);
                  setInStockOnly(false);
                  setSaleOnly(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#121212] text-white text-xs font-semibold rounded-lg hover:bg-black"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
