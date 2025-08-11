
import React from 'react';
import { TEAM_MEMBERS } from '../data';
import { PlaceholderUserIcon } from '../components/PlaceholderUserIcon';

const AboutPage = () => {
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
                            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1080&auto=format&fit=crop" alt="Team collaborating in a modern office" className="rounded-lg shadow-xl"/>
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
                                <div className="w-40 h-40 mx-auto rounded-full shadow-lg flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                                   <PlaceholderUserIcon className="w-32 h-32 text-slate-400 dark:text-slate-500" />
                                </div>
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

export default AboutPage;