import { Controller, Get } from '@nestjs/common';
import { CoordinatesService } from 'src/coordinates/coordinates.service';
import { SatelliteService } from './satellite.service';

@Controller()
export class SatelliteController {
  returnMap: string;
  validator = false;

  constructor(
    private readonly satelliteService: SatelliteService,
    private coordinatesService: CoordinatesService,
  ) {}

  @Get('test')
  async specificRedirect(): Promise<string> {
    await this.coordinatesService.coordinatesResolver(25544).then((data) => {
      this.returnMap = this.satelliteService.getSatelliteMap('', data);
    });

    return this.returnMap;
  }
}
