
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';

import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import EmployersPage from './pages/EmployersPage';
import JobSeekersPage from './pages/JobSeekersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <JobProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:id" element={<JobDetailPage />} />
              <Route path="employers" element={<EmployersPage />} />
              <Route path="job-seekers" element={<JobSeekersPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;