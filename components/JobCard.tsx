
import React from 'react';
import { Link } from 'react-router-dom';
import type { Job } from '../data';
import { Icons } from './Icons';

const JobCard = ({ job }: { job: Job }) => (
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

export default JobCard;