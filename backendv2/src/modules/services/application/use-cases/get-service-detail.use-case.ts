import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';

@Injectable()
export class GetServiceDetailUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return {
      id: service.id,
      name: service.name,
      email: service.email,
      password: service.password,
      end_date: service.endDate,
      image_url: service.imageUrl,
    };
  }
}
