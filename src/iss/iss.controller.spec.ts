import { Test, TestingModule } from '@nestjs/testing';
import { ISSController } from './iss.controller';
import { ISSService } from './iss.service';

describe('ISSController', () => {
  let issController: ISSController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ISSController],
      providers: [ISSService],
    }).compile();

    issController = app.get<ISSController>(ISSController);
  });

  describe('root', () => {
    it('should return "As you are using a browser you got redirected to the browser version of this site!"', () => {
      expect(issController.specificRedirect()).toBe(
        'As you are using a browser you got redirected to the browser version of this site!',
      );
    });
  });
});
