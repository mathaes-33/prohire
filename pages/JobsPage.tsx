
import React from 'react';
import { useJobs } from '../contexts/JobContext';
import JobCard from '../components/JobCard';
import JobCardSkeleton from '../components/JobCardSkeleton';

const JobsPage: React.FC = () => {
    const { jobs, isLoading, error } = useJobs();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [type, setType] = React.useState('');
    
    const uniqueLocations = React.useMemo(() => [...new Set(jobs.map(job => job.location))], [jobs]);
    const jobTypes = React.useMemo(() => [...new Set(jobs.map(job => job.type))], [jobs]);

    const filteredJobs = React.useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = location ? job.location === location : true;
            const matchesType = type ? job.type === type : true;
            return matchesSearch && matchesLocation && matchesType;
        });
    }, [jobs, searchTerm, location, type]);

    const resetFilters = () => {
        setSearchTerm('');
        setLocation('');
        setType('');
    };

    return (
        <div className="fade-in bg-slate-50 dark:bg-slate-950/50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Find Your Next Opportunity</h1>
                    <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">Browse our open positions and find the perfect fit for your skills and ambitions.</p>
                </header>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="search-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Search by Title/Company</label>
                        <input type="text" id="search-filter" placeholder="e.g., Engineer, Innovatech" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="location-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                        <select id="location-filter" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white" disabled={isLoading}>
                            <option value="">All Locations</option>
                            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="type-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Type</label>
                        <select id="type-filter" value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white" disabled={isLoading}>
                            <option value="">All Types</option>
                            {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <button onClick={resetFilters} className="w-full md:w-auto px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition duration-200">
                        Reset Filters
                    </button>
                </div>
                
                {isLoading ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => <JobCardSkeleton key={i} />)}
                     </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400">Could not load jobs</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">{error}</p>
                    </div>
                ) : filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No jobs match your criteria</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Try adjusting your filters or check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsPage;