import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SatelliteService {
  getSatelliteMap(version: string): string {
    const map: string = fs.readFileSync('./src/assets/map.txt', 'utf8');

    return map;
  }
}
