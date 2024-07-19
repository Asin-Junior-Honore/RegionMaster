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
exports.Region = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Region = class Region extends sequelize_typescript_1.Model {
};
exports.Region = Region;
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'region_code', primaryKey: true, type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Region.prototype, "region_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'region_name', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Region.prototype, "region_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'status', type: sequelize_typescript_1.DataType.ENUM('active', 'inactive'), allowNull: false }),
    __metadata("design:type", String)
], Region.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'created_on', type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Region.prototype, "created_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'created_by', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Region.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'modified_on', type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Region.prototype, "modified_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'modified_by', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Region.prototype, "modified_by", void 0);
exports.Region = Region = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Regions' })
], Region);
//# sourceMappingURL=region.model.js.map