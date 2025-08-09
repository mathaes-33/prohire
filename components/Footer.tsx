import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer role="contentinfo" className="bg-slate-100 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-slate-800 dark:text-white mb-4">
                            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" className="fill-primary-900 dark:fill-primary-950"/><g stroke="currentColor" strokeWidth="3"><line x1="24" y1="14" x2="15" y2="31"></line><line x1="15" y1="31" x2="33" y2="31"></line><line x1="33" y1="31" x2="24" y2="14"></line></g><circle cx="24" cy="14" r="5" fill="currentColor"></circle><circle cx="15" cy="31" r="5" fill="currentColor"></circle><circle cx="33" cy="31" r="5" fill="currentColor"></circle></svg>
                            <span>Prohire Employment</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Connecting top-tier talent with the world's most innovative companies.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map(link => <li key={link.path}><Link to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contact</h3>
                        <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                            <li><a href="mailto:prohireemployment@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">prohireemployment@gmail.com</a></li>
                            <li><a href="tel:+1-289-499-9955" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">(289) 499-9955</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><span className="sr-only">Twitter</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.848-.764-.024-1.482-.234-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.092 7.14 2.092 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602.91-.658 1.7-1.476 2.323-2.41z" /></svg></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><span className="sr-only">LinkedIn</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>&copy; {currentYear} Prohire Employment. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
