import { useState, useCallback } from 'react';
import { getServices } from '@/entities/service/api/service.api';
import type { Service, ServiceDetail } from '@/entities/service/model/service.types';
import { getServiceById } from '@/entities/service/api/service.api';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleServiceClick = useCallback(async (serviceId: number) => {
    try {
      const data = await getServiceById(serviceId);
      setSelectedService(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalle:', error);
    }
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedService(null);
  }, []);

  return { services, selectedService, showModal, isLoading, fetchServices, handleServiceClick, closeModal };
}
