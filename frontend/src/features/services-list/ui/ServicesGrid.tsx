'use client';

import { ServiceCard } from '@/widgets/service-card/ui/ServiceCard';
import type { Service } from '@/entities/service/model/service.types';

interface ServicesGridProps {
  services: Service[];
  isLoading: boolean;
  onServiceClick: (id: number) => void;
}

export function ServicesGrid({ services, isLoading, onServiceClick }: ServicesGridProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Cargando servicios...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onClick={onServiceClick} />
      ))}
    </div>
  );
}
