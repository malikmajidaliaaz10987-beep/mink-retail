import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Truck, 
  Search, 
  Package, 
  ShieldCheck, 
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 1. ABOUT MODAL
export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useShop();
  if (!isAboutOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsAboutOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
            The Mink Story
          </span>
          <h2 className="font-serif text-3xl font-normal text-neutral-900 mb-4">
            Timeless Footwear & Artisan Craft
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
            <p>
              Founded with a desire for effortless resort elegance and uncompromising all-day comfort, <strong>Mink Retail</strong> creates footwear and lifestyle essentials for those who cherish refined simplicity.
            </p>
            <p>
              Designed in New York and brought to life in family-owned workshops across Portugal, Spain, and Italy, our iconic medallion slides and woven leather bags combine centuries of Mediterranean artisanal heritage with modern ergonomic insoles.
            </p>

            <div className="my-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
                <span className="font-serif text-2xl font-bold text-neutral-900 block mb-1">100%</span>
                <span className="text-xs text-neutral-600 font-medium">French Flax Linen & Italian Leathers</span>
              </div>
              <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
                <span className="font-serif text-2xl font-bold text-neutral-900 block mb-1">2-3 Day</span>
                <span className="text-xs text-neutral-600 font-medium">Complimentary US Express Shipping</span>
              </div>
            </div>

            <p>
              We reject fleeting trends in favor of enduring silhouettes that transition seamlessly from seaside morning strolls in the Hamptons to downtown Manhattan dinners.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// 2. CONTACT US MODAL
export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, addToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been submitted. A concierge specialist will respond within 4 hours.', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsContactOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
            Mink Concierge
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 mb-2">
            Customer Support & Assistance
          </h2>
          <p className="text-xs text-neutral-500 mb-6 font-light">
            Our US-based concierge team is delighted to help with sizing questions, order updates, or custom styling advice.
          </p>

          {submitted ? (
            <div className="p-8 bg-[#FAF9F6] border border-neutral-200 rounded-2xl text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-normal text-neutral-900 mb-1">
                Inquiry Dispatched
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Thank you, {name}. A member of our concierge team will reach out to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setIsContactOpen(false);
                }}
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jessica Miller"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Order # (Optional)</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. MK-78241"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">How can we assist you? *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your sizing inquiry or question..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between text-neutral-600 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A3704C]" /> 1 (800) 492-MINK
                </span>
                <span>Mon–Sat 9AM–8PM EST</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message to Concierge</span>
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// 3. FAQ & SHIPPING MODAL
export const FaqModal: React.FC = () => {
  const { isFaqOpen, setIsFaqOpen } = useShop();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  if (!isFaqOpen) return null;

  const faqs = [
    {
      q: 'What is your shipping policy across the United States?',
      a: 'We offer complimentary standard domestic shipping on all US orders of $75 or more. Orders are packed with care in California and dispatched via FedEx Ground or USPS Priority Mail (3–5 business days). Expedited 2-Day Air is available at checkout for $14.95.'
    },
    {
      q: 'How does your 30-day return & exchange policy work?',
      a: 'We accept returns of unworn items in original packaging within 30 days of delivery. Free return shipping labels are provided for all domestic exchanges and store credits.'
    },
    {
      q: 'How do Mink slides fit compared to standard US shoe sizing?',
      a: 'Our slides run true to standard US women’s sizing. If you are between sizes, we recommend sizing up to ensure optimal comfort and heel cradling on our ergonomic arch footbed.'
    },
    {
      q: 'Are Mink products responsibly sourced?',
      a: 'Yes. We partner exclusively with certified artisan ateliers in Europe. Our raffia is harvested regeneratively in Madagascar, and our leathers are vegetable-tanned by-products certified by the Leather Working Group (LWG).'
    },
    {
      q: 'How should I care for my woven raffia and leather slides?',
      a: 'Avoid soaking the woven raffia fibers in water. Wipe smooth leather surfaces gently with a clean dry microfiber cloth and store your slides in the protective cotton dust bag provided in each box.'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsFaqOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A3704C] block mb-2">
            Help & Guidance
          </span>
          <h2 className="font-serif text-3xl font-normal text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-2xl overflow-hidden bg-[#FAF9F6]">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900"
                >
                  <span>{faq.q}</span>
                  <span className="text-base text-neutral-400">{activeFaq === i ? '−' : '+'}</span>
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500">
            <span>Still have questions?</span>
            <button
              onClick={() => setIsFaqOpen(false)}
              className="px-5 py-2 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-black"
            >
              Close FAQ
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// 4. LIVE ORDER TRACKING MODAL
export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orders } = useShop();
  const [query, setQuery] = useState('MK-78241');
  const [searchResult, setSearchResult] = useState<any>(orders[0] || null);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => 
      o.orderNumber.toLowerCase() === query.trim().toLowerCase() ||
      o.trackingNumber.toLowerCase() === query.trim().toLowerCase()
    );

    if (found) {
      setSearchResult(found);
    } else {
      // Create instant realistic simulated package tracking
      setSearchResult({
        id: 'ord-sim',
        orderNumber: query.toUpperCase().startsWith('MK') ? query.toUpperCase() : `MK-${query}`,
        date: 'September 20, 2026',
        items: [
          {
            productName: 'The Mink Amalfi Medallion Slide',
            selectedSize: 'US 8',
            selectedColorName: 'Cognac Gold',
            quantity: 1,
            price: 185
          }
        ],
        subtotal: 185,
        discount: 27.75,
        shipping: 0,
        tax: 12.97,
        total: 170.22,
        status: 'In Transit',
        trackingNumber: '9400111899562839410192',
        carrier: 'FedEx Express US',
        estimatedDelivery: 'Wednesday, Sep 23 by 7:00 PM',
        shippingAddress: {
          firstName: 'Jessica',
          lastName: 'Miller',
          street: '1420 Ocean Avenue',
          city: 'Santa Monica',
          state: 'CA',
          zipCode: '90401',
          phone: '(310) 555-0184',
          email: 'jessica.m@example.com'
        },
        shippingMethod: 'Standard Ground (3-5 Days)'
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-5 h-5 text-[#A3704C]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3704C]">
              US Delivery Portal
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 mb-4">
            Track Your Mink Order
          </h2>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order # (e.g. MK-78241) or Tracking #"
              className="flex-1 px-4 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-black uppercase"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Order Details Display */}
          {searchResult && (
            <div className="space-y-6">
              
              {/* Status Header Banner */}
              <div className="p-4 sm:p-5 bg-[#FAF9F6] rounded-2xl border border-neutral-200 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Order {searchResult.orderNumber}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-neutral-900 text-sm">{searchResult.status}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Carrier & Tracking #
                  </span>
                  <span className="text-xs font-mono font-medium text-neutral-900">
                    {searchResult.carrier} • {searchResult.trackingNumber}
                  </span>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="py-2">
                <div className="grid grid-cols-4 text-center text-xs font-semibold gap-1">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      ✓
                    </div>
                    <span className="text-neutral-900 text-[11px]">Order Placed</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Confirmed</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs mb-1.5 shadow-xs">
                      ✓
                    </div>
                    <span className="text-neutral-900 text-[11px]">Handcrafted & Packed</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Ontario, CA</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#A3704C] text-white flex items-center justify-center text-xs mb-1.5 shadow-xs ring-4 ring-[#A3704C]/20">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-neutral-900 text-[11px]">In Transit</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">On Schedule</span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center opacity-40">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs mb-1.5">
                      4
                    </div>
                    <span className="text-neutral-700 text-[11px]">Delivered</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Sep 23</span>
                  </div>

                </div>
              </div>

              {/* Estimated Arrival Callout */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="font-semibold block">Estimated Delivery Window:</span>
                  <span className="text-sm font-bold text-emerald-950">{searchResult.estimatedDelivery}</span>
                </div>
                <div className="text-right text-[11px] text-emerald-800">
                  <span>Destination: {searchResult.shippingAddress?.city || 'Santa Monica'}, {searchResult.shippingAddress?.state || 'CA'}</span>
                </div>
              </div>

              {/* Items in package */}
              <div className="border-t border-neutral-200 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                  Items in this shipment:
                </span>
                <div className="space-y-2">
                  {searchResult.items.map((it: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-neutral-50 rounded-xl">
                      <span className="font-medium text-neutral-900">{it.productName} ({it.selectedSize || 'Standard'})</span>
                      <span className="text-neutral-500">Qty: {it.quantity || 1} • ${it.price}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-end">
            <button
              onClick={() => setIsOrderTrackingOpen(false)}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black"
            >
              Close Tracker
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
