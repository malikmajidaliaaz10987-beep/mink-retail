import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryId } from '../types';

interface NavbarProps {
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWishlist, onOpenAccount }) => {
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    setIsWishlistOpen,
    setIsAccountOpen,
    setIsSearchOpen, 
    activeView, 
    setActiveView,
    setSelectedCategory,
    closeProductDetail,
    setIsAboutOpen,
    setIsContactOpen
  } = useShop();

  const handleWishlistClick = () => {
    if (onOpenWishlist) onOpenWishlist();
    else setIsWishlistOpen(true);
  };

  const handleAccountClick = () => {
    if (onOpenAccount) onOpenAccount();
    else setIsAccountOpen(true);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop', category?: CategoryId) => {
    closeProductDetail();
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (elementId: string) => {
    closeProductDetail();
    setActiveView('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      {/* Top US Shipping Announcement Bar */}
      <div className="bg-[#121212] text-neutral-200 text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C49773]" /> Free Express US Shipping Over $75
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49773]" /> 30-Day US Returns
            </span>
          </div>

          <div className="mx-auto sm:mx-0 text-center font-medium tracking-wide">
            <span className="text-white">Summer Resort Drop:</span> Use code <span className="text-[#C49773] font-semibold bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">MINK15</span> for 15% off
          </div>

          <div className="hidden md:flex items-center gap-3 text-neutral-400 text-xs">
            <span>Ships from California, USA</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3.5' 
            : 'bg-[#FAF9F6] border-b border-neutral-200/50 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-black ml-1 sm:hidden"
                aria-label="Search products"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Desktop Left Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wider uppercase text-neutral-700">
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors hover:text-black ${
                  activeView === 'home' ? 'text-black font-semibold border-b-2 border-black pb-0.5' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', 'all')}
                className={`transition-colors hover:text-black ${
                  activeView === 'shop' ? 'text-black font-semibold border-b-2 border-black pb-0.5' : ''
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleScrollToSection('shop-by-category')}
                className="transition-colors hover:text-black"
              >
                Categories
              </button>
              <button
                onClick={() => handleScrollToSection('new-arrivals-section')}
                className="transition-colors hover:text-black"
              >
                New Arrivals
              </button>
              <button
                onClick={() => handleScrollToSection('best-sellers-section')}
                className="transition-colors hover:text-black"
              >
                Best Sellers
              </button>
              <button
                onClick={() => setIsAboutOpen(true)}
                className="transition-colors hover:text-black"
              >
                About
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="transition-colors hover:text-black"
              >
                Contact
              </button>
            </nav>

            {/* Mink Retail Center Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left flex items-center justify-center">
              <button
                onClick={() => handleNavClick('home')}
                className="group flex flex-col items-center justify-center focus:outline-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] font-normal uppercase text-[#121212] group-hover:text-black transition-colors">
                    MINK
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#A3704C] mb-1"></span>
                </div>
                <span className="text-[9px] tracking-[0.35em] text-neutral-500 uppercase -mt-1 font-light group-hover:text-neutral-800 transition-colors">
                  RETAIL • NEW YORK
                </span>
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Trigger */}
              <button
                id="search-button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Search products"
                title="Search (Cmd+K)"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account Profile Trigger */}
              <button
                id="account-button"
                onClick={handleAccountClick}
                className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Account and orders"
                title="Account & Orders"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist Trigger */}
              <button
                id="wishlist-button"
                onClick={handleWishlistClick}
                className="relative p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Saved wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#A3704C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                id="cart-button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-900 hover:text-black hover:bg-neutral-100 rounded-full transition-colors flex items-center gap-1.5"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
                <span className="hidden md:inline-block text-xs font-semibold tracking-wide ml-0.5">
                  Bag
                </span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-[#121212] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="relative w-4/5 max-w-sm h-full bg-[#FAF9F6] shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="p-5 flex items-center justify-between border-b border-neutral-200">
                  <div>
                    <span className="font-serif text-xl tracking-[0.2em] font-normal uppercase text-[#121212]">
                      MINK RETAIL
                    </span>
                    <p className="text-[10px] tracking-wider text-neutral-500 uppercase mt-0.5">Everyday Luxury</p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-neutral-600 hover:text-black rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 stroke-[1.5]" />
                  </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="p-4 border-b border-neutral-200 bg-white">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-neutral-100 rounded-lg text-sm text-neutral-500 text-left"
                  >
                    <Search className="w-4 h-4 text-neutral-400" />
                    <span>Search slides, bags, resort wear...</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="p-5 space-y-1">
                  <button
                    onClick={() => handleNavClick('home')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Home</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'all')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Shop All Products</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'footwear')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span className="flex items-center gap-2">
                      Footwear & Slides
                      <span className="text-[10px] bg-[#A3704C]/10 text-[#A3704C] px-1.5 py-0.5 rounded font-bold uppercase">Popular</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'bags')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Leather Bags</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'apparel')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Fashion & Linen</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleNavClick('shop', 'accessories')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Accessories</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleScrollToSection('best-sellers-section')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>Best Sellers</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleScrollToSection('new-arrivals-section')}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                  >
                    <span>New Arrivals</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAboutOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-700 border-b border-neutral-100"
                  >
                    <span>About Mink</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-neutral-700"
                  >
                    <span>Customer Concierge & Contact</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-5 bg-neutral-100 border-t border-neutral-200">
                <div className="flex items-center gap-2 text-xs text-neutral-600 mb-3">
                  <Truck className="w-4 h-4 text-[#A3704C]" />
                  <span>Free US Standard Shipping on $75+</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAccountClick();
                    }}
                    className="flex-1 py-2.5 px-3 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 text-center shadow-sm"
                  >
                    Account & Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleWishlistClick();
                    }}
                    className="flex-1 py-2.5 px-3 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-800 text-center shadow-sm"
                  >
                    Wishlist ({wishlistCount})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
