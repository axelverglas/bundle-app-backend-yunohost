import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.enableVersioning({
    defaultVersion: '1.0',
    type: VersioningType.URI,
  });

  const document = new DocumentBuilder()
    .setTitle('Bundle APP API')
    .setDescription('Documentation Bundle APP API Yunohost')
    .setVersion('1.0')
    .build();

  const writerDescriptorDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('api', app, writerDescriptorDocument);

  await app.listen(3000);
}
bootstrap();
