import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    openProductDetail 
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [showQuickAddSize, setShowQuickAddSize] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && !showQuickAddSize) {
      setShowQuickAddSize(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setShowQuickAddSize(false);
  };

  const handleSelectSizeAndAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, selectedColor, 1);
    setShowQuickAddSize(false);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/70 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-neutral-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAddSize(false);
      }}
    >
      {/* Product Image Stage */}
      <div 
        onClick={() => openProductDetail(product)}
        className="relative aspect-square w-full overflow-hidden bg-[#F7F5F0] cursor-pointer"
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#121212] text-white rounded-md shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#A3704C] text-white rounded-md shadow-xs">
              New In
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-xs">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 backdrop-blur-xs text-neutral-600 hover:bg-white hover:text-black shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-md text-neutral-800 text-xs font-semibold rounded-xl hover:bg-white hover:text-black shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="w-10 h-10 bg-[#121212] text-white rounded-xl hover:bg-black shadow-md flex items-center justify-center transition-colors shrink-0"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Selection Overlay when user clicks Add */}
        {showQuickAddSize && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center animate-fadeIn"
          >
            <p className="text-xs font-bold text-neutral-900 mb-2 uppercase tracking-wider">
              Select Size for Fast Add
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[220px] mb-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => handleSelectSizeAndAdd(s, e)}
                  className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded-lg hover:border-black hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQuickAddSize(false)}
              className="text-[11px] text-neutral-500 underline hover:text-neutral-900"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Product Details info block */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating and review count */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`} 
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-neutral-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Category label */}
        <span className="text-[11px] tracking-wider uppercase font-semibold text-[#A3704C] mb-1">
          {product.categoryName}
        </span>

        {/* Product Title */}
        <h3 
          onClick={() => openProductDetail(product)}
          className="font-medium text-sm text-neutral-900 hover:text-[#A3704C] transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h3>

        {/* Tagline / Short description */}
        <p className="text-xs text-neutral-500 line-clamp-1 mb-3">
          {product.tagline}
        </p>

        {/* Color swatches preview */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              title={color.name}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                selectedColor.name === color.name 
                  ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110' 
                  : 'border-neutral-300 hover:scale-110'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
            />
          ))}
          <span className="text-[10px] text-neutral-400 ml-1">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-neutral-900 text-base">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="text-xs font-semibold text-neutral-800 hover:text-[#A3704C] uppercase tracking-wider flex items-center gap-1 group/btn"
          >
            <span>Add</span>
            <span className="text-[#A3704C] transition-transform group-hover/btn:translate-x-0.5">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
