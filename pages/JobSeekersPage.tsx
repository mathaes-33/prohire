
import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';

const JobSeekersPage: React.FC = () => {
    const benefits = [ "Access to exclusive job opportunities not publicly listed.", "Personalized career coaching and resume feedback.", "Confidential representation to top employers.", "Guidance through the entire interview and negotiation process.", "No cost to you - our fees are paid by employers." ];
    const industries = ["Technology & IT", "Healthcare", "Finance & Accounting", "Sales & Marketing", "Engineering", "Human Resources"];
    return (
        <div className="fade-in">
            <section className="relative text-white py-20 text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://plus.unsplash.com/premium_photo-1661765242257-5539e1d1e644?q=80&w=1280&auto=format&fit=crop" alt="Job seeker looking at opportunities" className="w-full h-full object-cover"/>
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
                            <img loading="lazy" decoding="async" src="https://plus.unsplash.com/premium_photo-1661900320520-f180a50463d7?q=80&w=870&auto=format&fit=crop" alt="A professional working on a laptop in a bright office" className="rounded-lg shadow-xl aspect-[4/3] object-cover" />
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

export default JobSeekersPage;