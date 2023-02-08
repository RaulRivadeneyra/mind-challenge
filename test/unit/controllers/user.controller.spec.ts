import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerV1 } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';

describe('UserControllerV1', () => {
  let userController: UserControllerV1;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerV1],
      providers: [UserService],
    }).compile();

    userController = app.get<UserControllerV1>(UserControllerV1);
  });

  describe('root', () => {
    it('should return "John Doe"', () => {
      expect(userController.getUserName()).toBe('John Doe');
    });
  });
});
