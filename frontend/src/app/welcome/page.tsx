'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/model/auth.model';
import { useServices } from '@/features/services-list/model/services-list.model';
import { Header } from '@/widgets/header/ui/Header';
import { ServicesGrid } from '@/features/services-list/ui/ServicesGrid';
import { ServiceModal } from '@/widgets/service-modal/ui/ServiceModal';
import { InactivityTimer } from '@/features/inactivity-timer/ui/InactivityTimer';

export default function WelcomePage() {
  const router = useRouter();
  const { handleLogout, validateSession } = useAuth();
  const { services, selectedService, showModal, isLoading, fetchServices, handleServiceClick, closeModal } = useServices();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('Usuario');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const valid = await validateSession();
      if (cancelled) return;
      if (!valid) {
        router.push('/');
        return;
      }
      const storedUsername = localStorage.getItem('username') || 'Usuario';
      const role = localStorage.getItem('role');
      setUsername(storedUsername);
      if (role === 'admin') setIsAdmin(true);
      fetchServices();
    })();

    return () => {
      cancelled = true;
    };
  }, [router, fetchServices, validateSession]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Header username={username} onLogout={handleLogout} isAdmin={isAdmin} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServicesGrid services={services} isLoading={isLoading} onServiceClick={handleServiceClick} />
      </div>

      <ServiceModal service={selectedService} isOpen={showModal} onClose={closeModal} />

      <InactivityTimer onLogout={handleLogout} />
    </div>
  );
}
