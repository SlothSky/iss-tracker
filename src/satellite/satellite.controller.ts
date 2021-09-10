import { Controller, Get, Headers } from '@nestjs/common';
import { CoordinatesService } from '../coordinates/coordinates.service';
import { SatelliteService } from './satellite.service';
import * as fs from 'fs';
@Controller()//{ host: 'iss.localhost' }
export class SatelliteController {
  returnMap: string;
  validator = false;

  constructor(
    private readonly satelliteService: SatelliteService,
    private coordinatesService: CoordinatesService,
  ) {}

  @Get('test')
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

  @Get('help')
  getHelp(): string {
    let satellite_list : JSON = JSON.parse(fs.readFileSync('./src/assets/satellite-list.json', 'utf8'));
    console.log(satellite_list['satellites'][0]['name'] + ' -> ' + satellite_list['satellites'][0]['id'])
    

    return JSON.stringify(satellite_list);
  }
}
