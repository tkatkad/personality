import React, { useEffect } from 'react';

interface AdSenseSlotProps {
  slot?: string;
  client?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slot = '1234567890',
  client = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-0000000000000000',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'IKLAN / ADVERTISEMENT',
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // Ignore push errors when ads script isn't loaded or ad is blocked
      console.debug('AdSense script error:', e);
    }
  }, []);

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Label Compliance */}
      <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1.5">
        {label}
      </span>

      {/* Ad Container Box with Layout Shift Prevention */}
      <div className="w-full max-w-4xl min-h-[100px] sm:min-h-[120px] rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center overflow-hidden transition-all">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};
