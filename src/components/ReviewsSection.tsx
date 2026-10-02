import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Emily Chandler',
      location: 'Los Angeles, California',
      productName: 'The Mink Amalfi Medallion Slide',
      rating: 5,
      date: 'September 12, 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Incredible comfort & timeless resort style',
      comment: 'I wore these every single day during my trip to Cabo. The arch cushioning is so much softer than standard designer flat slides. The gold hardware adds such a high-end touch to simple linen dresses.'
    },
    {
      name: 'Jessica Vance',
      location: 'Miami Beach, Florida',
      productName: 'The Mink Saint-Tropez Cutout Slide',
      rating: 5,
      date: 'September 04, 2026',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      title: 'Flawless Madagascan raffia weave',
      comment: 'The contrast of the rich black leather trim and the natural woven raffia is exquisite. Delivery to Florida took only 2 days. The packaging and custom cotton dust bags made unboxing feel like a true luxury experience.'
    },
    {
      name: 'Sarah Mitchell',
      location: 'Austin, Texas',
      productName: 'The Mink Positano Woven Tote',
      rating: 5,
      date: 'August 29, 2026',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      title: 'Rich leather that gets better with wear',
      comment: 'The leather smells heavenly and the woven craftsmanship is second to none. It holds my laptop, Mink slides, sunscreen, and daily essentials with effortless elegance.'
    },
    {
      name: 'Chloe Wainwright',
      location: 'Manhattan, New York',
      productName: 'The Mink Cannes Linen Trouser',
      rating: 5,
      date: 'August 22, 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      title: 'The perfect high-waist drape',
      comment: 'Usually linen pants wrinkle into a mess within an hour, but this European flax linen has the perfect substantial drape. The subtle elastic back waistband is genius.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs text-xs font-semibold text-neutral-800 mb-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Global US Satisfaction</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
            Loved by Customers Across the USA
          </h2>
          <p className="text-neutral-500 text-sm mt-3 font-normal">
            Read authentic reviews from verified purchasers enjoying Mink Retail handcrafted footwear and lifestyle essentials.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-6 h-6 text-neutral-200 mb-3" />

                {/* Star rating */}
                <div className="flex text-amber-500 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Review title */}
                <h4 className="font-semibold text-sm text-neutral-900 mb-2">
                  "{rev.title}"
                </h4>

                {/* Comment body */}
                <p className="text-xs text-neutral-600 leading-relaxed font-light mb-4">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer info */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-neutral-900">{rev.name}</span>
                    <span title="Verified US Buyer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400">{rev.location}</p>
                  <p className="text-[10px] font-medium text-[#A3704C] truncate max-w-[170px] mt-0.5">
                    Purchased: {rev.productName}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
