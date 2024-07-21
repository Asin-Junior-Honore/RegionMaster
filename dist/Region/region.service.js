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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const region_model_1 = require("./region.model");
let RegionsService = class RegionsService {
    constructor(regionModel) {
        this.regionModel = regionModel;
    }
    async createRegion(createRegionDto, user) {
        let { RegionCode, RegionName, Status } = createRegionDto;
        RegionCode = RegionCode.toUpperCase();
        if (!RegionCode || !RegionName || !Status) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region code is required', field: 'RegionCode' },
                    { message: 'Region name is required', field: 'RegionName' },
                    { message: 'Status is required', field: 'Status' },
                ],
            });
        }
        if (Status !== 'active' && Status !== 'inactive') {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Status must be either "active" or "inactive"', field: 'Status' },
                ],
            });
        }
        const existingRegionCode = await this.regionModel.findOne({ where: { RegionCode } });
        if (existingRegionCode) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region code already exists', field: 'RegionCode' },
                ],
            });
        }
        const existingRegionName = await this.regionModel.findOne({ where: { RegionName } });
        if (existingRegionName) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region name already exists', field: 'RegionName' },
                ],
            });
        }
        const newRegion = new region_model_1.Region({
            RegionCode,
            RegionName,
            Status,
            CreatedOn: new Date(),
            CreatedBy: user.username,
            ModifiedOn: new Date(),
            ModifiedBy: user.username,
        });
        await newRegion.save();
        return {
            status_code: 200,
            message: 'Operation was successful',
        };
    }
    async findAllRegions() {
        return this.regionModel.findAll();
    }
    async updateRegion(regionCode, updateRegionDto, user) {
        regionCode = regionCode.toUpperCase();
        const region = await this.regionModel.findOne({ where: { RegionCode: regionCode } });
        if (!region) {
            throw new common_1.NotFoundException({
                status_code: 404,
                message: `Region with code ${regionCode} not found`,
            });
        }
        const { RegionName, Status } = updateRegionDto;
        if (Status && Status !== 'active' && Status !== 'inactive') {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Status must be either "active" or "inactive"', field: 'Status' },
                ],
            });
        }
        if (RegionName && RegionName !== region.RegionName) {
            const existingRegionName = await this.regionModel.findOne({ where: { RegionName } });
            if (existingRegionName) {
                throw new common_1.UnprocessableEntityException({
                    status_code: 422,
                    data: [
                        { message: 'Region name already exists', field: 'RegionName' },
                    ],
                });
            }
            region.RegionName = RegionName;
        }
        region.Status = Status || region.Status;
        region.ModifiedOn = new Date();
        region.ModifiedBy = user.username;
        await region.save();
        return {
            status_code: 200,
            message: 'Operation was successful',
        };
    }
    async deleteRegion(regionCode) {
        regionCode = regionCode.toUpperCase();
        const result = await this.regionModel.destroy({ where: { RegionCode: regionCode } });
        if (result === 0) {
            throw new common_1.NotFoundException({
                status_code: 404,
                message: `Region with code ${regionCode} not found`,
            });
        }
        return {
            status_code: 200,
            message: 'Operation was successful',
        };
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(region_model_1.Region)),
    __metadata("design:paramtypes", [Object])
], RegionsService);
//# sourceMappingURL=region.service.js.map