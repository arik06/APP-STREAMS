import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedAdminService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const hash = await bcrypt.hash('admin123', 10);
    await this.prisma.user.upsert({
      where: { username: 'pepe' },
      update: { password: hash, role: 'admin' },
      create: { username: 'pepe', password: hash, role: 'admin' },
    });
  }
}
