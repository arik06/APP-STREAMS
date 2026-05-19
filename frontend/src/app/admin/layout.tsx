'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/widgets/admin-sidebar/ui/AdminSidebar';
import { useAuth } from '@/features/auth/model/auth.model';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { validateSession } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const valid = await validateSession();
      if (cancelled) return;
      const role = localStorage.getItem('role');
      if (!valid || role !== 'admin') {
        router.push('/');
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [router, validateSession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Verificando acceso...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
