import { StreamingServiceEntity } from '../entities/streaming-service.entity';

export interface ServiceRepositoryInterface {
  findAll(): Promise<StreamingServiceEntity[]>;
  findById(id: number): Promise<StreamingServiceEntity | null>;
  findByName(name: string): Promise<StreamingServiceEntity | null>;
  create(data: { name: string; email: string; password: string; endDate: string; imageUrl?: string }): Promise<StreamingServiceEntity>;
  update(id: number, data: { email?: string; password?: string; endDate?: string; imageUrl?: string }): Promise<StreamingServiceEntity>;
  count(): Promise<number>;
}
