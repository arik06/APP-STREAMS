import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetServicesUseCase } from '../application/use-cases/get-services.use-case';
import { GetServiceDetailUseCase } from '../application/use-cases/get-service-detail.use-case';

@Controller('api/services')
@UseGuards(AuthGuard('jwt'))
export class ServicesController {
  constructor(
    private readonly getServicesUseCase: GetServicesUseCase,
    private readonly getServiceDetailUseCase: GetServiceDetailUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getServicesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getServiceDetailUseCase.execute(id);
  }
}
