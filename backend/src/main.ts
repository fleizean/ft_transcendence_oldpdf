import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: true,
    methods: 'GET,POST',
    credentials: true,
  });
  const config: ConfigService = app.get(ConfigService);
  dotenv.config({ path: path.resolve('/Users/fleizean/Desktop/transdance/backend/src/core/envs/.env') });
  /* console.log("what is that: ", __dirname) */

  const port: number = config.get<number>('PORT');

  const configSwagger = new DocumentBuilder()
    .setTitle('Ft Transcendence API')
    .setDescription('The Ft Transcendence API description')
    .setVersion('1.0')
    .addTag('Ft Transcendence')
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = SwaggerModule.createDocument(app, configSwagger);

  fs.writeFileSync('swagger.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
