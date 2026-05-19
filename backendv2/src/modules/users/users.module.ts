import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

const USER_REPOSITORY = { provide: 'UserRepositoryInterface', useClass: PrismaUserRepository };

@Module({
  controllers: [UsersController],
  providers: [
    USER_REPOSITORY,
    { provide: CreateUserUseCase, useFactory: (repo) => new CreateUserUseCase(repo), inject: ['UserRepositoryInterface'] },
    { provide: ListUsersUseCase, useFactory: (repo) => new ListUsersUseCase(repo), inject: ['UserRepositoryInterface'] },
    { provide: UpdateUserUseCase, useFactory: (repo) => new UpdateUserUseCase(repo), inject: ['UserRepositoryInterface'] },
    { provide: DeleteUserUseCase, useFactory: (repo) => new DeleteUserUseCase(repo), inject: ['UserRepositoryInterface'] },
  ],
  exports: ['UserRepositoryInterface'],
})
export class UsersModule {}
