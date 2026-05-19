import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { STREAMING_SERVICES } from '../../../config/streaming-services';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.service.count();
    if (count > 0) {
      console.log(`Servicios existentes: ${count}. Seed omitido.`);
      return;
    }

    console.log('Sembrando servicios de streaming...');
    for (const service of STREAMING_SERVICES) {
      await this.prisma.service.create({ data: service });
      console.log(`✅ Servicio insertado: ${service.name}`);
    }
    console.log(`🎯 Base de datos inicializada con ${STREAMING_SERVICES.length} servicios`);
  }
}
