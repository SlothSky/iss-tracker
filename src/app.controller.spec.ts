import { Test, TestingModule } from '@nestjs/testing';
import { ISSWebController } from './iss-web.controller';
import { AppService } from './app.service';

describe('ISSWebController', () => {
  let issWebController: ISSWebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ISSWebController],
      providers: [AppService],
    }).compile();

    issWebController = app.get<ISSWebController>(ISSWebController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(issWebController.getHello()).toBe('Hello World!');
    });
  });
});
