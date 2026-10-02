import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Package, 
  ChevronRight,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
    setIsOrderTrackingOpen,
    setActiveView,
    setSelectedCategory
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form Fields
  const [email, setEmail] = useState('jessica.m@example.com');
  const [phone, setPhone] = useState('(310) 555-0184');
  const [firstName, setFirstName] = useState('Jessica');
  const [lastName, setLastName] = useState('Miller');
  const [street, setStreet] = useState('1420 Ocean Avenue');
  const [apartment, setApartment] = useState('Suite 4B');
  const [city, setCity] = useState('Santa Monica');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('90401');

  // Shipping Speed
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const shippingSpeedCost = shippingMethod === 'standard' 
    ? (subtotal >= 75 || appliedCoupon === 'FREESHIP' ? 0 : 7.95)
    : shippingMethod === 'express' ? 14.95 : 24.95;

  // Payment Form
  const [paymentType, setPaymentType] = useState<'card' | 'applepay' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('384');
  const [cardName, setCardName] = useState('Jessica Miller');

  if (!isCheckoutOpen) return null;

  const adjustedTotal = Number((Math.max(0, subtotal - discount) + shippingSpeedCost + tax).toFixed(2));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColorName: item.selectedColor.name
      }));

      const newOrder = createOrder({
        items: orderItems,
        subtotal,
        discount,
        shipping: shippingSpeedCost,
        tax,
        total: adjustedTotal,
        shippingAddress: {
          firstName,
          lastName,
          street,
          apartment,
          city,
          state,
          zipCode,
          phone,
          email
        },
        shippingMethod: shippingMethod === 'standard' 
          ? 'Standard Ground (3-5 Days)' 
          : shippingMethod === 'express' ? 'FedEx 2-Day Express' : 'Priority Overnight'
      });

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
    setCompletedOrder(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        
        {/* Checkout Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:px-8 border-b border-neutral-200 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl tracking-[0.2em] font-normal uppercase text-[#121212]">
                MINK RETAIL
              </span>
              <span className="hidden sm:inline-block text-neutral-300">|</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit Encrypted US Checkout
              </span>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Stepper Header (Only when not confirmed) */}
          {step !== 'confirmation' && (
            <div className="px-5 sm:px-8 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-center gap-6 text-xs font-semibold">
              <button
                onClick={() => setStep('shipping')}
                className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-black' : 'text-neutral-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'shipping' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-700'
                }`}>1</span>
                <span>Shipping Address</span>
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />

              <button
                onClick={() => setStep('payment')}
                className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-black' : 'text-neutral-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'payment' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-700'
                }`}>2</span>
                <span>Payment & Place Order</span>
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8">
            
            {/* Step 3: ORDER CONFIRMATION */}
            {step === 'confirmation' && completedOrder && (
              <div className="text-center py-6 max-w-xl mx-auto animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#A3704C] block mb-1">
                  Order Successfully Placed
                </span>
                <h2 className="font-serif text-3xl font-normal text-neutral-900 mb-2">
                  Thank You, {completedOrder.shippingAddress.firstName}!
                </h2>
                <p className="text-xs text-neutral-600 mb-6 font-light">
                  A confirmation email with your printable receipt has been dispatched to <strong>{completedOrder.shippingAddress.email}</strong>.
                </p>

                {/* Order Details Card */}
                <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-neutral-200 text-left space-y-4 mb-6">
                  <div className="flex flex-wrap justify-between items-center pb-3 border-b border-neutral-200 text-xs gap-2">
                    <div>
                      <span className="text-neutral-500 block">Order Number</span>
                      <span className="font-bold text-neutral-900 text-sm">{completedOrder.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Date</span>
                      <span className="font-medium text-neutral-900">{completedOrder.date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Total Paid</span>
                      <span className="font-bold text-neutral-900">${completedOrder.total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Delivery & Carrier info */}
                  <div className="text-xs space-y-1">
                    <p className="text-neutral-500">Shipping To:</p>
                    <p className="font-medium text-neutral-900">
                      {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.zipCode}, USA
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-emerald-700 font-semibold">
                      <Truck className="w-4 h-4" />
                      <span>{completedOrder.carrier} • Tracking #{completedOrder.trackingNumber}</span>
                    </div>
                  </div>

                  {/* Purchased items list */}
                  <div className="pt-3 border-t border-neutral-200 space-y-2">
                    {completedOrder.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={it.image} alt="" className="w-9 h-9 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-medium text-neutral-900">{it.productName}</p>
                            <p className="text-[10px] text-neutral-500">Size: {it.selectedSize} • {it.selectedColorName} (Qty: {it.quantity})</p>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-900">${(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      handleClose();
                      setIsOrderTrackingOpen(true);
                    }}
                    className="px-6 py-3 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
                  >
                    Track Package Live
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      setActiveView('shop');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-white border border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Step 1 & 2 Form Layout */}
            {step !== 'confirmation' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Input Forms */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {step === 'shipping' && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="font-serif text-xl font-normal text-neutral-900">
                        1. Contact & US Shipping Details
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">Phone Number (For Tracking Updates) *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">Last Name *</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-neutral-700 font-semibold mb-1">Street Address *</label>
                          <input
                            type="text"
                            required
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="House number and street name"
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">Apartment, Suite, Unit</label>
                          <input
                            type="text"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            placeholder="Optional"
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">State (USA) *</label>
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black cursor-pointer"
                          >
                            {US_STATES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-neutral-700 font-semibold mb-1">ZIP / Postal Code *</label>
                          <input
                            type="text"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      {/* Shipping Speed Options */}
                      <div className="pt-4 border-t border-neutral-200">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                          Select US Delivery Speed
                        </label>
                        <div className="space-y-2.5 text-xs">
                          <label
                            onClick={() => setShippingMethod('standard')}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                              shippingMethod === 'standard' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                checked={shippingMethod === 'standard'}
                                onChange={() => setShippingMethod('standard')}
                                className="accent-black"
                              />
                              <div>
                                <p className="font-semibold text-neutral-900">Standard Domestic Ground (3-5 Business Days)</p>
                                <p className="text-[11px] text-neutral-500">FedEx Ground or USPS Priority</p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">
                              {subtotal >= 75 || appliedCoupon === 'FREESHIP' ? 'Free' : '$7.95'}
                            </span>
                          </label>

                          <label
                            onClick={() => setShippingMethod('express')}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                              shippingMethod === 'express' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                checked={shippingMethod === 'express'}
                                onChange={() => setShippingMethod('express')}
                                className="accent-black"
                              />
                              <div>
                                <p className="font-semibold text-neutral-900">FedEx 2-Day Air Express</p>
                                <p className="text-[11px] text-neutral-500">Guaranteed 2 business day US transit</p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">$14.95</span>
                          </label>

                          <label
                            onClick={() => setShippingMethod('overnight')}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                              shippingMethod === 'overnight' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shippingMethod"
                                checked={shippingMethod === 'overnight'}
                                onChange={() => setShippingMethod('overnight')}
                                className="accent-black"
                              />
                              <div>
                                <p className="font-semibold text-neutral-900">Priority Next-Day Overnight</p>
                                <p className="text-[11px] text-neutral-500">Next morning dispatch with signature</p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">$24.95</span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep('payment')}
                        className="w-full py-3.5 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors shadow-md mt-4"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  )}

                  {step === 'payment' && (
                    <form onSubmit={handlePlaceOrder} className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-normal text-neutral-900">
                          2. Payment Selection
                        </h3>
                        <button
                          type="button"
                          onClick={() => setStep('shipping')}
                          className="text-xs text-neutral-500 hover:text-black flex items-center gap-1 font-medium"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
                        </button>
                      </div>

                      {/* Payment Method Selector Tabs */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentType('card')}
                          className={`py-3 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                            paymentType === 'card'
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900 ring-1 ring-neutral-900'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <CreditCard className="w-4 h-4 text-neutral-700" />
                          <span>Credit Card</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentType('applepay')}
                          className={`py-3 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                            paymentType === 'applepay'
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900 ring-1 ring-neutral-900'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <span className="font-bold"> Pay</span>
                          <span>Apple Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentType('paypal')}
                          className={`py-3 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                            paymentType === 'paypal'
                              ? 'border-neutral-900 bg-neutral-50 text-neutral-900 ring-1 ring-neutral-900'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <span className="font-bold text-blue-700">PayPal</span>
                          <span>PayPal</span>
                        </button>
                      </div>

                      {/* Card Inputs */}
                      {paymentType === 'card' ? (
                        <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-neutral-200 space-y-3 text-xs">
                          <div>
                            <label className="block text-neutral-700 font-semibold mb-1">Name on Card</label>
                            <input
                              type="text"
                              required
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-700 font-semibold mb-1">Card Number</label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black font-mono"
                              />
                              <CreditCard className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-neutral-700 font-semibold mb-1">Expiration (MM/YY)</label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-neutral-700 font-semibold mb-1">Security Code (CVV)</label>
                              <input
                                type="text"
                                required
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-black font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-600">
                          <p className="font-semibold text-neutral-900 mb-1">Demo Integration Ready</p>
                          <p>Click "Authorize & Place Order" to complete this simulated {paymentType === 'applepay' ? 'Apple Pay' : 'PayPal'} transaction.</p>
                        </div>
                      )}

                      <div className="p-3 bg-neutral-100 rounded-xl text-[11px] text-neutral-600 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#A3704C] shrink-0" />
                        <span>Demo Mode: No actual credit card charge will be made. You will receive an immediate simulated order confirmation and live tracking number.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing Secure US Order...</span>
                          </div>
                        ) : (
                          <span>Authorize & Place Order • ${adjustedTotal.toFixed(2)} USD</span>
                        )}
                      </button>
                    </form>
                  )}

                </div>

                {/* Right Column: Order Summary Sidebar */}
                <div className="lg:col-span-5 bg-[#FAF9F6] p-5 sm:p-6 rounded-2xl border border-neutral-200/80 h-fit space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-200">
                    Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h4>

                  {/* Items thumbnail list */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <img
                              src={item.product.images[0]}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover bg-neutral-200"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] font-bold flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-900 line-clamp-1">{item.product.name}</p>
                            <p className="text-[10px] text-neutral-500">{item.selectedSize} • {item.selectedColor.name}</p>
                          </div>
                        </div>
                        <span className="font-medium text-neutral-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subtotals */}
                  <div className="space-y-2 text-xs text-neutral-600 pt-3 border-t border-neutral-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Promo Code ({appliedCoupon})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping ({shippingMethod})</span>
                      <span>{shippingSpeedCost === 0 ? <strong className="text-emerald-700 uppercase text-[10px]">Free</strong> : `$${shippingSpeedCost.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>US Sales Tax (Estimated)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                      <span>Total</span>
                      <span>${adjustedTotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-neutral-200 text-[11px] text-neutral-500 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#A3704C] shrink-0" />
                    <span>Dispatched from California within 24 hours.</span>
                  </div>

                </div>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
