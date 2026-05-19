'use client';

import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { copyToClipboard } from '@/shared/lib/copyToClipboard';
import { formatDate } from '@/shared/lib/formatDate';
import type { ServiceDetail } from '@/entities/service/model/service.types';

interface ServiceModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!service) return null;

  const handleCopy = async (text: string, field: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg service-logo-container">
          <img src={service.image_url} alt={service.name} className="w-12 h-12 object-contain service-logo" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
          <p className="text-sm text-gray-500">Expira: {formatDate(service.end_date)}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
            <p className="text-gray-900">{service.email}</p>
            <button
              onClick={() => handleCopy(service.email, 'email')}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copiar correo"
            >
              {copiedField === 'email' ? '✅' : '📋'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-gray-900">
                {showPassword ? service.password : '•'.repeat(8)}
              </p>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {showPassword && (
              <button
                onClick={() => handleCopy(service.password, 'password')}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copiar contraseña"
              >
                {copiedField === 'password' ? '✅' : '📋'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Cerrar
        </button>
      </div>

      {copiedField && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto bg-green-500 text-white px-4 py-3 md:px-4 md:py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span>✅</span>
            <span className="text-sm font-medium text-center md:text-left">
              {copiedField === 'email' ? 'Correo copiado' : 'Contraseña copiada'}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
