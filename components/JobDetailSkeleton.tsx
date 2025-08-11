
import React from 'react';

const JobDetailSkeleton = () => {
    return (
        <div className="fade-in bg-slate-50 dark:bg-slate-950/50 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-xl overflow-hidden animate-pulse">
                    <div className="p-6 md:p-8 bg-primary-600/70 dark:bg-primary-800/70">
                        <div className="h-7 w-28 bg-white/30 rounded-full"></div>
                        <div className="mt-4 h-9 w-3/4 bg-white/30 rounded"></div>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <div className="h-5 w-36 bg-white/30 rounded"></div>
                            <div className="h-5 w-32 bg-white/30 rounded"></div>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-10">
                            <div>
                                <div className="h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>
                           <div>
                                <div className="h-7 w-56 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                                <div className="space-y-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mr-3 mt-1 flex-shrink-0"></div>
                                            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                           <div>
                                <div className="h-7 w-52 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                                <div className="space-y-3">
                                   {[...Array(2)].map((_, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mr-3 mt-1 flex-shrink-0"></div>
                                            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg sticky top-24">
                                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                                <div className="h-12 w-full bg-primary-300 dark:bg-primary-700/50 rounded-md"></div>
                                <div className="mt-4 h-5 w-3/5 mx-auto bg-slate-200 dark:bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailSkeleton;