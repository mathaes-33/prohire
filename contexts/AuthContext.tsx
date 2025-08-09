import React, { useState, useEffect, createContext, useContext } from 'react';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
