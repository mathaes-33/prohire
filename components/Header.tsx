
import React from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NAV_LINKS } from '../data';

interface HeaderProps {
  currentTheme: string;
  toggleTheme: () => void;
}

const Header = ({ currentTheme, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, login, logout, isLoading } = useAuth();

  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const NavLinkItem = ({ path, children, className }: { path: string, children: React.ReactNode, className?: string }) => (
    <NavLink 
      to={path} 
      className={({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 ${className || ''} ${isActive ? 'active' : ''}`
      }
    >
      {children}
    </NavLink>
  );

  const AuthSection = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (isLoading) {
        return (
            <div className={`h-10 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse ${isMobile ? 'w-full' : 'w-48'}`}></div>
        );
    }

    if (user) {
        return (
            <div className={`flex items-center ${isMobile ? 'flex-col items-start space-y-3' : 'space-x-4'}`}>
                <span className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${isMobile ? 'px-2' : 'whitespace-nowrap'}`}>
                   Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}
                </span>
                <button 
                    onClick={logout} 
                    className={`text-sm font-semibold rounded-md text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-slate-800 transition-colors ${isMobile ? 'w-full text-left px-3 py-2' : 'px-3 py-2'}`}
                >
                    Logout
                </button>
            </div>
        );
    }
    
    return (
        <button 
            onClick={login} 
            className={`text-sm font-semibold rounded-md transition-colors ${isMobile ? 'w-full text-left px-3 py-2 bg-primary-600 text-white hover:bg-primary-700' : 'px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 shadow-sm'}`}
        >
            Login / Sign Up
        </button>
    );
  };

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
            {NAV_LINKS.map(link => <NavLinkItem key={link.path} path={link.path}>{link.label}</NavLinkItem>)}
          </div>
          
          <div className="flex items-center">
             <div className="hidden md:flex items-center">
                 <AuthSection />
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
             {NAV_LINKS.map(link => <NavLinkItem key={link.path} path={link.path} className="block">{link.label}</NavLinkItem>)}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 px-2">
                <AuthSection isMobile={true} />
             </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;