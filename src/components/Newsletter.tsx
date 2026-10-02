import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    addToast('Welcome to Mink Retail! Use code MINK15 for 15% off.', 'success');
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-neutral-200 text-xs font-semibold text-[#A3704C] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Mink Journal & Club</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight mb-4">
          Stay in the Loop
        </h2>

        {/* Text */}
        <p className="text-neutral-600 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed mb-8">
          Get updates about new arrivals, exclusive offers, and special promotions.
        </p>

        {/* Subscription Form */}
        {subscribed ? (
          <div className="p-6 bg-[#FAF9F6] border border-neutral-200 rounded-2xl max-w-md mx-auto animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5 text-[#C49773]" />
            </div>
            <h4 className="font-serif text-lg font-normal text-neutral-900 mb-1">
              You're on the list
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed mb-3">
              Thank you for subscribing! Your 15% welcome code is ready to use:
            </p>
            <div className="inline-block px-4 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono font-bold text-neutral-900 tracking-wider">
              MINK15
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3.5 bg-[#FAF9F6] border border-neutral-300 rounded-full text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                  aria-label="Enter your email"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors flex items-center justify-center gap-2 shrink-0 shadow-xs"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-600 mt-2 text-left sm:text-center font-medium">
                {error}
              </p>
            )}

            <p className="text-[11px] text-neutral-400 mt-3 font-light">
              By subscribing, you agree to receive promotional emails from Mink Retail. Unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
