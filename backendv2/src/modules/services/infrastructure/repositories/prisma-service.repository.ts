import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';
import { StreamingServiceEntity } from '../../domain/entities/streaming-service.entity';
import { ServiceMapper } from '../../application/mappers/service.mapper';
import { CredentialEncryptionService } from '../../../../shared/infrastructure/credential-encryption.service';

@Injectable()
export class PrismaServiceRepository implements ServiceRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: CredentialEncryptionService,
  ) {}

  async findAll(): Promise<StreamingServiceEntity[]> {
    const services = await this.prisma.service.findMany({ orderBy: { name: 'asc' } });
    return services.map((s) => this.toDomainDecrypted(s));
  }

  async findById(id: number): Promise<StreamingServiceEntity | null> {
    const service = await this.prisma.service.findUnique({ where: { id } });
    return service ? this.toDomainDecrypted(service) : null;
  }

  async findByName(name: string): Promise<StreamingServiceEntity | null> {
    const service = await this.prisma.service.findUnique({ where: { name } });
    return service ? this.toDomainDecrypted(service) : null;
  }

  async create(data: { name: string; email: string; password: string; endDate: string; imageUrl?: string }): Promise<StreamingServiceEntity> {
    const service = await this.prisma.service.create({
      data: { ...data, password: this.encryption.encrypt(data.password) },
    });
    return this.toDomainDecrypted(service);
  }

  async update(id: number, data: { email?: string; password?: string; endDate?: string; imageUrl?: string }): Promise<StreamingServiceEntity> {
    const payload = { ...data };
    if (payload.password) {
      payload.password = this.encryption.encrypt(payload.password);
    }
    const service = await this.prisma.service.update({ where: { id }, data: payload });
    return this.toDomainDecrypted(service);
  }

  private toDomainDecrypted(service: Parameters<typeof ServiceMapper.toDomain>[0]): StreamingServiceEntity {
    const entity = ServiceMapper.toDomain(service);
    return { ...entity, password: this.encryption.decrypt(entity.password) };
  }

  async count(): Promise<number> {
    return this.prisma.service.count();
  }
}
