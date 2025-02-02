import { useState, useEffect } from 'react';
import { AuthResponse, User } from '../types/auth.types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (data: AuthResponse) => {
    const userWithToken = {
      ...data.user,
      token: data.token
    };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    setUser(userWithToken);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, isLoading, login, logout };
};