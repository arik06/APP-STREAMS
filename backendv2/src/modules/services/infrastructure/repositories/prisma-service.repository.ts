import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';
import { StreamingServiceEntity } from '../../domain/entities/streaming-service.entity';
import { ServiceMapper } from '../../application/mappers/service.mapper';

@Injectable()
export class PrismaServiceRepository implements ServiceRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StreamingServiceEntity[]> {
    const services = await this.prisma.service.findMany({ orderBy: { name: 'asc' } });
    return services.map(ServiceMapper.toDomain);
  }

  async findById(id: number): Promise<StreamingServiceEntity | null> {
    const service = await this.prisma.service.findUnique({ where: { id } });
    return service ? ServiceMapper.toDomain(service) : null;
  }

  async findByName(name: string): Promise<StreamingServiceEntity | null> {
    const service = await this.prisma.service.findUnique({ where: { name } });
    return service ? ServiceMapper.toDomain(service) : null;
  }

  async create(data: { name: string; email: string; password: string; endDate: string; imageUrl?: string }): Promise<StreamingServiceEntity> {
    const service = await this.prisma.service.create({ data });
    return ServiceMapper.toDomain(service);
  }

  async update(id: number, data: { email?: string; password?: string; endDate?: string }): Promise<StreamingServiceEntity> {
    const service = await this.prisma.service.update({ where: { id }, data });
    return ServiceMapper.toDomain(service);
  }

  async count(): Promise<number> {
    return this.prisma.service.count();
  }
}
