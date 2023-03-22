import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from '../../currency/services/currency.service';
import { ApiService } from '../services/api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService, private readonly currencyServices: CurrencyService) {}

    @Get('currencies')
    async getAllCurrencies(): Promise<string[]> {
        return await this.currencyServices.fetchCurrencyValues();
    }

    // "from" to "to" conversion
    @Get('convert/:amount/:from/:to')
    async convert(@Param('amount') amount: number, @Param('from') from: string, @Param('to') to: string): Promise<string> {
        return this.apiService.convert(amount, from, to);
    }
  
}
