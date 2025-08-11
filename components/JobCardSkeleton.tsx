
import React from 'react';

const JobCardSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
            <div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
            </div>
            <div className="h-7 w-24 bg-primary-100 dark:bg-primary-900/50 rounded-full"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-28"></div>
          </div>
      </div>
    </div>
  );

  export default JobCardSkeleton;