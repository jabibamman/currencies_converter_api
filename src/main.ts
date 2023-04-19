import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageJson = require('../package.json');
  const config = new DocumentBuilder()
  .setTitle(packageJson.name.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1)))
  .setDescription(packageJson.description)
  .setVersion(packageJson.version)
  .setContact(packageJson.author.name, packageJson.author.url, packageJson.author.email)

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
