import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-6 h-6 text-[#A3704C]" />,
      title: 'Fast US Shipping',
      subtitle: 'Free delivery on all orders over $75',
      caption: 'Dispatched in 24 hours via FedEx / UPS'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#A3704C]" />,
      title: 'Secure Checkout',
      subtitle: '256-Bit SSL bank-grade security',
      caption: 'Pay safely with Card, Apple Pay, PayPal'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#A3704C]" />,
      title: 'Easy 30-Day Returns',
      subtitle: 'Prepaid US return label included',
      caption: 'Hassle-free size exchanges & full refunds'
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#A3704C]" />,
      title: 'Dedicated US Support',
      subtitle: '7-day customer concierge team',
      caption: 'Direct styling advice & instant assistance'
    }
  ];

  return (
    <section className="bg-white border-b border-neutral-200/80 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-neutral-50/80"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs font-medium text-neutral-700 mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
