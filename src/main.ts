import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Set up Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Asin Honore | Region Master API')
    .setDescription('The Region Master API provides comprehensive endpoints for managing geographic regions within our application. It includes functionalities for creating, updating, retrieving, and deleting regions, as well as user authentication and administrative tasks. This API is designed for ease of use and seamless integration, offering clear and intuitive endpoints for various clients and services.')
    .setVersion('1.0')
    .addTag('regions')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
