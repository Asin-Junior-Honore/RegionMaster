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
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const create_region_dto_1 = require("./create-region.dto");
const update_region_dto_1 = require("./update-region.dto");
const region_service_1 = require("./region.service");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
let RegionsController = class RegionsController {
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    async findAllRegions() {
        return this.regionsService.findAllRegions();
    }
    async createRegion(createRegionDto, req) {
        return this.regionsService.createRegion(createRegionDto, req.user);
    }
    async updateRegion(RegionCode, updateRegionDto, req) {
        return this.regionsService.updateRegion(RegionCode, updateRegionDto, req.user);
    }
    async deleteRegion(RegionCode) {
        return this.regionsService.deleteRegion(RegionCode);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAllRegions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto, Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':RegionCode'),
    __param(0, (0, common_1.Param)('RegionCode')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_region_dto_1.UpdateRegionDto, Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "updateRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':RegionCode'),
    __param(0, (0, common_1.Param)('RegionCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "deleteRegion", null);
exports.RegionsController = RegionsController = __decorate([
    (0, common_1.Controller)('v1/api/regions'),
    __metadata("design:paramtypes", [region_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=region.controller.js.map