import { Controller, Post, Put, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../../users/presentation/guards/admin.guard';
import { CreateServiceUseCase } from '../application/use-cases/create-service.use-case';
import { UpdateServiceUseCase } from '../application/use-cases/update-service.use-case';
import { CreateServiceDto } from '../application/dtos/create-service.dto';
import { UpdateServiceDto } from '../application/dtos/update-service.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomBytes } from 'crypto';

@Controller('api/admin/services')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminServicesController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.createServiceUseCase.execute(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, dto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', '..', 'uploads'),
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          if (!['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
            return cb(new BadRequestException('Solo se permiten imágenes (png, jpg, jpeg, gif, webp)'), '');
          }
          const name = randomBytes(8).toString('hex') + ext;
          cb(null, name);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }
    const url = `/uploads/${file.filename}`;
    return { url };
  }
}
