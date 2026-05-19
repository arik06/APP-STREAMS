import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/entities/user/api/user.api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await login({ username, password });
      localStorage.setItem('username', data.username);
      if (data.role) localStorage.setItem('role', data.role);
      router.push('/welcome');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    router.push('/');
  };

  return { isLoading, error, handleLogin, handleLogout };
}
