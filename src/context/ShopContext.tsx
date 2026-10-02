import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, Order, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  appliedCoupon: string | null;
  couponError: string | null;
  
  // UI states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isFaqOpen: boolean;
  setIsFaqOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  detailProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  
  activeView: 'home' | 'shop';
  setActiveView: (view: 'home' | 'shop') => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Cart & Wishlist Actions
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>) => Order;
  trackOrder: (orderNumber: string) => Order | undefined;
  
  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mink_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mink_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mink_recently_viewed');
      return saved ? JSON.parse(saved) : ['mink-amalfi-medallion-slide', 'mink-saint-tropez-cutout-slide'];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mink_orders');
      if (saved) return JSON.parse(saved);
      // Demo order for user to test tracking out of the box
      return [
        {
          id: 'ord-demo-1',
          orderNumber: 'MK-78241',
          date: 'September 20, 2026',
          items: [
            {
              productId: 'mink-amalfi-medallion-slide',
              productName: 'The Mink Amalfi Medallion Slide',
              image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
              price: 148,
              quantity: 1,
              selectedSize: 'US 8',
              selectedColorName: 'Saddle Tan & Woven Linen'
            }
          ],
          subtotal: 148,
          discount: 22.2,
          shipping: 0,
          tax: 10.06,
          total: 135.86,
          shippingAddress: {
            firstName: 'Sarah',
            lastName: 'Jenkins',
            street: '742 Evergreen Terrace',
            city: 'Pasadena',
            state: 'CA',
            zipCode: '91101',
            phone: '(626) 555-0192',
            email: 'sarah.j@example.com'
          },
          shippingMethod: 'USPS Priority Express (2 Business Days)',
          status: 'Shipped',
          estimatedDelivery: 'September 24, 2026',
          trackingNumber: '9400111899562537829104',
          carrier: 'FedEx Express USA'
        }
      ];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'shop'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Discount
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('MINK15'); // pre-loaded welcome promo
  const [couponError, setCouponError] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('mink_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mink_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mink_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('mink_orders', JSON.stringify(orders));
  }, [orders]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon === 'MINK15') {
    discount = Number((subtotal * 0.15).toFixed(2));
  } else if (appliedCoupon === 'WELCOME20') {
    discount = Number((subtotal * 0.20).toFixed(2));
  } else if (appliedCoupon === 'FREESHIP') {
    discount = 0;
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon === 'FREESHIP' ? 0 : 7.95;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * 0.0825).toFixed(2)); // Average US state & local sales tax approx 8.25%
  const total = Number((taxableAmount + shipping + tax).toFixed(2));

  const freeShippingRemaining = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)));

  const addToCart = (product: Product, size?: string, color?: ProductColor, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0];
    const itemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, quantity, selectedSize: chosenSize, selectedColor: chosenColor }];
    });

    addToast(`Added "${product.name}" to your cart.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Added to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MINK15' || clean === 'WELCOME20' || clean === 'FREESHIP') {
      setAppliedCoupon(clean);
      setCouponError(null);
      addToast(`Promo code "${clean}" successfully applied!`, 'success');
      return true;
    } else {
      setCouponError('Invalid promo code. Try MINK15 or FREESHIP');
      addToast('Invalid promo code. Please try MINK15', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    addToast('Promo code removed.', 'info');
  };

  const openProductDetail = (product: Product) => {
    setDetailProduct(product);
    // Add to recently viewed
    setRecentlyViewed(prev => [product.id, ...prev.filter(id => id !== product.id)].slice(0, 6));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setDetailProduct(null);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>): Order => {
    const randSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `MK-${randSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
      trackingNumber: `940011${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
      carrier: 'USPS Priority Mail / FedEx',
      estimatedDelivery: 'In 2-3 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const trackOrder = (orderNumber: string) => {
    const trimmed = orderNumber.trim().toUpperCase();
    return orders.find(o => o.orderNumber.toUpperCase() === trimmed);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        cartCount,
        wishlistCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        appliedCoupon,
        couponError,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        isFaqOpen,
        setIsFaqOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        quickViewProduct,
        setQuickViewProduct,
        detailProduct,
        openProductDetail,
        closeProductDetail,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        trackOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
