import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserWithId } from 'src/users/schemas/user.schema';
import { Request } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UserCredentialsDTO } from './dtos/user-credentials.dto';

@ApiTags('Auth routes')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    if (!req.user) {
      return {
        message: 'Invalid credentials',
      };
    }

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      return {
        message: 'Invalid credentials',
      };
    }
    return {
      message: 'Petición correcta',
      user,
    };
  }
}
