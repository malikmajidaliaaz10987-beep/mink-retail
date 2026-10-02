import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { ToastContainer } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGridSection, ShopCatalogView } from './components/ProductGrid';
import { PromoBanner } from './components/PromoBanner';
import { DiscoverySection } from './components/DiscoverySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductPage } from './components/ProductPage';
import { AccountModal } from './components/AccountModal';
import { AboutModal, ContactModal, FaqModal, OrderTrackingModal } from './components/InfoModals';

const MainContent: React.FC = () => {
  const { activeView, detailProduct } = useShop();

  // If a product is currently open in detail view, show the dedicated Product Page
  if (detailProduct) {
    return <ProductPage />;
  }

  // If user navigated to the Shop catalog view
  if (activeView === 'shop') {
    return <ShopCatalogView />;
  }

  // Default: Homepage Experience
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Badges */}
      <TrustBadges />

      {/* 3. Category Grid */}
      <CategoryGrid />

      {/* 4. Featured Products */}
      <ProductGridSection
        sectionId="featured"
        title="Curated Essentials"
        subtitle="The Signature Collection"
        filterKey="featured"
        limit={4}
      />

      {/* 5. Promotional Summer Capsule Banner */}
      <PromoBanner />

      {/* 6. Best Sellers */}
      <ProductGridSection
        sectionId="bestsellers"
        title="Most Loved Across America"
        subtitle="Best Sellers"
        filterKey="bestseller"
        limit={4}
      />

      {/* 7. Product Discovery Section (Trending, Recommended, Recently Viewed) */}
      <DiscoverySection />

      {/* 8. New Arrivals */}
      <ProductGridSection
        sectionId="new-arrivals"
        title="Fresh Off The Atelier"
        subtitle="New Arrivals"
        filterKey="new"
        limit={4}
      />

      {/* 9. Customer Testimonials */}
      <ReviewsSection />

      {/* 10. Newsletter Subscription */}
      <Newsletter />
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-[#121212] flex flex-col font-sans selection:bg-[#A3704C] selection:text-white antialiased">
        {/* Toast Notification Layer */}
        <ToastContainer />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Main Body Content */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Global Slide-overs & Interactive Modals */}
        <QuickViewModal />
        <CartDrawer />
        <CheckoutModal />
        <SearchModal />
        <WishlistDrawer />
        <AccountModal />
        <AboutModal />
        <ContactModal />
        <FaqModal />
        <OrderTrackingModal />
      </div>
    </ShopProvider>
  );
}
