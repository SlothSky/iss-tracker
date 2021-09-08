"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let CoordinatesService = class CoordinatesService {
    constructor(httpService) {
        this.httpService = httpService;
        this.overallColumns = 253;
        this.columnsDivider = 1.42292;
        this.rowsDivider = 3.4615;
    }
    async coordinatesResolver(satelliteID) {
        let resultedIndeces = [];
        const test = new Promise((resolve, reject) => {
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
                    const mapCoords = this.mapCoordinatesToMap(this.lastCoordinates[0], this.lastCoordinates[1]);
                    resultedIndeces = this.mapMapToIndeces(mapCoords[0], mapCoords[1]);
                    resolve(resultedIndeces);
                },
            });
        });
        return test;
    }
    getCurrentCoordinates(satelliteID) {
        return this.httpService.get('https://api.wheretheiss.at/v1/satellites/' + satelliteID.toString());
    }
    mapCoordinatesToMap(latitude, longitude) {
        const distanceFromEquator = latitude / this.rowsDivider;
        const distanceFromTop = (distanceFromEquator - 26) * -1;
        const distanceFromGreenwich = longitude / this.columnsDivider;
        const colFromZero = 126 + distanceFromGreenwich;
        const calculatedIndeces = [distanceFromTop, colFromZero];
        return calculatedIndeces;
    }
    mapMapToIndeces(mapLatitude, mapLongitude) {
        const tempRow = mapLatitude * this.overallColumns;
        const rowWithColumns = tempRow - (tempRow % 253) + mapLongitude;
        const indexForRender = [
            rowWithColumns + 253,
            rowWithColumns - 253,
            rowWithColumns,
        ];
        return indexForRender;
    }
};
CoordinatesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CoordinatesService);
exports.CoordinatesService = CoordinatesService;
//# sourceMappingURL=coordinates.service.js.map