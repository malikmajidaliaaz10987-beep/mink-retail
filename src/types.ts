export type CategoryId = 
  | 'all' 
  | 'footwear' 
  | 'apparel' 
  | 'bags' 
  | 'accessories' 
  | 'resort';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  category: CategoryId;
  categoryName: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  materials: string;
  fit: string;
  reviews: Review[];
  stock: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColorName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  shippingMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
}
