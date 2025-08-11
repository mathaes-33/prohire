
import React, { useState, useEffect, createContext, useContext } from 'react';

// This will be available globally from the script in index.html
interface NetlifyIdentity {
    on(event: 'init', cb: (user: NetlifyUser | null) => void): void;
    on(event: 'login', cb: (user: NetlifyUser) => void): void;
    on(event: 'logout', cb: () => void): void;
    
    off(event: 'init', cb: (user: NetlifyUser | null) => void): void;
    off(event: 'login', cb: (user: NetlifyUser) => void): void;
    off(event: 'logout', cb: () => void): void;
    
    init(): void;
    open(): void;
    logout(): void;
    close(): void;
    currentUser(): NetlifyUser | null;
}

declare const netlifyIdentity: NetlifyIdentity;

// Define a specific type for the Netlify user object
interface UserMetadata {
  full_name: string;
}

interface NetlifyUser {
  id: string;
  email: string;
  user_metadata: UserMetadata;
}


interface AuthContextType {
  user: NetlifyUser | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<NetlifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof netlifyIdentity !== 'undefined') {
        const handleInit = (user: NetlifyUser | null) => { 
            setUser(user);
            setIsLoading(false); 
        };
        const handleLogin = (user: NetlifyUser) => { 
            setUser(user); 
            netlifyIdentity.close(); 
        };
        const handleLogout = () => { 
            setUser(null); 
        };

        netlifyIdentity.on('init', handleInit);
        netlifyIdentity.on('login', handleLogin);
        netlifyIdentity.on('logout', handleLogout);

        netlifyIdentity.init();

        // Cleanup function to remove event listeners
        return () => {
          netlifyIdentity.off('init', handleInit);
          netlifyIdentity.off('login', handleLogin);
          netlifyIdentity.off('logout', handleLogout);
        };
    } else {
        setIsLoading(false);
    }
  }, []);

  const login = () => {
    if (typeof netlifyIdentity !== 'undefined') netlifyIdentity.open();
  };

  const logout = () => {
    if (typeof netlifyIdentity !== 'undefined') netlifyIdentity.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};