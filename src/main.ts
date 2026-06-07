import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDev } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //? handle doc
  SwaggerModule.setup(
    '/api',
    app,
    SwaggerModule.createDocument(app, configDev),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
