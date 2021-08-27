import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CoordinatesService {
  lastCoordinates: Array<number>;
  overallColumns = 253;
  // magic constant for 253 characters per rows
  rowsDivider = 1.42292;
  // magic constant for 26 rows
  columnsDivider = 3.4615;

  constructor(private httpService: HttpService) {}

  /**
   * The _coordinatesResolver(satellite: number)_ is responsible for coordination of the single coordinate functions
   * @param satelliteID The ID of the requested satellite data.
   * @returns Promise with the coordinates for the map
   */
  async coordinatesResolver(satelliteID: number): Promise<Array<number>> {
    let resultedIndeces = [];

    const test = new Promise<Array<number>>((resolve, reject) => {
      this.getCurrentCoordinates(satelliteID).subscribe({
        next: (response) => {
          this.lastCoordinates = [
            response.data.latitude,
            response.data.longitude,
          ];
        },
        error: (error) => {
          console.error(error);
          reject;
        },
        complete: () => {
          const mapCoords = this.mapCoordinatesToMap(
            this.lastCoordinates[0],
            this.lastCoordinates[1],
          );
          resultedIndeces = this.mapMapToIndeces(mapCoords[0], mapCoords[1]);
          resolve(resultedIndeces);
        },
      });
    });

    return test;
  }

  /**
   * The _getCurrentCoordinates(satelliteID: number)_ requests the current satellite data from the "Where The ISS At" API
   * @param satelliteID The ID of the requested satellite data.
   * @returns Observable with the HTTPS response as Object
   */
  getCurrentCoordinates(satelliteID: number): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      'https://api.wheretheiss.at/v1/satellites/' + satelliteID.toString(),
    );
  }

  /**
   * The _mapCoordinatesToMap()_ function calculates from the received positions the position of the ISS dot on the map.
   * @param latitude Received latitude of current ISS position
   * @param longitude Received longitude of current ISS position
   * @returns - First value: row for ISS on map
   * - second value: column of ISS on map
   */
  mapCoordinatesToMap(latitude: number, longitude: number): Array<number> {
    // first distance from equator, then calculate from this the distance from map top
    const distanceFromEquator = latitude / this.rowsDivider;
    const distanceFromTop = (distanceFromEquator - 26) * -1;

    // first calculate distance from greenwich, then from map start
    const distanceFromGreenwich = longitude / this.columnsDivider;
    const colFromZero = 126 + distanceFromGreenwich;

    // distanceFromTop maps to latitude and colFromZero maps to longitude
    const calculatedIndeces = [distanceFromTop, colFromZero];

    return calculatedIndeces;
  }

  /**
   * The _mapMapToIndeces()_ function calculates from the map's row and column positions the indeces for the 3 ISS points
   * @param mapLatitude Received latitude of current ISS position as *Map Row*
   * @param mapLongitude Received longitude of current ISS position as *Map Column*
   * @returns  - Indeces:
   *   - Top Value (Free space over ISS)
   *   - Mid Value (ISS)
   *   - Bottom Value (Free space below ISS)
   */
  mapMapToIndeces(mapLatitude: number, mapLongitude: number): Array<number> {
    const tempRow = mapLatitude * this.overallColumns;

    // first part (before addition) is required for getting the start point of the latitudes row
    const rowWithColumns = tempRow - (tempRow % 253) + mapLongitude;
    const indexForRender = [
      rowWithColumns + 253,
      rowWithColumns - 253,
      rowWithColumns,
    ];

    return indexForRender;
  }
}
