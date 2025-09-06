'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { apiClient } from '@/services/api';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AUTH_KEYS = {
  ACCESS_TOKEN: 'letta_access_token',
  REFRESH_TOKEN: 'letta_refresh_token',
  USER: 'letta_user',
} as const;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(AUTH_KEYS.USER);
        const accessToken = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
        
        if (storedUser && accessToken) {
          const userData = JSON.parse(storedUser);
          
          // Validate token with backend
          const isValid = await apiClient.validateToken(accessToken);
          
          if (isValid) {
            setUser(userData);
          } else {
            // Try to refresh token
            const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
            if (refreshToken) {
              try {
                const authResponse = await apiClient.refreshToken(refreshToken);
                setUser(authResponse.user);
                updateStoredAuth(authResponse);
              } catch (error) {
                clearAuth();
              }
            } else {
              clearAuth();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const updateStoredAuth = (authResponse: { access_token: string; refresh_token: string; user: User }) => {
    localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, authResponse.access_token);
    localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, authResponse.refresh_token);
    localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(authResponse.user));
  };

  const clearAuth = () => {
    localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_KEYS.USER);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Starting login process...', { email });
      setIsLoading(true);
      
      console.log('📡 Making API call to backend...');
      const authResponse = await apiClient.login({ email, password });
      console.log('✅ Login successful:', { user: authResponse.user });
      
      setUser(authResponse.user);
      updateStoredAuth(authResponse);
      
      console.log('💾 Auth data stored in localStorage');
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('❌ Login failed:', error);
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
      console.log('🏁 Login process completed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const authResponse = await apiClient.register({ email, password, name });
      
      setUser(authResponse.user);
      updateStoredAuth(authResponse);
      
      toast.success('Registration successful! Welcome!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    toast.success('Successfully logged out');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};