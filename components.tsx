
import React from 'react';
import { Link } from 'react-router-dom';
import { Job, Testimonial, IconProps } from './data';

export const Icons = {
    Briefcase: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.998a2.25 2.25 0 01-2.25-2.25v-4.07m16.5 0v-2.17a2.25 2.25 0 00-2.25-2.25H5.998a2.25 2.25 0 00-2.25 2.25v2.17m16.5 0h-16.5M12 6.177a2.25 2.25 0 00-2.25 2.25V10.5h4.5v-2.073a2.25 2.25 0 00-2.25-2.25z" /></svg>,
    ChevronRight: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
    CheckCircle: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    BuildingOffice: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6.75h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
    UserGroup: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.09-2.317-1.254-2.317-1.17 0-1.823 1.294-1.254 2.317C6.1 16.59 7.354 17.5 8.75 17.5c1.396 0 2.65-1.09 2.25-2.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    ArrowUp: ({ className = '', ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...props} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>,
};

export const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
    <div className="p-6 flex-grow">
      <div className="flex items-start justify-between">
          <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
              <div className="flex items-center mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <Icons.BuildingOffice className="w-4 h-4 mr-1.5" />
                  <span>{job.company}</span>
              </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 px-2.5 py-1 rounded-full whitespace-nowrap">{job.type}</span>
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm line-clamp-2">
        {job.description}
      </p>
    </div>
    <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">{job.location}</p>
            <Link to={`/jobs/${job.id}`} className="inline-flex items-center font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200">
                View Details
                <Icons.ChevronRight className="w-4 h-4 ml-1" />
            </Link>
        </div>
    </div>
  </div>
);

export const JobCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
            <div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
            </div>
            <div className="h-7 w-24 bg-primary-100 dark:bg-primary-900/50 rounded-full"></div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-28"></div>
          </div>
      </div>
    </div>
  );

export const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg h-full">
    <blockquote className="text-slate-600 dark:text-slate-300 italic">
      "{testimonial.quote}"
    </blockquote>
    <div className="mt-6">
      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.title}, {testimonial.company}</p>
    </div>
  </div>
);


export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          aria-label="Go to top"
        >
          <Icons.ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
