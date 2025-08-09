

import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation, Link, NavLink } from 'react-router-dom';
import {
  HomePage, JobsPage, JobDetailPage, EmployersPage, JobSeekersPage, AboutPage, ContactPage, NotFoundPage
} from './pages';
import { ScrollToTopButton } from './components';

// This will be available globally from the script in index.html
declare const netlifyIdentity: any;

interface AuthContextType {
  user: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    if (typeof netlifyIdentity !== 'undefined') {
        const handleInit = (user: any) => { if(isMounted) setUser(user); };
        const handleLogin = (user: any) => { if(isMounted) { setUser(user); netlifyIdentity.close(); }};
        const handleLogout = () => { if(isMounted) setUser(null); };

        netlifyIdentity.on('init', handleInit);
        netlifyIdentity.on('login', handleLogin);
        netlifyIdentity.on('logout', handleLogout);

        netlifyIdentity.init();
    }
    return () => { isMounted = false; /* Basic cleanup for async operations */ };
  }, []);

  const login = () => {
    if (typeof netlifyIdentity !== 'undefined') netlifyIdentity.open();
  };

  const logout = () => {
    if (typeof netlifyIdentity !== 'undefined') netlifyIdentity.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const navLinks = [
  { path: '/jobs', label: 'Jobs' },
  { path: '/employers', label: 'For Employers' },
  { path: '/job-seekers', label: 'For Job Seekers' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

interface HeaderProps {
  currentTheme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, toggleTheme }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, login, logout } = useAuth();

  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const NavLinkItem: React.FC<{ path: string, children: React.ReactNode, className?: string }> = ({ path, children, className }) => (
    <NavLink 
      to={path} 
      className={({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${className} ${isActive ? 'active' : ''}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header role="banner" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm dark:shadow-slate-800">
      <nav role="navigation" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
            <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" className="fill-primary-900 dark:fill-primary-950"/>
                <g stroke="currentColor" strokeWidth="3"><line x1="24" y1="14" x2="15" y2="31"></line><line x1="15" y1="31" x2="33" y2="31"></line><line x1="33" y1="31" x2="24" y2="14"></line></g>
                <circle cx="24" cy="14" r="5" fill="currentColor"></circle><circle cx="15" cy="31" r="5" fill="currentColor"></circle><circle cx="33" cy="31" r="5" fill="currentColor"></circle>
            </svg>
            <span className="text-xl font-bold">
                <span className="text-primary-600 dark:text-primary-400">Prohire</span>
                <span className="text-slate-800 dark:text-white">Employment</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navLinks.map(link => <NavLinkItem key={link.path} path={link.path}>{link.label}</NavLinkItem>)}
          </div>
          
          <div className="flex items-center">
             <div className="hidden md:flex items-center">
                 {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                           Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}
                        </span>
                        <button onClick={logout} className="px-3 py-2 text-sm font-semibold rounded-md text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-slate-800 transition-colors">
                            Logout
                        </button>
                    </div>
                 ) : (
                    <button onClick={login} className="px-4 py-2 text-sm font-semibold rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm">
                        Login / Sign Up
                    </button>
                 )}
            </div>
            <button onClick={toggleTheme} aria-label="Toggle dark mode" className="ml-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              {currentTheme === 'light' ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>
              }
            </button>
            <div className="md:hidden ml-2">
                <button onClick={() => setMenuOpen(!isMenuOpen)} aria-controls="mobile-menu" aria-expanded={isMenuOpen} className="p-2 rounded-md text-slate-500 dark:text-slate-400">
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" /></svg>
                  }
                </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
             {navLinks.map(link => <NavLinkItem key={link.path} path={link.path} className="block">{link.label}</NavLinkItem>)}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 px-2">
                {user ? (
                    <div className="space-y-3">
                         <span className="block px-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}
                         </span>
                         <button onClick={logout} className="w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-slate-800 transition-colors">
                            Logout
                         </button>
                    </div>
                ) : (
                    <button onClick={login} className="w-full text-left px-3 py-2 rounded-md text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                        Login / Sign Up
                    </button>
                )}
             </div>
          </div>
        )}
      </nav>
    </header>
  );
};

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
                            {navLinks.map(link => <li key={link.path}><Link to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{link.label}</Link></li>)}
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

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC = () => {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (userPrefersDark ? 'dark' : 'light');
  });

  React.useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentTheme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
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
      </AuthProvider>
    </HashRouter>
  );
};

export default App;