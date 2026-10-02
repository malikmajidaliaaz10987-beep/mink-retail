import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openProductDetail,
    setIsCartOpen 
  } = useShop();

  const product = quickViewProduct;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor || product.colors[0], quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    openProductDetail(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-600 hover:text-black hover:bg-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close Quick View"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 sm:p-8 bg-[#FAF9F6] flex flex-col justify-between">
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-sm mb-4">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#A3704C]">
                    {product.categoryName}
                  </span>

                  <div className="flex items-center gap-1 text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-neutral-800">{product.rating}</span>
                    <span className="text-neutral-400">({product.reviewCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal leading-snug mb-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-neutral-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Free US Delivery Over $75
                  </span>
                </div>

                {/* Description summary */}
                <p className="text-xs text-neutral-600 leading-relaxed font-light mb-6">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mb-5">
                  <div className="flex justify-between items-center text-xs font-semibold text-neutral-900 mb-2">
                    <span>Color: <span className="font-normal text-neutral-600">{selectedColor?.name || product.colors[0].name}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                          (selectedColor?.name || product.colors[0].name) === color.name
                            ? 'ring-2 ring-neutral-900 ring-offset-2 scale-110'
                            : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {(selectedColor?.name || product.colors[0].name) === color.name && (
                          <span className={`w-1.5 h-1.5 rounded-full ${color.hex === '#1A1A1A' || color.hex === '#111111' ? 'bg-white' : 'bg-neutral-900'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-900 mb-2">
                      <span>Size (US):</span>
                      <span className="text-[11px] text-neutral-500 font-normal">Fits true to size</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                            selectedSize === size
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-semibold text-neutral-900">Quantity:</span>
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${
                      isFavorited
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullDetails}
                  className="w-full text-center text-xs font-semibold text-neutral-600 hover:text-[#A3704C] transition-colors py-1 flex items-center justify-center gap-1"
                >
                  <span>View Complete Product Details & Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
