import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepositoryInterface } from '../../domain/repositories/service.repository.interface';
import { UpdateServiceDto } from '../dtos/update-service.dto';

@Injectable()
export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number, dto: UpdateServiceDto) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    const data: { email?: string; password?: string; endDate?: string } = {};
    if (dto.email) data.email = dto.email;
    if (dto.password) data.password = dto.password;
    if (dto.endDate) data.endDate = dto.endDate;

    const updated = await this.serviceRepository.update(id, data);
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      end_date: updated.endDate,
      image_url: updated.imageUrl,
    };
  }
}
