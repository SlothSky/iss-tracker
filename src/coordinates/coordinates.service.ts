import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class CoordinatesService {
  lastCoordinates: Array<number>;

  constructor(private httpService: HttpService) {}

  insertISStoMap(map: string): string {
    this.getCurrentCoordinates().subscribe({
      next: (response) => {
        this.lastCoordinates = [
          response.data.latitude,
          response.data.longitude,
        ];
      },
    });

    return 'void';
  }

  //Observable<Coordinates>
  getCurrentCoordinates(): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      'https://api.wheretheiss.at/v1/satellites/25544',
    );
  }
}
