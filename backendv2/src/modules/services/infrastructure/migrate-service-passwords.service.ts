import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CredentialEncryptionService } from '../../../shared/infrastructure/credential-encryption.service';

@Injectable()
export class MigrateServicePasswordsService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: CredentialEncryptionService,
  ) {}

  async onModuleInit() {
    const services = await this.prisma.service.findMany();
    let migrated = 0;

    for (const service of services) {
      if (this.encryption.isEncrypted(service.password)) continue;
      await this.prisma.service.update({
        where: { id: service.id },
        data: { password: this.encryption.encrypt(service.password) },
      });
      migrated++;
    }

    if (migrated > 0) {
      console.log(`Contraseñas de servicios cifradas: ${migrated}`);
    }
  }
}
