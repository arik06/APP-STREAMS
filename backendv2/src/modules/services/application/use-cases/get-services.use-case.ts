import { Injectable } from '@nestjs/common';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';

@Injectable()
export class GetServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute() {
    const services = await this.serviceRepository.findAll();
    return services.map((s) => ({
      id: s.id,
      name: s.name,
      image_url: s.imageUrl,
      end_date: s.endDate,
    }));
  }
}
