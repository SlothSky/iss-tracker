import { Test, TestingModule } from '@nestjs/testing';
import { SatelliteController } from './satellite.controller';
import { SatelliteService } from './satellite.service';

describe('SatelliteController', () => {
  let satelliteController: SatelliteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SatelliteController],
      providers: [SatelliteService],
    }).compile();

    satelliteController = app.get<SatelliteController>(SatelliteController);
  });

  describe('root', () => {
    it('should return "As you are using a browser you got redirected to the browser version of this site!"', () => {
      expect(satelliteController.specificRedirect()).toBe(
        'As you are using a browser you got redirected to the browser version of this site!',
      );
    });
  });
});
