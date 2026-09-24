import React from 'react';
import { ShoppingBag, ExternalLink, Star, ShieldCheck } from 'lucide-react';

interface ShopeeAffiliateCardProps {
  title?: string;
  author?: string;
  description?: string;
  shopeeUrl?: string;
  imageUrl?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  badgeText?: string;
  className?: string;
}

export const ShopeeAffiliateCard: React.FC<ShopeeAffiliateCardProps> = ({
  title = 'Buku Pengembangan Diri & Karir Pilihan (Atomic Habits / Psychology of Money)',
  author = 'Rekomendasi Terbaik Karir & Kepribadian',
  description = 'Buku fisik original cetakan terbaru untuk melejitkan potensi kepribadian dan disiplin kerja Anda.',
  shopeeUrl = 'https://shopee.co.id', // User replaces this with their Shopee Affiliate Link
  imageUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
  price = 'Rp 85.000',
  originalPrice = 'Rp 115.000',
  rating = 4.9,
  badgeText = 'Shopee Official Store / Original',
  className = '',
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/5 dark:from-amber-950/40 dark:to-orange-950/20 border border-orange-300/80 dark:border-orange-800/60 shadow-sm transition-all hover:shadow-md ${className}`}>
      {/* Header Badge & Disclosure */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500 text-white font-extrabold text-[11px] tracking-wide shadow-sm">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>REKOMENDASI SHOPEE</span>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Link Afiliasi Resmi
        </span>
      </div>

      {/* Main Product Card */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
            PROMO
          </span>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-1.5 text-center sm:text-left">
          <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400">
            {badgeText}
          </span>
          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
            {title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
              {price}
            </span>
            {originalPrice && (
              <span className="line-through text-slate-400 text-xs">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={shopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 shadow-md hover:shadow-orange-500/20"
        >
          <span>Beli di Shopee</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
