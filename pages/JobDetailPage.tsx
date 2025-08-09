
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Job } from '../data';
import { Icons } from '../components/Icons';
import NotFoundPage from '../pages/NotFoundPage';

const fetchJobs = async (): Promise<Job[]> => {
    const response = await fetch('/jobs.json');
    if (!response.ok) {
        throw new Error('Failed to load jobs data.');
    }
    return response.json();
};

const JobDetailPage: React.FC = () => {
    const { id } = useParams();
    const [job, setJob] = React.useState<Job | null | undefined>(undefined);

    React.useEffect(() => {
        if (!id) return;
        setJob(undefined); // Set to loading state
        const loadJob = async () => {
            try {
                const jobs = await fetchJobs();
                const foundJob = jobs.find(j => j.id === Number(id));
                setJob(foundJob || null);
            } catch (error) {
                console.error("Error fetching job:", error);
                setJob(null); // Set to not found on error
            }
        };
        loadJob();
    }, [id]);

    if (!id) {
        return <NotFoundPage />;
    }

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

export default JobDetailPage;
