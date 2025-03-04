import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { AuthState, User, UserRole } from '../types';
import { router } from 'expo-router';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode<{ user: User }>(token);
          setState({
            isAuthenticated: true,
            user: decodedToken.user,
            token,
            loading: false,
            error: null,
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Failed to load auth token:', error);
        setState({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: 'Failed to authenticate',
        });
      }
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+1234567890',
        role: email.includes('admin') ? 'admin' : email.includes('delivery') ? 'delivery' : 'customer',
      };
      
      const mockToken = 'mock_jwt_token';
      
      await AsyncStorage.setItem('token', mockToken);
      
      setState({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false,
        error: null,
      });
      
      // Redirect based on role
      if (mockUser.role === 'admin') {
        router.replace('/(admin)');
      } else if (mockUser.role === 'delivery') {
        router.replace('/(delivery)');
      } else {
        router.replace('/(customer)');
      }
    } catch (error) {
      console.error('Login error:', error);
      setState({
        ...state,
        loading: false,
        error: 'Invalid email or password',
      });
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setState({ ...state, loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        name,
        email,
        phone: '',
        role,
      };
      
      const mockToken = 'mock_jwt_token';
      
      await AsyncStorage.setItem('token', mockToken);
      
      setState({
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
        loading: false,
        error: null,
      });
      
      // Redirect based on role
      if (role === 'admin') {
        router.replace('/(admin)');
      } else if (role === 'delivery') {
        router.replace('/(delivery)');
      } else {
        router.replace('/(customer)');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setState({
        ...state,
        loading: false,
        error: 'Registration failed',
      });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      });
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = () => {
    setState({ ...state, error: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};