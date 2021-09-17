import {Controller, Get, Headers} from '@nestjs/common';
import {CoordinatesService} from '../coordinates/coordinates.service';
import {SatelliteService} from './satellite.service';

@Controller({host: 'iss.bianco-solutions.de'})
export class SatelliteController {
    returnMap: string;

    constructor(
        private readonly satelliteService: SatelliteService,
        private coordinatesService: CoordinatesService,
    ) {
    }

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
            const data = await this.coordinatesService.coordinatesResolver(25544)
            this.returnMap = this.satelliteService.getSatelliteMap(user_agent, data);
            return this.returnMap;
        } catch (error) {
            return error;
        }
    }
}
