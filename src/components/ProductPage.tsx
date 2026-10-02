import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  Ruler, 
  Check, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductPage: React.FC = () => {
  const { 
    detailProduct, 
    closeProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    setIsCheckoutOpen,
    products,
    setActiveView,
    setSelectedCategory
  } = useShop();

  const product = detailProduct;
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCheckoutOpen(true);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <button
            onClick={closeProductDetail}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <button 
              onClick={() => {
                closeProductDetail();
                setActiveView('home');
              }} 
              className="hover:text-black"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => {
                closeProductDetail();
                setSelectedCategory(product.category);
                setActiveView('shop');
              }} 
              className="hover:text-black capitalize"
            >
              {product.categoryName}
            </button>
            <span>/</span>
            <span className="text-neutral-800 font-medium truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          
          {/* Gallery Column (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail selector */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all relative shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-neutral-900 ring-2 ring-black/10' 
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-200 shadow-md">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                  Save {discountPercent}%
                </span>
              )}

              {/* Wishlist Top-right */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isFavorited
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-black hover:bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Details Column (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category and Rating */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3704C]">
                {product.categoryName}
              </span>

              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-bold text-neutral-900">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewCount} Reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-neutral-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                In Stock • Ships Free
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-6">
              {product.description}
            </p>

            {/* Key highlights bullet list */}
            <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 mb-6 space-y-2 text-xs text-neutral-700">
              <p className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-1">
                Handcrafted Highlights
              </p>
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A3704C] shrink-0 mt-0.5" />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* Color Swatch Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-900 mb-2.5">
                <span>Color: <strong className="font-medium text-neutral-700">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-neutral-900 ring-offset-2 scale-110'
                        : 'border-neutral-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <span className={`w-1.5 h-1.5 rounded-full ${color.hex === '#1A1A1A' || color.hex === '#111111' ? 'bg-white' : 'bg-neutral-900'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Modal Trigger */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-900 mb-2.5">
                  <span>Size (US):</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-neutral-600 hover:text-black flex items-center gap-1 font-normal underline"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#A3704C]" />
                    <span>Size Guide & Fit</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white border-neutral-300 text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 font-light">
                  Fit advice: {product.fit}
                </p>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag / Buy Now CTAs */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-900">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-black font-medium"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-black font-medium"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="pdp-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                </button>

                <button
                  id="pdp-buy-now"
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-6 bg-white border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  Buy Now with 1-Click
                </button>
              </div>
            </div>

            {/* Trust Mini-Bar */}
            <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-neutral-200 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#A3704C]" />
                <span>Free 2-Day US Express Over $75</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#A3704C]" />
                <span>30-Day Hassle-Free Returns</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-6 space-y-2">
              {/* Materials */}
              <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Materials & Craftsmanship</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openAccordion === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'materials' && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-3">
                    <p className="mb-2"><strong>Composition:</strong> {product.materials}</p>
                    <p>Every pair of Mink slides is shaped by generational footwear artisans. The linen is sourced directly from certified Normandy flax cooperatives and paired with supple Italian calfskins hand-tanned in Tuscany.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Fast US Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-3 space-y-2">
                    <p>• <strong>Domestic Shipping:</strong> Orders ship from our California warehouse via FedEx or USPS Priority Mail. Standard shipping (3-5 days) is free on all orders over $75.</p>
                    <p>• <strong>Returns & Size Exchanges:</strong> We want you to adore your purchase. Return unworn items in original packaging within 30 days for an effortless refund or size swap. A prepaid label is available in your Mink account portal.</p>
                  </div>
                )}
              </div>

              {/* Care Guide */}
              <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900"
                >
                  <span>Product Care</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-3">
                    <p>To preserve natural raffia and linen, store in the provided cotton dust bag away from excessive moisture. Clean the leather insole with a soft dry cloth and apply a neutral leather conditioner once a season.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Customer Reviews for This Specific Product */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-neutral-200/80 shadow-xs mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-neutral-200 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3704C] block mb-1">
                Verified Customer Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
                Reviews for {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="text-4xl font-serif font-bold text-neutral-900">{product.rating}</span>
                <div className="flex text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">Based on {product.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{rev.author}</span>
                    <span className="text-[11px] text-neutral-400">• {rev.location}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <div className="flex text-amber-500 mb-1.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>

                <h4 className="text-xs font-bold text-neutral-900 mb-1">{rev.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3704C] block mb-1">
                Complete the Look
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
                Pairs Effortlessly With
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black"
            >
              ✕
            </button>
            <h3 className="font-serif text-xl font-normal text-neutral-900 mb-1">
              Mink Retail US Sizing Guide
            </h3>
            <p className="text-xs text-neutral-500 mb-4 font-light">
              Mink slides and footwear follow standard US sizing with generous arch comfort.
            </p>

            <table className="w-full text-xs text-left border-collapse mb-4">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 font-bold uppercase">
                  <th className="py-2">US Size</th>
                  <th className="py-2">EU Size</th>
                  <th className="py-2">Foot Length (Inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                <tr><td className="py-2 font-semibold">US 5</td><td>EU 35</td><td>8.75 in</td></tr>
                <tr><td className="py-2 font-semibold">US 6</td><td>EU 36</td><td>9.00 in</td></tr>
                <tr><td className="py-2 font-semibold">US 7</td><td>EU 37</td><td>9.25 in</td></tr>
                <tr><td className="py-2 font-semibold">US 8</td><td>EU 38</td><td>9.50 in</td></tr>
                <tr><td className="py-2 font-semibold">US 9</td><td>EU 39</td><td>9.75 in</td></tr>
                <tr><td className="py-2 font-semibold">US 10</td><td>EU 40</td><td>10.00 in</td></tr>
                <tr><td className="py-2 font-semibold">US 11</td><td>EU 41</td><td>10.25 in</td></tr>
              </tbody>
            </table>

            <div className="p-3 bg-[#FAF9F6] rounded-xl text-[11px] text-neutral-600 mb-4">
              <strong>Need personal sizing assistance?</strong> Our concierge team is available daily at support@minkretail.com or via live chat.
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
