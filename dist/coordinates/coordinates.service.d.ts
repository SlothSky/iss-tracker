import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare class CoordinatesService {
    private httpService;
    lastCoordinates: Array<number>;
    overallColumns: number;
    columnsDivider: number;
    rowsDivider: number;
    constructor(httpService: HttpService);
    coordinatesResolver(satelliteID: number): Promise<Array<number>>;
    getCurrentCoordinates(satelliteID: number): Observable<AxiosResponse<any>>;
    mapCoordinatesToMap(latitude: number, longitude: number): Array<number>;
    mapMapToIndeces(mapLatitude: number, mapLongitude: number): Array<number>;
}
