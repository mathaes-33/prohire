
import React from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../data';
import type { Job } from '../data';
import { Icons } from '../components/Icons';
import JobCard from '../components/JobCard';
import TestimonialCard from '../components/TestimonialCard';
import JobCardSkeleton from '../components/JobCardSkeleton';

const fetchJobs = async (): Promise<Job[]> => {
    const response = await fetch('/jobs.json');
    if (!response.ok) {
        throw new Error('Failed to load jobs data.');
    }
    return response.json();
};

const HomePage: React.FC = () => {
    const [featuredJobs, setFeaturedJobs] = React.useState<Job[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadJobs = async () => {
            try {
                const allJobs = await fetchJobs();
                setFeaturedJobs(allJobs.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadJobs();
    }, []);

    return (
        <div className="fade-in space-y-16 md:space-y-24 pb-16">
            <section className="relative pt-24 pb-32 text-center text-white overflow-hidden">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
                 <div className="absolute inset-0 bg-black/40"></div>
                 <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Connecting Talent with Opportunity</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-200">
                        We are the bridge between exceptional professionals and the world's leading companies.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/jobs" className="px-8 py-3 bg-white text-primary-700 font-semibold rounded-md shadow-lg hover:bg-primary-50 transition-transform duration-200 transform hover:scale-105">
                            Find Your Next Job
                        </Link>
                        <Link to="/employers" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition-transform duration-200 transform hover:scale-105">
                            Request Talent
                        </Link>
                    </div>
                 </div>
            </section>
            
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl text-center">
                        <Icons.BuildingOffice className="w-12 h-12 mx-auto text-primary-600" />
                        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">For Employers</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">Access a curated pool of pre-vetted talent to build your dream team faster.</p>
                        <Link to="/employers" className="mt-6 inline-flex items-center font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200">
                            Learn More <Icons.ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl text-center">
                        <Icons.UserGroup className="w-12 h-12 mx-auto text-primary-600" />
                        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">For Job Seekers</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">Let us connect you with career-defining opportunities at innovative companies.</p>
                         <Link to="/job-seekers" className="mt-6 inline-flex items-center font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200">
                            Explore Opportunities <Icons.ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Featured Job Openings</h2>
                <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Here are some of the exciting roles we're currently looking to fill.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        <>
                            <JobCardSkeleton />
                            <JobCardSkeleton />
                            <JobCardSkeleton />
                        </>
                    ) : (
                        featuredJobs.map(job => <JobCard key={job.id} job={job} />)
                    )}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/jobs" className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 transition-transform duration-200 transform hover:scale-105">
                        View All Jobs
                    </Link>
                </div>
            </section>

            <section className="bg-slate-50 dark:bg-slate-950/50 py-16">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">What Our Partners Say</h2>
                    <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        We're proud to have built strong relationships with clients and candidates alike.
                    </p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {TESTIMONIALS.map((testimonial, index) => <TestimonialCard key={index} testimonial={testimonial} />)}
                    </div>
                 </div>
            </section>
        </div>
    );
};

export default HomePage;
