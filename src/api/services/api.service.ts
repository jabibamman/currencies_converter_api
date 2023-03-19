import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ApiService {
    async RMB2EUR(amount: number): Promise<any> {
        const url = `https://wise.com/fr/currency-converter/cny-to-eur-rate?amount=${amount}`;
        const response = await axios.get(url);
        const html = response.data; 
        const $ = cheerio.load(html);
        let targetInputValue: string;
    
        $('.form-group > div').each((_, element) => {
          const text = $(element).text().trim();
          if (text.toLowerCase().includes('eur')) {
            // replace eur by €
            targetInputValue = text.replace(/(eur|EUR)/g, '€');
            return false; 
          }
        });
             
          return {
            from: 'CNY',
            to: 'EUR',
            amount: amount,
            result: targetInputValue,
          }
      }
}
