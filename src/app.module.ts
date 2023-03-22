import { Module } from '@nestjs/common';
import { ApiService } from './api/services/api.service';
import { ApiController } from './api/controllers/api.controller';
import { CurrencyService } from './currency/services/currency.service';
import { DocService } from './Docs/doc.service';
@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, DocService, CurrencyService],
})
export class AppModule {}
