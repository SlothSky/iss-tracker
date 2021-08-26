import { Controller, Get } from '@nestjs/common';
import { CoordinatesService } from 'src/coordinates/coordinates.service';
import { ISSService } from './iss.service';

@Controller()
export class ISSController {
  constructor(
    private readonly issService: ISSService,
    private coordinatesService: CoordinatesService,
  ) {}

  @Get('test')
  specificRedirect(): string {
    this.coordinatesService.insertISStoMap('');

    return this.issService.getIssMap('');
  }
}
