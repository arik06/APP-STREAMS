import { apiFetch } from '@/shared/api/base';
import { API_URL } from '@/shared/config';
import type { Service, ServiceDetail, UpdateServiceDto } from '@/entities/service/model/service.types';

function normalizeImageUrl(url: string): string {
  const cleaned = url.replace('/images/', '/img/');
  if (cleaned.startsWith('/uploads/')) {
    return `${API_URL}${cleaned}`;
  }
  return cleaned;
}

export async function getServices(): Promise<Service[]> {
  const data = await apiFetch<Service[]>('/api/services');
  return data.map((service) => ({
    ...service,
    image_url: normalizeImageUrl(service.image_url),
  }));
}

export async function getServiceById(id: number): Promise<ServiceDetail> {
  const data = await apiFetch<ServiceDetail>(`/api/services/${id}`);
  return {
    ...data,
    image_url: normalizeImageUrl(data.image_url),
  };
}

export async function createService(dto: {
  name: string;
  email: string;
  password: string;
  endDate: string;
  imageUrl?: string;
}): Promise<ServiceDetail> {
  const data = await apiFetch<ServiceDetail>('/api/admin/services', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  return {
    ...data,
    image_url: normalizeImageUrl(data.image_url),
  };
}

export async function updateService(id: number, dto: UpdateServiceDto): Promise<ServiceDetail> {
  const data = await apiFetch<ServiceDetail>(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
  return {
    ...data,
    image_url: normalizeImageUrl(data.image_url),
  };
}

export async function uploadImage(file: File): Promise<string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/admin/services/upload`,
    {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Error al subir imagen');
  }

  const data = await response.json();
  return data.url;
}
