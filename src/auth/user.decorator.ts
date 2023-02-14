import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDTO } from './dtos/jwt-payload-dto';

export const User = createParamDecorator(
  (data: keyof JwtPayloadDTO, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayloadDTO;
    return data ? user?.[data] : user;
  },
);
