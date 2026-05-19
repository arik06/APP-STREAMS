import { Module, OnModuleInit } from '@nestjs/common';
import { ServicesController } from './presentation/services.controller';
import { AdminServicesController } from './presentation/admin-services.controller';
import { GetServicesUseCase } from './application/use-cases/get-services.use-case';
import { GetServiceDetailUseCase } from './application/use-cases/get-service-detail.use-case';
import { CreateServiceUseCase } from './application/use-cases/create-service.use-case';
import { UpdateServiceUseCase } from './application/use-cases/update-service.use-case';
import { PrismaServiceRepository } from './infrastructure/repositories/prisma-service.repository';
import { SeedService } from './infrastructure/seed.service';
import { MigrateServicePasswordsService } from './infrastructure/migrate-service-passwords.service';
import { CredentialEncryptionService } from '../../shared/infrastructure/credential-encryption.service';

const SERVICE_REPOSITORY = { provide: 'ServiceRepositoryInterface', useClass: PrismaServiceRepository };

@Module({
  controllers: [ServicesController, AdminServicesController],
  providers: [
    CredentialEncryptionService,
    SERVICE_REPOSITORY,
    { provide: GetServicesUseCase, useFactory: (repo) => new GetServicesUseCase(repo), inject: ['ServiceRepositoryInterface'] },
    { provide: GetServiceDetailUseCase, useFactory: (repo) => new GetServiceDetailUseCase(repo), inject: ['ServiceRepositoryInterface'] },
    { provide: CreateServiceUseCase, useFactory: (repo) => new CreateServiceUseCase(repo), inject: ['ServiceRepositoryInterface'] },
    { provide: UpdateServiceUseCase, useFactory: (repo) => new UpdateServiceUseCase(repo), inject: ['ServiceRepositoryInterface'] },
    SeedService,
    MigrateServicePasswordsService,
  ],
  exports: ['ServiceRepositoryInterface'],
})
export class ServicesModule implements OnModuleInit {
  constructor(
    private readonly seedService: SeedService,
    private readonly migratePasswords: MigrateServicePasswordsService,
  ) {}
  async onModuleInit() {
    await this.seedService.onModuleInit();
    await this.migratePasswords.onModuleInit();
  }
}
