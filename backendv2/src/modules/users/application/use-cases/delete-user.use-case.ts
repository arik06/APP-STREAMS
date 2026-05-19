import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.delete(id);
  }
}
