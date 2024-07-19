"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_controller_1 = require("./admins/admin.controller");
const admin_service_1 = require("./admins/admin.service");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const admins_model_1 = require("./admins/admins.model");
const region_controller_1 = require("./Region/region.controller");
const region_model_1 = require("./Region/region.model");
const pg_1 = require("pg");
const region_service_1 = require("./Region/region.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    dialect: 'postgres',
                    dialectModule: pg_1.default,
                    port: configService.get('DB_PORT'),
                    host: configService.get('DB_HOST'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    autoLoadModels: true,
                    synchronize: true,
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false,
                        },
                    },
                    inject: [config_1.ConfigService],
                }),
                inject: [config_1.ConfigService],
            }),
            sequelize_1.SequelizeModule.forFeature([admins_model_1.Admin, region_model_1.Region]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [admin_controller_1.AdminController, region_controller_1.RegionsController],
        providers: [admin_service_1.AdminService, region_service_1.RegionsService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map