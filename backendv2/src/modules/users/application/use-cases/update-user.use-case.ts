import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const data: { username?: string; password?: string } = {};
    if (dto.username) data.username = dto.username;
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    const updated = await this.userRepository.update(id, data);
    return { id: updated.id, username: updated.username, role: updated.role, createdAt: updated.createdAt };
  }
}
