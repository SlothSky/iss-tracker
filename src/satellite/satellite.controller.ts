import { Controller, Get } from '@nestjs/common';
import { CoordinatesService } from 'src/coordinates/coordinates.service';
import { SatelliteService } from './satellite.service';

@Controller()
export class SatelliteController {
  constructor(
    private readonly satelliteService: SatelliteService,
    private coordinatesService: CoordinatesService,
  ) {}

  @Get('test')
  specificRedirect(): string {
    this.coordinatesService.coordinatesResolver(25544).then((data) => {
      console.log(data);
    });

    return this.satelliteService.getSatelliteMap('');
  }
}
