import React, { createContext, useState, useEffect, ReactNode } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { JSX } from 'react/jsx-runtime';

// Better-Auth compatible API URL
const API_URL = 'https://ai-rative-book-backend-production.up.railway.app/api';

interface UserBackground {
  programming_experience: string;
  robotics_experience: string;
  preferred_languages: string[];
  hardware_access: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
  background?: UserBackground;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, background: UserBackground) => Promise<void>;
  logout: () => void;
  updateBackground: (background: UserBackground) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateBackground: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (!isBrowser) return;
    
    // Check for existing session
    const token = localStorage.getItem('physicalai_session_token');
    const storedUser = localStorage.getItem('physicalai_user');
    
    if (token && storedUser) {
      setSessionToken(token);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [isBrowser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      
      setUser(data.user);
      setSessionToken(data.session_token);
      
      if (isBrowser) {
        localStorage.setItem('physicalai_session_token', data.session_token);
        localStorage.setItem('physicalai_user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, background: UserBackground) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, background }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Signup failed');
      }

      const data = await response.json();
      
      setUser(data.user);
      setSessionToken(data.session_token);
      
      if (isBrowser) {
        localStorage.setItem('physicalai_session_token', data.session_token);
        localStorage.setItem('physicalai_user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (sessionToken) {
        await fetch(`${API_URL}/auth/signout?session_token=${sessionToken}`, {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setUser(null);
    setSessionToken(null);
    
    if (isBrowser) {
      localStorage.removeItem('physicalai_session_token');
      localStorage.removeItem('physicalai_user');
    }
  };

  const updateBackground = (background: UserBackground) => {
    if (user) {
      const updatedUser = { ...user, background };
      setUser(updatedUser);
      if (isBrowser) {
        localStorage.setItem('physicalai_user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateBackground,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
