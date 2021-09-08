import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SatelliteService {
  private TERMINAL_COLOR_PREFIX = '\u001b[31m';
  private TERMINAL_COLOR_SUFFIX = '\u001b[0m';

  private BROWSER_COLOR_PREFIX = '<span>';
  private BROWSER_COLOR_SUFFIX = '</span>';

  /**
   * The _getSatelliteMap()_ is the main coordination function for getting the text version of a map.
   * This function also calls the required functions for inserting the requested sattelite's position.
   * @param usedTech Is the HTML or text version requested (browser ↔ curl)
   * @param indeces The indeces for the character and their upper and lower whitespaces, which shall be replaced.
   * @returns The mapInput ASCII map with the requested sattelite dot inserted.
   */
  getSatelliteMap(usedTech: string, indeces: Array<number>): string {
    let map: string = fs.readFileSync('./src/assets/map.txt', 'utf8');

    map = this.addCoordinatesToMap(usedTech, map, indeces);

    return map;
  }

  /**
   * The _addISS()_ is typescript helper function for replacing parts of a string.
   * Not only the ISS dot will be inserted in the input string, but also an empty space for the upper and lower
   * neighbour of the ISS dot.
   * @param mapInput The ASCII map, which shall be used for ISS dot insertion.
   * @param index The index for the character, which shall be replaced.
   * @returns The mapInput ASCII map with the ISS dot inserted.
   */
  addCoordinatesToMap(
    usedTech: string,
    mapInput: string,
    issIndeces: Array<number>,
  ) {
    // depending on user agent first replace upper neighbour w/ white space, then ISS with red dot, then lower neighbour w/ white space
    if (usedTech === 'terminal') {
      var mapOutput =
        mapInput.substring(0, issIndeces[1] - 1) +
        ' ' +
        this.TERMINAL_COLOR_PREFIX +
        '#' +
        this.TERMINAL_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[1] + 2, issIndeces[2] - 1) +
        ' ' +
        this.TERMINAL_COLOR_PREFIX +
        '█' +
        this.TERMINAL_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[2] + 2, issIndeces[0] - 1) +
        ' ' +
        this.TERMINAL_COLOR_PREFIX +
        '#' +
        this.TERMINAL_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[0] + 2);
    } else if (usedTech === 'browser') {
      const MAP_PREFIX: string = fs.readFileSync('./src/assets/templates/start.html', 'utf8');
      const MAP_SUFFIX: string = fs.readFileSync('./src/assets/templates/end.html', 'utf8');
      var mapOutput =
        mapInput.substring(0, issIndeces[1] - 1) +
        ' ' +
        this.BROWSER_COLOR_PREFIX +
        '#' +
        this.BROWSER_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[1] + 2, issIndeces[2] - 1) +
        ' ' +
        this.BROWSER_COLOR_PREFIX +
        '█' +
        this.BROWSER_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[2] + 2, issIndeces[0] - 1) +
        ' ' +
        this.BROWSER_COLOR_PREFIX +
        '#' +
        this.BROWSER_COLOR_SUFFIX +
        ' ' +
        mapInput.substring(issIndeces[0] + 2);

        mapOutput = MAP_PREFIX + mapOutput + MAP_SUFFIX;
    } else {
      throw new HttpException(
        'This user agent is not known by the server',
        500,
      );
    }

    return mapOutput;
  }
}
