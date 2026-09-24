import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse p-4">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>

      <div className="space-y-3 pt-4">
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};
