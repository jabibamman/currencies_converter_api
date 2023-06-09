import { CurrencyConverterLink } from './../../Common/Constants/Url.constants';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrencyService } from 'src/currency/services/currency.service';

@Injectable()
export class ApiService {
      constructor(private readonly currencyServices: CurrencyService) {}

      async convert(amount: number, from: string, to: string): Promise<any> {
        if (!await this.isValidCurrency(from, to)) {
          return {
            error: 'Invalid currency',
          };
        }

        const url = CurrencyConverterLink.replace('{from}', from).replace('{to}', to).replace('{amount}', amount.toString());

        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
        const html = response.data; 
        const $ = cheerio.load(html);
        let targetInputValue: string;
    
        $('.form-group > div').each((_, element) => {
          const text = $(element).text().trim();          
          if (text.toLowerCase().includes(to.toLowerCase())) {
            targetInputValue = text.substring(0, text.indexOf(' '));
            return false; 
          }
        });

             
        return {
          from: from,
          to: to,
          amount: amount,
          result: targetInputValue,
        }
    }

    async isValidCurrency(from: string, to: string) : Promise<boolean> {
      const currenciesList = await this.currencyServices.fetchCurrencyValues();
      return currenciesList.includes(from) && currenciesList.includes(to);
   }
}
