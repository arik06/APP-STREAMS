import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedAdminService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const existing = await this.prisma.user.findUnique({ where: { username: 'pepe' } });
    if (existing) {
      console.log('Usuario admin "pepe" ya existe. Seed omitido.');
      return;
    }

    console.log('Creando usuario admin por defecto...');
    const hash = await bcrypt.hash('admin123', 10);
    await this.prisma.user.create({
      data: { username: 'pepe', password: hash, role: 'admin' },
    });
    console.log('✅ Usuario admin creado: pepe / admin123');
  }
}
