import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from 'src/users/schemas/user.schema';
import { RolesGuard } from './roles/roles.guard';
import { Auth } from './auth.decorator';
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
  @Get('profile')
  @Auth(Role.ADMIN)
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
