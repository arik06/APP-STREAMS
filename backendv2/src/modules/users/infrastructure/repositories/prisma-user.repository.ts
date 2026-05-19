import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../../application/mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({ orderBy: { id: 'asc' } });
    return users.map(UserMapper.toDomain);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(data: { username: string; password: string; role?: string }): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data });
    return UserMapper.toDomain(user);
  }

  async update(id: number, data: { username?: string; password?: string }): Promise<UserEntity> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return UserMapper.toDomain(user);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
