import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.service.count();
    if (count > 0) {
      console.log(`Servicios existentes: ${count}. Seed omitido.`);
      return;
    }
    console.log(
      'Sin servicios en BD. Crea los servicios desde el panel admin (/admin/services).',
    );
  }
}
