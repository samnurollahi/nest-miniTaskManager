import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    if (data) {
      return user[data];
    } else {
      return user;
    }
  },
);

export class UserEntity {
  id: string;
  username: string;
  role: 'owner' | 'agent';
}
