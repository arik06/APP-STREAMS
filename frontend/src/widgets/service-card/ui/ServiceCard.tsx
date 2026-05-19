'use client';

import { formatDate } from '@/shared/lib/formatDate';
import type { Service } from '@/entities/service/model/service.types';

interface ServiceCardProps {
  service: Service;
  onClick: (id: number) => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={() => onClick(service.id)}
      className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer p-6 border border-white/20 hover:bg-white/20"
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/30 service-logo-container">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-12 h-12 object-contain service-logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
          <p className="text-sm text-white/80">Expira: {formatDate(service.end_date)}</p>
        </div>
        <span className="text-white/60">👁️</span>
      </div>
    </div>
  );
}
