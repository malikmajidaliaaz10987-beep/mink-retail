import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    products, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart, 
    setIsCartOpen,
    openProductDetail
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (product: typeof products[0]) => {
    addToCart(product, product.sizes[0] || 'Standard', product.colors[0], 1);
    toggleWishlist(product.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const handleViewProduct = (product: typeof products[0]) => {
    setIsWishlistOpen(false);
    openProductDetail(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 bg-white border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <h2 className="font-serif text-xl font-normal text-neutral-900 tracking-wide">
                  Saved Favorites
                </h2>
                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 mb-4">
                    <Heart className="w-7 h-7 stroke-[1.2]" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-neutral-900 mb-1">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Tap the heart icon on any slide or accessory to save it for later.
                  </p>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="px-6 py-3 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs relative"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => handleViewProduct(product)}
                      className="w-20 h-20 rounded-xl object-cover bg-neutral-100 shrink-0 cursor-pointer"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3704C]">
                          {product.categoryName}
                        </span>
                        <h4 
                          onClick={() => handleViewProduct(product)}
                          className="text-xs font-semibold text-neutral-900 line-clamp-1 cursor-pointer hover:underline"
                        >
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-bold text-neutral-900">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-neutral-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Move to bag button */}
                      <div className="pt-2">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="w-full py-2 bg-[#121212] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-black flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 p-1"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistProducts.length > 0 && (
              <div className="p-4 bg-white border-t border-neutral-200">
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full py-3 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
