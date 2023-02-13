import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import passport, { session } from 'passport';
import { RolesGuard } from './auth/roles/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // TODO: Use the configService to get the port from the .env file
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Challenge NestJS API')
    .setDescription('Challenge API built with NestJS for Mind Teams')
    .addTag('nestjs')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
