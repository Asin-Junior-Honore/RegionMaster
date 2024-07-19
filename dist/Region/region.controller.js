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
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const create_region_dto_1 = require("./create-region.dto");
const update_region_dto_1 = require("./update-region.dto");
const region_service_1 = require("./region.service");
const swagger_1 = require("@nestjs/swagger");
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
    async updateRegion(regionCode, updateRegionDto, req) {
        return this.regionsService.updateRegion(regionCode, updateRegionDto, req.user);
    }
    async deleteRegion(regionCode) {
        return this.regionsService.deleteRegion(regionCode);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all regions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all regions',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    region_code: { type: 'string' },
                    region_name: { type: 'string' },
                    status: { type: 'string' },
                    created_on: { type: 'string', format: 'date-time' },
                    created_by: { type: 'string' },
                    modified_on: { type: 'string', format: 'date-time' },
                    modified_by: { type: 'string' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No regions found' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAllRegions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new region' }),
    (0, swagger_1.ApiBody)({
        description: 'Details of the region to be created',
        type: create_region_dto_1.CreateRegionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Region created successfully',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Operation was successful' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'Validation error',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 422 },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                            field: { type: 'string' },
                        },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto, Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':regionCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing region' }),
    (0, swagger_1.ApiParam)({ name: 'regionCode', description: 'Code of the region to update' }),
    (0, swagger_1.ApiBody)({
        description: 'Details of the region to be updated',
        type: update_region_dto_1.UpdateRegionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Region updated successfully',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Operation was successful' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Region not found',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Region with code NA not found' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'Validation error',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 422 },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                            field: { type: 'string' },
                        },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('regionCode')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_region_dto_1.UpdateRegionDto, Object]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "updateRegion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':regionCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a region' }),
    (0, swagger_1.ApiParam)({ name: 'regionCode', description: 'Code of the region to delete' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Region deleted successfully',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Operation was successful' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Region not found',
        schema: {
            type: 'object',
            properties: {
                status_code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Region with code NA not found' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('regionCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "deleteRegion", null);
exports.RegionsController = RegionsController = __decorate([
    (0, swagger_1.ApiTags)('Regions'),
    (0, common_1.Controller)('v1/api/regions'),
    __metadata("design:paramtypes", [region_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=region.controller.js.map