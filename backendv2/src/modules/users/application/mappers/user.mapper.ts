import { User as PrismaUser } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): UserEntity {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
      password: prismaUser.password,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
    };
  }
}
