import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from 'src/currency/services/currency.service';
import { ApiService } from '../services/api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService, private readonly currencyServices: CurrencyService) {}

    @Get('amount/:amount')
    async RMB2EUR(@Param('amount') amount: number): Promise<string> { 
      return this.apiService.RMB2EUR(amount);
    }

    @Get('currencies')
    async getAllCurrencies(): Promise<string[]> {
        return await this.currencyServices.fetchCurrencyValues();
    }
  
}
