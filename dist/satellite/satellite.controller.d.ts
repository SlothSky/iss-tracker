import { CoordinatesService } from '../coordinates/coordinates.service';
import { SatelliteService } from './satellite.service';
export declare class SatelliteController {
    private readonly satelliteService;
    private coordinatesService;
    returnMap: string;
    validator: boolean;
    constructor(satelliteService: SatelliteService, coordinatesService: CoordinatesService);
    getBrowserMap(user_agent: string): Promise<string>;
}
