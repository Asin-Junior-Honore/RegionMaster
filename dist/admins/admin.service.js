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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const admins_model_1 = require("./admins.model");
const sequelize_1 = require("@nestjs/sequelize");
let AdminService = class AdminService {
    constructor(adminModel, jwtService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
    }
    async register(createAdminDto) {
        const { username, email, password, role } = createAdminDto;
        if (!username || !email || !password || !role) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Username is required', field: 'username' },
                    { message: 'Email is required', field: 'email' },
                    { message: 'Password is required', field: 'password' },
                    { message: 'Role must be either admin or moderator', field: 'role' },
                ],
            });
        }
        const existingUser = await this.adminModel.findOne({ where: { username } });
        if (existingUser) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Username already exists', field: 'username' },
                ],
            });
        }
        const existingEmail = await this.adminModel.findOne({ where: { email } });
        if (existingEmail) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Email already exists', field: 'email' },
                ],
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new this.adminModel({ username, email, password: hashedPassword, role });
        await admin.save();
        return {
            status_code: 201,
            message: 'Admin registered successfully',
        };
    }
    async login(loginAdminDto) {
        const { email, password } = loginAdminDto;
        if (!email || !password) {
            throw new common_1.UnprocessableEntityException({
                status_code: 422,
                data: [
                    { message: 'Email is required', field: 'email' },
                    { message: 'Password is required', field: 'password' },
                ],
            });
        }
        const admin = await this.adminModel.findOne({ where: { email } });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { id: admin.id, username: admin.username, role: admin.role };
        const access_token = this.jwtService.sign(payload);
        return { message: 'Login successful', access_token };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(admins_model_1.Admin)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map