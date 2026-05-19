import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginDto } from '../application/dtos/login.dto';

@Controller('api/login')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.loginUseCase.login(dto);
    response.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    return { username: result.username };
  }
}
