import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TESTIMONIALS, TEAM_MEMBERS } from './data';
import type { Job } from './data';
import { Icons, JobCard, TestimonialCard, JobCardSkeleton } from './components';

export const HomePage: React.FC = () => {
    const [featuredJobs, setFeaturedJobs] = React.useState<Job[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Assuming jobs.json is in the public folder or root
                const response = await fetch('./jobs.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const allJobs: Job[] = await response.json();
                setFeaturedJobs(allJobs.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="fade-in space-y-16 md:space-y-24 pb-16">
            <section className="relative pt-24 pb-32 text-center text-white overflow-hidden">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/prohire-hero.jpg')" }}></div>
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

export const JobsPage: React.FC = () => {
    const [jobs, setJobs] = React.useState<Job[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [type, setType] = React.useState('');
    
    React.useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('./jobs.json');
                if (!response.ok) throw new Error('Failed to fetch jobs data.');
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

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

export const JobDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = React.useState<Job | null | undefined>(undefined);

    React.useEffect(() => {
        if (!id) return;
        setJob(undefined); // Set to loading state
        const fetchJob = async () => {
            try {
                const response = await fetch('./jobs.json');
                if (!response.ok) throw new Error('Job data not found');
                const jobs: Job[] = await response.json();
                const foundJob = jobs.find(j => j.id === Number(id));
                setJob(foundJob || null);
            } catch (error) {
                console.error("Error fetching job:", error);
                setJob(null); // Set to not found on error
            }
        };
        fetchJob();
    }, [id]);

    if (job === undefined) {
        return (
            <div className="fade-in flex items-center justify-center min-h-[60vh]">
                 <div className="w-16 h-16 border-4 border-primary-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (!job) {
        return <NotFoundPage />;
    }

    return (
        <div className="fade-in bg-slate-50 dark:bg-slate-950/50 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 md:p-8 bg-primary-600 dark:bg-primary-800 text-white">
                        <span className="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">{job.type}</span>
                        <h1 className="mt-4 text-3xl md:text-4xl font-bold">{job.title}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-primary-200">
                            <div className="flex items-center">
                                <Icons.BuildingOffice className="w-5 h-5 mr-2" />
                                <span>{job.company}</span>
                            </div>
                            <div className="flex items-center">
                                <Icons.Briefcase className="w-5 h-5 mr-2" />
                                <span>{job.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8 prose dark:prose-invert max-w-none">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Job Description</h2>
                                <p>{job.description}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Responsibilities</h2>
                                <ul className="space-y-2">
                                    {job.responsibilities.map((item, index) => <li key={index} className="flex items-start"><span className="text-green-500 mr-3 mt-1"><Icons.CheckCircle className="w-6 h-6" /></span><span>{item}</span></li>)}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Qualifications</h2>
                                <ul className="space-y-2">
                                    {job.qualifications.map((item, index) => <li key={index} className="flex items-start"><span className="text-green-500 mr-3 mt-1"><Icons.CheckCircle className="w-6 h-6" /></span><span>{item}</span></li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg sticky top-24">
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Ready to Apply?</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">If this sounds like the right role for you, we'd love to hear from you.</p>
                                <a href={`mailto:prohireemployment@gmail.com?subject=Application for ${job.title}`} className="w-full text-center block px-6 py-3 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 transition-transform duration-200 transform hover:scale-105">
                                    Apply Now
                                </a>
                                <Link to="/jobs" className="mt-4 w-full text-center block font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200">
                                    Back to Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EmployersPage: React.FC = () => {
    const services = [
        { name: 'Contingent Search', description: 'Flexible, success-based recruitment for non-critical roles.' },
        { name: 'Retained Search', description: 'Dedicated, exclusive search for executive and mission-critical positions.' },
        { name: 'Contract Staffing', description: 'Access to skilled professionals for short-term projects and seasonal demand.' },
        { name: 'Recruitment Process Outsourcing (RPO)', description: 'Full-cycle recruitment partnership to act as your internal talent team.' },
    ];
    const processSteps = [
        { name: 'Discovery & Alignment', description: 'We start by deeply understanding your company culture, technical needs, and role requirements.' },
        { name: 'Sourcing & Screening', description: 'Our expert recruiters leverage our network and cutting-edge tools to find and vet top candidates.' },
        { name: 'Candidate Presentation', description: 'You receive a curated shortlist of highly qualified candidates who align with your goals.' },
        { name: 'Interview & Offer', description: 'We manage interview logistics, facilitate feedback, and assist in negotiating and extending offers.' },
        { name: 'Onboarding & Follow-up', description: 'Our partnership continues as we ensure a smooth transition for your new hire.' },
    ];
    return (
        <div className="fade-in">
            <section className="relative text-white py-20 text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Office meeting" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold">Find Your Next Great Hire</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">Partner with Prohire to access top-tier talent that will drive your business forward. We streamline the hiring process so you can focus on what you do best.</p>
                    <Link to="/contact" className="mt-8 inline-block px-8 py-3 bg-white text-primary-700 font-semibold rounded-md shadow-lg hover:bg-primary-50 transition-transform duration-200 transform hover:scale-105">Request Talent</Link>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Our Recruitment Services</h2>
                    <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Tailored solutions to meet your unique hiring needs.</p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{service.name}</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Proven Process</h2>
                            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">A transparent and efficient path to hiring success.</p>
                            <div className="mt-12">
                                <ol className="space-y-8">
                                    {processSteps.map((step, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0"><span className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 text-white font-bold text-xl">{index + 1}</span></div>
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{step.name}</h3>
                                                <p className="mt-1 text-slate-600 dark:text-slate-300">{step.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <img loading="lazy" decoding="async" src="https://plus.unsplash.com/premium_photo-1661726825011-f95313124c39?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business professionals collaborating in a meeting" className="rounded-lg shadow-xl aspect-[4/3] object-cover" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const JobSeekersPage: React.FC = () => {
    const benefits = [ "Access to exclusive job opportunities not publicly listed.", "Personalized career coaching and resume feedback.", "Confidential representation to top employers.", "Guidance through the entire interview and negotiation process.", "No cost to you - our fees are paid by employers." ];
    const industries = ["Technology & IT", "Healthcare", "Finance & Accounting", "Sales & Marketing", "Engineering", "Human Resources"];
    return (
        <div className="fade-in">
            <section className="relative text-white py-20 text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://plus.unsplash.com/premium_photo-1661765242257-5539e1d1e644?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Job seeker looking at opportunities" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold">Advance Your Career With Us</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-200">You're more than a resume. We're more than a recruiter. Let's work together to find the role that elevates your career and matches your ambitions.</p>
                    <Link to="/jobs" className="mt-8 inline-block px-8 py-3 bg-white text-primary-700 font-semibold rounded-md shadow-lg hover:bg-primary-50 transition-transform duration-200 transform hover:scale-105">Browse Open Roles</Link>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="hidden lg:block">
                            <img loading="lazy" decoding="async" src="https://plus.unsplash.com/premium_photo-1661900320520-f180a50463d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A professional working on a laptop in a bright office" className="rounded-lg shadow-xl aspect-[4/3] object-cover" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Partner With Prohire?</h2>
                            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">We are your dedicated career advocates.</p>
                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <Icons.CheckCircle className='w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1' />
                                        <span className="text-slate-700 dark:text-slate-200">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Industries We Serve</h2>
                    <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">We have deep expertise and strong relationships across a variety of sectors.</p>
                    <div className="mt-12 max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                        {industries.map(industry => <span key={industry} className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium px-4 py-2 rounded-full text-lg">{industry}</span>)}
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Ready to Take the Next Step?</h2>
                    <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Submit your resume to be considered for current and future openings, or browse our active job listings.</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                         <a href="mailto:prohireemployment@gmail.com?subject=Resume Submission" className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 transition-transform duration-200 transform hover:scale-105">Submit Your Resume</a>
                        <Link to="/jobs" className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-transform duration-200 transform hover:scale-105">View Job Listings</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const AboutPage: React.FC = () => {
    const values = [
        { name: "Integrity", description: "We operate with unwavering honesty and transparency in every interaction." },
        { name: "Partnership", description: "We build lasting relationships based on mutual trust and shared goals." },
        { name: "Excellence", description: "We are relentless in our pursuit of outstanding results for clients and candidates." },
        { name: "Empathy", description: "We listen to and understand the unique needs of everyone we work with." }
    ];
    return (
        <div className="fade-in">
            <section className="bg-slate-50 dark:bg-slate-950/50 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">About Prohire Employment</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">We believe that the right person in the right role can change the world. Our mission is to be the most trusted and effective bridge between exceptional talent and premier companies.</p>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Team collaborating in a modern office" className="rounded-lg shadow-xl"/>
                        </div>
                        <div className="prose dark:prose-invert lg:prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
                            <p>Founded in 2024, Prohire Employment was born from a simple idea: the recruitment process could be better. More personal, more efficient, and more focused on creating genuine connections. We saw an opportunity to move beyond transactional placements and build true partnerships.</p>
                            <p>We are a new agency known for our deep industry expertise and our commitment to quality over quantity. We're excited to help companies build their dream teams and guide professionals to their ideal roles.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Our Core Values</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map(value => (
                            <div key={value.name} className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400">{value.name}</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">Meet Our Team</h2>
                    <p className="mt-2 text-lg text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">The dedicated professionals making it all happen.</p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map(member => (
                            <div key={member.name} className="text-center">
                                <img loading="lazy" decoding="async" src={member.imageUrl} alt={member.name} className="w-40 h-40 mx-auto rounded-full shadow-lg object-contain p-4 bg-slate-200 dark:bg-slate-700" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">{member.name}</h3>
                                <p className="text-primary-600 dark:text-primary-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        'bot-field': '', // for honeypot
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const encode = (data: { [key: string]: string }) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...formData })
        })
        .then(() => setSubmitted(true))
        .catch(error => {
            alert("An error occurred while submitting the form: " + error);
        });
    };

    return (
        <div className="fade-in bg-slate-50 dark:bg-slate-950/50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Get In Touch</h1>
                    <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">We'd love to hear from you. Whether you're a company looking to hire or a professional seeking your next role.</p>
                </header>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-xl">
                        {submitted ? (
                            <div role="alert" className="text-center flex flex-col items-center justify-center h-full">
                                <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400">Thank You!</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">Your message has been received. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form 
                                name="contact" 
                                method="post" 
                                onSubmit={handleSubmit} 
                                data-netlify="true" 
                                data-netlify-honeypot="bot-field" 
                                className="space-y-6"
                            >
                                <input type="hidden" name="form-name" value="contact" />
                                <div hidden>
                                    <label>
                                        Don’t fill this out:{' '}
                                        <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                    <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                    <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Email Us</h3>
                            <a href="mailto:prohireemployment@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">prohireemployment@gmail.com</a>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Call Us</h3>
                            <a href="tel:+1-289-499-9955" className="text-primary-600 dark:text-primary-400 hover:underline">(289) 499-9955</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const NotFoundPage: React.FC = () => (
    <div className="fade-in flex items-center justify-center min-h-[60vh] text-center px-4">
        <div>
            <h1 className="text-6xl md:text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Page Not Found</h2>
            <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10">
                <Link to="/" className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                    Go back home
                </Link>
            </div>
        </div>
    </div>
);
