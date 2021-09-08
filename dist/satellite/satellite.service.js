"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let SatelliteService = class SatelliteService {
    constructor() {
        this.TERMINAL_COLOR_PREFIX = '\u001b[31m';
        this.TERMINAL_COLOR_SUFFIX = '\u001b[0m';
        this.BROWSER_COLOR_PREFIX = '<span>';
        this.BROWSER_COLOR_SUFFIX = '</span>';
    }
    getSatelliteMap(usedTech, indeces) {
        let map = fs.readFileSync('./src/assets/map.txt', 'utf8');
        map = this.addCoordinatesToMap(usedTech, map, indeces);
        return map;
    }
    addCoordinatesToMap(usedTech, mapInput, issIndeces) {
        if (usedTech === 'terminal') {
            var mapOutput = mapInput.substring(0, issIndeces[1] - 1) +
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
        }
        else if (usedTech === 'browser') {
            const MAP_PREFIX = fs.readFileSync('./src/assets/templates/start.html', 'utf8');
            const MAP_SUFFIX = fs.readFileSync('./src/assets/templates/end.html', 'utf8');
            var mapOutput = mapInput.substring(0, issIndeces[1] - 1) +
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
        }
        else {
            throw new common_1.HttpException('This user agent is not known by the server', 500);
        }
        return mapOutput;
    }
};
SatelliteService = __decorate([
    common_1.Injectable()
], SatelliteService);
exports.SatelliteService = SatelliteService;
//# sourceMappingURL=satellite.service.js.map