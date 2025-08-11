
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Job } from '../data';

interface JobContextType {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  getJobById: (id: number) => Job | undefined;
}

const JobContext = createContext<JobContextType | null>(null);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const jobsById = useMemo(() => {
    const map = new Map<number, Job>();
    jobs.forEach(job => {
      map.set(job.id, job);
    });
    return map;
  }, [jobs]);

  const getJobById = (id: number): Job | undefined => {
    return jobsById.get(id);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/jobs.json');
        if (!response.ok) {
          throw new Error('Failed to load jobs data.');
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const value = { jobs, isLoading, error, getJobById };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};