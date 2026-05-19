import { Controller, Put, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../users/presentation/guards/admin.guard';
import { UpdateServiceUseCase } from '../application/use-cases/update-service.use-case';
import { UpdateServiceDto } from '../application/dtos/update-service.dto';

@Controller('api/admin/services')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminServicesController {
  constructor(private readonly updateServiceUseCase: UpdateServiceUseCase) {}

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, dto);
  }
}
