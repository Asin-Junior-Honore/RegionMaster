"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Asin Honore | Region Master API')
        .setDescription('The Region Master API provides comprehensive endpoints for managing geographic regions within our application. It includes functionalities for creating, updating, retrieving, and deleting regions, as well as user authentication and administrative tasks. This API is designed for ease of use and seamless integration, offering clear and intuitive endpoints for various clients and services.')
        .setVersion('1.0')
        .addTag('regions')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map