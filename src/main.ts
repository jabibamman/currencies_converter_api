import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CurrencyService } from './currency/services/currency.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
