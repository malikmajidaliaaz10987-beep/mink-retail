import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  Truck, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AccountModal: React.FC = () => {
  const { 
    isAccountOpen, 
    setIsAccountOpen, 
    orders, 
    setIsOrderTrackingOpen,
    setActiveView,
    setSelectedCategory
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!isAccountOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAccountOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
            aria-label="Close Account Modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* User Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
            <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center text-lg font-serif">
              JM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  Jessica Miller
                </h3>
                <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  Mink VIP Member
                </span>
              </div>
              <p className="text-xs text-neutral-500">jessica.m@example.com • Santa Monica, CA</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-neutral-200 gap-6 text-xs font-semibold pt-4 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'orders' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <span>Order History & Tracking ({orders.length})</span>
              {activeTab === 'orders' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'profile' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <span>VIP Privileges</span>
              {activeTab === 'profile' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'addresses' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <span>Saved Shipping Address</span>
              {activeTab === 'addresses' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
              )}
            </button>
          </div>

          {/* Tab 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-xs text-neutral-500">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-[#FAF9F6] rounded-2xl border border-neutral-200 space-y-3"
                  >
                    <div className="flex flex-wrap justify-between items-center text-xs pb-2 border-b border-neutral-200/80 gap-2">
                      <div>
                        <span className="font-bold text-neutral-900">{order.orderNumber}</span>
                        <span className="text-neutral-400 ml-2">Placed on {order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {order.status}
                        </span>
                        <span className="font-bold text-neutral-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {item.image && (
                              <img src={item.image} alt="" className="w-9 h-9 rounded-lg object-cover" referrerPolicy="no-referrer" />
                            )}
                            <div>
                              <p className="font-medium text-neutral-900">{item.productName}</p>
                              <p className="text-[10px] text-neutral-500">
                                {item.selectedSize} • {item.selectedColorName} (Qty: {item.quantity})
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-neutral-800">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Action */}
                    <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                        <Truck className="w-3.5 h-3.5 text-[#A3704C]" />
                        <span>Carrier: <strong>{order.carrier}</strong></span>
                      </div>
                      <button
                        onClick={() => {
                          setIsAccountOpen(false);
                          setIsOrderTrackingOpen(true);
                        }}
                        className="text-xs font-semibold text-[#A3704C] hover:underline flex items-center gap-1"
                      >
                        <span>Track Delivery Status</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: VIP Privileges */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-gradient-to-r from-[#171513] to-[#2B2724] text-white rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
                  Mink Tier: Gold Connoisseur
                </span>
                <p className="font-serif text-lg mb-1">Jessica Miller</p>
                <p className="text-[11px] text-neutral-300 font-light mb-3">
                  Enjoy permanent complimentary domestic express shipping and 48-hour early access to upcoming resort capsules.
                </p>
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono">
                  VIP Code: MINK15 (15% Off Any Time)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-0.5">Complimentary Returns</span>
                  <span className="text-[11px] text-neutral-500">Prepaid shipping labels for 30 days</span>
                </div>
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-0.5">Direct Atelier Sizing</span>
                  <span className="text-[11px] text-neutral-500">Dedicated concierge specialist</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Saved Address */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-neutral-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-neutral-900">Jessica Miller</span>
                    <span className="text-[10px] bg-neutral-200 px-1.5 py-0.5 rounded font-medium">Default</span>
                  </div>
                  <p className="text-neutral-600">1420 Ocean Avenue, Suite 4B</p>
                  <p className="text-neutral-600">Santa Monica, CA 90401, United States</p>
                  <p className="text-neutral-500 mt-1">Phone: (310) 555-0184</p>
                </div>
                <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified US Address
                </span>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                setIsAccountOpen(false);
                setActiveView('shop');
                setSelectedCategory('all');
              }}
              className="text-neutral-600 hover:text-black underline"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => setIsAccountOpen(false)}
              className="px-5 py-2 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-black"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
