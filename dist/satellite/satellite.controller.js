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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteController = void 0;
const common_1 = require("@nestjs/common");
const coordinates_service_1 = require("../coordinates/coordinates.service");
const satellite_service_1 = require("./satellite.service");
let SatelliteController = class SatelliteController {
    constructor(satelliteService, coordinatesService) {
        this.satelliteService = satelliteService;
        this.coordinatesService = coordinatesService;
        this.validator = false;
    }
    async getBrowserMap(user_agent) {
        if (user_agent.includes('curl')) {
            user_agent = 'terminal';
        }
        else {
            user_agent = 'browser';
        }
        try {
            await this.coordinatesService.coordinatesResolver(25544).then((data) => {
                this.returnMap = this.satelliteService.getSatelliteMap(user_agent, data);
            });
            return this.returnMap;
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Headers('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SatelliteController.prototype, "getBrowserMap", null);
SatelliteController = __decorate([
    common_1.Controller({ host: 'iss.localhost' }),
    __metadata("design:paramtypes", [satellite_service_1.SatelliteService,
        coordinates_service_1.CoordinatesService])
], SatelliteController);
exports.SatelliteController = SatelliteController;
//# sourceMappingURL=satellite.controller.js.map