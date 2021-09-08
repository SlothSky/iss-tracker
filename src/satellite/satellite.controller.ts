import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { CoordinatesService } from 'src/coordinates/coordinates.service';
import { SatelliteService } from './satellite.service';
import { Request } from 'express';
@Controller({ host: 'iss.bianco-solutions.de' })
export class SatelliteController {
  returnMap: string;
  validator = false;

  constructor(
    private readonly satelliteService: SatelliteService,
    private coordinatesService: CoordinatesService,
  ) {}

  @Get()
  async getBrowserMap(
    @Headers('user-agent') user_agent: string,
  ): Promise<string> {
    if (user_agent.includes('curl')) {
      user_agent = 'terminal';
    } else {
      user_agent = 'browser';
    }
    try {
      await this.coordinatesService.coordinatesResolver(25544).then((data) => {
        this.returnMap = this.satelliteService.getSatelliteMap(
          user_agent,
          data,
        );
      });

      return this.returnMap;
    } catch (error) {
      return error;
    }
  }
}
