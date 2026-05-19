import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(dto: CreateUserDto) {
    const existing = await this.userRepository.findByUsername(dto.username);
    if (existing) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      username: dto.username,
      password: hashedPassword,
      role: dto.role || 'user',
    });

    return { id: user.id, username: user.username, role: user.role, createdAt: user.createdAt };
  }
}
