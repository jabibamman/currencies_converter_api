import { Module } from '@nestjs/common';
import { ApiService } from './api/services/api.service';
import { ApiController } from './api/controllers/api.controller';
import { CurrencyService } from './currency/services/currency.service';
@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, CurrencyService],
})
export class AppModule {}
