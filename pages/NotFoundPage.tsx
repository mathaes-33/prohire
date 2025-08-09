import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
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

export default NotFoundPage;
