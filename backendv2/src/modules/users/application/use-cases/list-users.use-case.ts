import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users.map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt,
    }));
  }
}
