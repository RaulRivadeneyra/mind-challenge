import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerV1 } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';

describe('UserControllerV1', () => {
  let userController: UserControllerV1;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerV1],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserControllerV1>(UserControllerV1);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['test'];
      expect(userController.getUserName()).toBe('John Doe');
    });
  });
});
