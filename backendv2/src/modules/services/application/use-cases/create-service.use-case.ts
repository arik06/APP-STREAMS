import { Injectable, ConflictException } from '@nestjs/common';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';
import { CreateServiceDto } from '../dtos/create-service.dto';

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(dto: CreateServiceDto) {
    const existing = await this.serviceRepository.findByName(dto.name);
    if (existing) {
      throw new ConflictException('El servicio ya existe');
    }

    const service = await this.serviceRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      endDate: dto.endDate,
      imageUrl: dto.imageUrl || `/img/${dto.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
    });

    return {
      id: service.id,
      name: service.name,
      email: service.email,
      end_date: service.endDate,
      image_url: service.imageUrl,
    };
  }
}
