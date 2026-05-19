import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, login, logout } from '@/entities/user/api/user.api';

function persistSession(username: string, role: string) {
  localStorage.setItem('username', username);
  localStorage.setItem('role', role);
}

function clearSession() {
  localStorage.removeItem('username');
  localStorage.removeItem('role');
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await login({ username, password });
      persistSession(data.username, data.role);
      router.push('/welcome');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const data = await getMe();
      persistSession(data.username, data.role);
      return true;
    } catch {
      clearSession();
      return false;
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      /* cookie puede no existir */
    }
    clearSession();
    router.push('/');
  };

  return { isLoading, error, handleLogin, handleLogout, validateSession };
}
