import React from 'react';
import { Link } from 'react-router-dom';

const EmployersPage: React.FC = () => {
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

export default EmployersPage;
