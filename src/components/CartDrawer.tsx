import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setActiveView,
    setSelectedCategory,
    closeProductDetail
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleStartShopping = () => {
    setIsCartOpen(false);
    closeProductDetail();
    setActiveView('shop');
    setSelectedCategory('all');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 bg-white border-b border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-neutral-900" />
                  <h2 className="font-serif text-xl font-normal text-neutral-900 tracking-wide">
                    Your Shopping Bag
                  </h2>
                  <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-neutral-200/80">
                <div className="flex items-center gap-2 text-xs font-medium mb-1.5">
                  <Truck className="w-4 h-4 text-[#A3704C] shrink-0" />
                  {freeShippingRemaining > 0 ? (
                    <span className="text-neutral-700">
                      Add <strong className="text-neutral-900">${freeShippingRemaining}</strong> more for <strong>Free Express US Shipping</strong>
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> You have unlocked Free Express US Shipping!
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A3704C] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 mb-4">
                    <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-neutral-900 mb-1">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Explore our handcrafted slides, fine leather bags, and breathable linen apparel.
                  </p>
                  <button
                    onClick={handleStartShopping}
                    className="px-6 py-3 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs relative group"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="pr-6">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                          <span>Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span className="truncate max-w-[100px]">{item.selectedColor.name}</span>
                        </div>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-neutral-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Order Summary Checkout */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-neutral-200 shadow-lg space-y-4">
                
                {/* Coupon Code Section */}
                <div className="pt-1">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code <strong>{appliedCoupon}</strong> active</span>
                        {discount > 0 && <span>(-${discount.toFixed(2)})</span>}
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[11px] text-neutral-500 hover:text-red-600 underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. MINK15)"
                        className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-xs font-medium uppercase placeholder:normal-case placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</p>
                  )}
                </div>

                {/* Subtotals Breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>US Domestic Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-emerald-700 uppercase text-[11px]">Free</strong> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total USD</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA Button */}
                <button
                  id="cart-checkout-button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 px-6 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Trust Guarantee inside cart */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A3704C]" /> 256-Bit SSL Checkout
                  </span>
                  <span>•</span>
                  <span>Prepaid US 30-Day Returns</span>
                </div>

              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
