import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalValidationPipeline = new ValidationPipe();

  app.useGlobalPipes(globalValidationPipeline);
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v1',
  });

  await app.listen(process.env.PORT);
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
