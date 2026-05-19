import { apiFetch } from '@/shared/api/base';
import type { Service, ServiceDetail, UpdateServiceDto } from '@/entities/service/model/service.types';

function normalizeImageUrl(url: string): string {
  return url.replace('/images/', '/img/');
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
    image_url: normalizeImageUrl(data.i