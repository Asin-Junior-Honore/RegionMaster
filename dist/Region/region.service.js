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
        let { region_code, region_name, status } = createRegionDto;
        region_code = region_code.toUpperCase();
        if (!region_code || !region_name || !status) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region code is required', field: 'region_code' },
                    { message: 'Region name is required', field: 'region_name' },
                    { message: 'Status is required', field: 'status' },
                ],
            });
        }
        if (status !== 'active' && status !== 'inactive') {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Status must be either "active" or "inactive"', field: 'status' },
                ],
            });
        }
        const existingRegionCode = await this.regionModel.findOne({ where: { region_code } });
        if (existingRegionCode) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region code already exists', field: 'region_code' },
                ],
            });
        }
        const existingRegionName = await this.regionModel.findOne({ where: { region_name } });
        if (existingRegionName) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Region name already exists', field: 'region_name' },
                ],
            });
        }
        const newRegion = new region_model_1.Region({
            region_code,
            region_name,
            status,
            created_on: new Date(),
            created_by: user.username,
            modified_on: new Date(),
            modified_by: user.username,
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
    async updateRegion(region_code, updateRegionDto, user) {
        region_code = region_code.toUpperCase();
        const region = await this.regionModel.findOne({ where: { region_code } });
        if (!region) {
            throw new common_1.NotFoundException({
                status_code: 404,
                message: `Region with code ${region_code} not found`,
            });
        }
        const { region_name, status } = updateRegionDto;
        if (status && status !== 'active' && status !== 'inactive') {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Status must be either "active" or "inactive"', field: 'status' },
                ],
            });
        }
        if (region_name && region_name !== region.region_name) {
            const existingRegionName = await this.regionModel.findOne({ where: { region_name } });
            if (existingRegionName) {
                throw new common_1.UnprocessableEntityException({
                    status_code: 422,
                    data: [
                        { message: 'Region name already exists', field: 'region_name' },
                    ],
                });
            }
            region.region_name = region_name;
        }
        region.status = status || region.status;
        region.modified_on = new Date();
        region.modified_by = user.username;
        await region.save();
        return {
            status_code: 200,
            message: 'Operation was successful',
        };
    }
    async deleteRegion(region_code) {
        region_code = region_code.toUpperCase();
        const result = await this.regionModel.destroy({ where: { region_code } });
        if (result === 0) {
            throw new common_1.NotFoundException({
                status_code: 404,
                message: `Region with code ${region_code} not found`,
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