import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUserName(): string {
    return this.userService.getUserName();
  }
}
