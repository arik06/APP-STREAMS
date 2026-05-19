import { Service as PrismaService } from '@prisma/client';
import { StreamingServiceEntity } from '../../domain/entities/streaming-service.entity';

export class ServiceMapper {
  static toDomain(prismaService: PrismaService): StreamingServiceEntity {
    return {
      id: prismaService.id,
      name: prismaService.name,
      email: prismaService.email,
      password: prismaService.password,
      endDate: prismaService.endDate,
      imageUrl: prismaService.imageUrl,
      createdAt: prismaService.createdAt,
    };
  }
}
